import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon, { stub } from 'sinon';
import { Config } from '../../../src/config';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { StatsDataProvider } from '../../../src/providers/stats-data.provider';
import validDataSet from '../data/dataset-valid.json';
import invalidDataSet from '../data/dataset-invalid.json';
import fetchMock from 'fetch-mock';
import { StatsResult } from '../../../src/dtos/stats-result.dto';

chai.use(chaiAsPromised);
chai.use(sinonChai);

function jsonOk(body) {
  const mockResponse = new window.Response(JSON.stringify(body), {
    //the fetch API returns a resolved window Response object
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
}

describe('providers/StatsDataProvider', () => {
  after(() => fetchMock.restore());

  it('instantiation should fail with invalid url', () => {
    const config: Config = {
      dataSourceUrl: 'invalid_url',
    };

    expect(() => new StatsDataProvider(config)).to.throw(
      'data source URL is not valid',
    );
  });

  it('should fail with 404 not found error', async () => {
    fetchMock.get('https://example.com/1', {
      status: 404,
    });
    const config: Config = {
      dataSourceUrl: 'https://example.com/1',
    };
    const statsDataProvider = new StatsDataProvider(config);
    await expect(statsDataProvider.fetchData()).to.be.rejectedWith(
      'fetch failed. api returned 404 status code',
    );
  });

  it('should fail with invalid content-type', async () => {
    fetchMock.get('https://example.com/2', {
      status: 200,
      headers: {
        'content-type': 'text/html; utf-8',
      },
    });
    const config: Config = {
      dataSourceUrl: 'https://example.com/2',
    };
    const statsDataProvider = new StatsDataProvider(config);
    await expect(statsDataProvider.fetchData()).to.be.rejectedWith(
      'invalid content type',
    );
  });

  it('should fail with validation message error', async () => {
    fetchMock.get('https://example.com/3', {
      status: 200,
      headers: {
        'content-type': 'application/json; utf-8',
      },
      body: JSON.stringify(invalidDataSet),
    });
    const config: Config = {
      dataSourceUrl: 'https://example.com/3',
    };
    const statsDataProvider = new StatsDataProvider(config);
    await expect(statsDataProvider.fetchData()).to.be.rejectedWith(
      'data validation failed',
    );
  });

  it('should return successful payload', async () => {
    fetchMock.get('https://example.com/4', {
      status: 200,
      headers: {
        'content-type': 'application/json; utf-8',
      },
      body: JSON.stringify(validDataSet),
    });
    const config: Config = {
      dataSourceUrl: 'https://example.com/4',
    };
    const statsDataProvider = new StatsDataProvider(config);
    const response = await statsDataProvider.fetchData();
    expect(response).to.be.instanceof(StatsResult);
    expect(response).to.be.deep.equal({
      players: [
        {
          id: 2,
          firstname: 'foo',
          lastname: 'bar',
          shortname: '',
          sex: 'F',
          country: {
            picture: 'https://example.com/countries/fr.jpg',
            code: 'FR',
          },
          picture: 'https://example.com/buddy/hero.jpg',
          data: {
            rank: 1,
            points: 11,
            weight: 11,
            height: 11,
            age: 36,
            last: [1, 1, 1, 0, 1],
          },
        },
      ],
    });
  });
});

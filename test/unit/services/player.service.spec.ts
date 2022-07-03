import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon, { stub } from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { StatsDataProvider } from '../../../src/providers/stats-data.provider';
import validDataSet from '../data/dataset-valid.json';
import fetchMock from 'fetch-mock';
import { PlayerService } from '../../../src/services/player.service';

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('services/PlayerService', () => {
  let playerService;
  beforeEach(() => {
    const statsDataProvider = new StatsDataProvider({
      dataSourceUrl: 'https://example.com/',
    });
    const statsDataProviderMock = sinon.mock(statsDataProvider);
    statsDataProviderMock
      .expects('fetchData')
      .returns(Promise.resolve(validDataSet));
    playerService = new PlayerService(statsDataProvider);
  });
  after(() => fetchMock.restore());

  describe('getAllPlayers', () => {
    it('should return a list of players sorted by their ID', async () => {
      const response = await playerService.getAllPlayers();
      // expect sorted items by id attribute
      expect(response).to.be.deep.equal([
        {
          id: 12,
          firstname: 'foo2',
          lastname: 'bar2',
          shortname: '',
          sex: 'M',
          country: {
            picture: 'https://example.com/countries/us.jpg',
            code: 'FR',
          },
          picture: 'https://example.com/buddy/hero2.jpg',
          data: {
            rank: 2,
            points: 1,
            weight: 1,
            height: 1,
            age: 30,
            last: [0, 1, 1, 0, 1],
          },
        },
        {
          id: 20,
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
      ]);
    });
  });

  describe('getPlayerById', () => {
    it('should failed with invalid parameter', async () => {
      await expect(playerService.getPlayerById('abc123')).to.be.rejectedWith(
        'Invalid "Id" parameter',
      );
    });

    it('should return an empty result', async () => {
      const response = await playerService.getPlayerById('99');
      expect(response).to.be.deep.equal(undefined);
    });

    it('should return a player', async () => {
      const response = await playerService.getPlayerById('12');

      // validate sorting
      expect(response).to.be.deep.equal({
        id: 12,
        firstname: 'foo2',
        lastname: 'bar2',
        shortname: '',
        sex: 'M',
        country: {
          picture: 'https://example.com/countries/us.jpg',
          code: 'FR',
        },
        picture: 'https://example.com/buddy/hero2.jpg',
        data: {
          rank: 2,
          points: 1,
          weight: 1,
          height: 1,
          age: 30,
          last: [0, 1, 1, 0, 1],
        },
      });
    });
  });
});

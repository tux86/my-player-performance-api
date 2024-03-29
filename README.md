# My Player's Performance API

Yet another serverless ☁️ API with **Lambda** and **Node.js**

<p align="center">
  <img src="https://user-images.githubusercontent.com/9397970/177034576-a2c9c6ee-88bf-4bb4-b25a-9148082623e6.png" alt="Architecture"/>
</p>

## Getting started!

Make sure **node 14.x** and **yarn** are installed.

```shell

$ git clone git@github.com:tux86/my-player-performance-api.git
$ cd my-player-performance-api
$ yarn install
```

## Creating the environment file

Inside this project root directory, a template environment file **.env.template** is available for you.

Make a copy of this file to **.env.dev** using cp command as below.

```shell
$ cp .env.template .env.dev
```

now open **.env.dev** using a text editor, the content should look like this : 

```dotenv
AWS_PROFILE=****
AWS_REGION=eu-west-1
DEPLOYMENT_BUCKET_NAME_PREFIX=
ENDPOINT_URL=****
NODE_ENV=development
```

Update the content by setting a value for each the following variables

- **AWS_PROFILE:**  your aws profile name (admin credentials required)
- **AWS_REGION:**   the aws region (example: eu-west-1)
- **DEPLOYMENT_BUCKET_NAME_PREFIX:** optional (The default value is the service name). 

  ` 🚨 IMPORTANT 🚨 : You should set a prefix if the bucket name is not available because bucket name is unique across all AWS accounts`

- **ENDPOINT_URL:**  the dataset endpoint URL

## Running project locally (offline mode)

Use the following commands inorder to start the project locally.

```shell
$ yarn build  # build project
$ yarn start  # start serverless offline mode
```

Once started, you will see a message in the console (as shown below) indicating a successful startup

```shell
   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                 │
   │   GET | http://127.0.0.1:3000/players                                           │
   │   POST | http://127.0.0.1:3000/2015-03-31/functions/listPlayers/invocations     │
   │   GET | http://127.0.0.1:3000/players/{id}                                      │
   │   POST | http://127.0.0.1:3000/2015-03-31/functions/getPlayerById/invocations   │
   │                                                                                 │
   └─────────────────────────────────────────────────────────────────────────────────┘

```

## Running Tests

```shell
$ yarn test
```

## Deploy service to AWS cloud

To make a deployment to AWS cloud, you need to execute the following command:

```shell
$ yarn sls:deploy
```

Verify that the deployment completed successfully. You should see the following in the console :
```shell
✔ Service deployed to stack my-player-performance-api-dev (32s)

endpoints:
  GET - https://abcdef1234.execute-api.eu-west-1.amazonaws.com/players
  GET - https://abcdef1234.execute-api.eu-west-1.amazonaws.com/players/{id}
functions:
  listPlayers: my-player-performance-api-listPlayers-dev (6.3 MB)
  getPlayerById: my-player-performance-api-getPlayerById-dev (6.3 MB)

Monitor all your API routes with Serverless Console: run "serverless --console"
Done in 36.32s
```

## Remove the deployed service

```shell
$ yarn sls:remove
```


**That's All Folks !** 😉

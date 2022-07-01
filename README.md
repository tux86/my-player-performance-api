# My Player Performance API

Yet another serverless ☁️ API with **Lambda** and **Node.js** using **serverless framework 3**

<p align="center">
  <img src="https://user-images.githubusercontent.com/9397970/176889714-cab35599-bbdc-4526-9ab6-d7e248d55320.png" alt="Architecture"/>
</p>

## Getting started!

Make sure **node 14.x** and **yarn** are installed.

```shell

$ git clone git@github.com:tux86/my-player-performance-api.git
$ cd my-player-performance-api
$ yarn install
```

## Creating the environment file

```shell
$ cp .env.template .env.dev
```

now, your **.env.dev** content should look like this : 

```dotenv
AWS_PROFILE=*********
AWS_REGION=eu-west-1
DATASET_URL=*********
```

You have to set values of each variable.

- **AWS_PROFILE:**  your aws profile name (admin credentials required)
- **AWS_REGION:**   the aws region (example: eu-west-1)
- **DATASET_URL:**  the dataset url

## Running project locally (offline mode)

Use the following commands inorder to start the project locally.

```shell
$ yarn build  # build
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

## Deploy service to AWS cloud

To make a deployment to AWS cloud, you need to follow the required steps:

```shell
$ cp .env.template .env.dev
$ yarn sls:deploy
```

Verify that the deployment completed successfully. You should see the following in the Log :
```shell
✔ Service deployed to stack my-player-performance-api-dev (68s)

endpoints:
  GET - https://12345abcdef.execute-api.eu-west-1.amazonaws.com/players
  GET - https://12345abcdef.execute-api.eu-west-1.amazonaws.com/players/{id}
functions:
  listPlayers: my-player-performance-api-list-players (19 MB)
  getPlayerById: my-player-performance-api-get-player-by-ud (19 MB)

```

## Remove the deployed service

```shell
$ yarn sls:remove
```


**That's All Folks !** 😉

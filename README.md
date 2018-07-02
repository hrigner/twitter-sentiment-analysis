# twitter-sentiment-analysis

A two-day-hackathon result.

Search for tweets, analyze with AYLIEN and show the result.

## Get up and running

1.  Get the Qlik Associative Engine up and running. Note that you must accept the [Qlik Core EULA](https://qlikcore.com/beta/) by setting the `ACCEPT_EULA` environment variable.

```sh
ACCEPT_EULA=yes docker-compose up -d
```

2.  Install dependencies

```sh
npm install
```

3.  Fetch Twitter API keys and access tokens and AYLIEN Application ID and Application Key and add those in [server.js](./server.js)
4.  Start the server and the ui.

```sh
npm run server
npm run sentiment-ui
```

4.  Go to http://localhost:8080

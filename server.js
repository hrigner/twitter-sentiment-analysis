const express = require("express");
const Twitter = require("twit");
const AYLIENTextAPI = require("aylien_textapi");

const app = express();
const client = new Twitter({
  consumer_key: "TWITTER_CONSUMER_KEY",
  consumer_secret: "TWITTER_CONSUMER_SECRET",
  access_token: "TWITTER_ACCESS_TOKEN",
  access_token_secret: "TWITTER_ACCESS_TOKEN_SECRET"
});
const textapi = new AYLIENTextAPI({
  application_id: "AYLIEN_APPLICATION_ID",
  application_key: "AYLIEN_APPLICATION_KEY"
});
const nbrOfTweetsInSearch = 10;

app.use(require("cors")());
app.use(require("body-parser").json());

const sentiment = (text, callback) => {
  textapi.sentiment(text, (err, resp) => {
    if (err !== null) {
      console.log(`Error: ${err}`);
    } else {
      callback(text, resp.polarity);
    }
  });
};

app.get("/api/search/:text", (req, res) => {
  client
    .get("search/tweets", {
      q: req.params.text
    })
    .then(data => {
      const tweets = data.data.statuses;
      const jsonData = { tweets: [] };
      let i = 0;
      let SCRIPT = `sentimentTable: LOAD * Inline [text, sentiment\n`;
      tweets.forEach(item => {
        if (i < nbrOfTweetsInSearch) {
          i += 1;
          sentiment(item.text, (tweet, results) => {
            SCRIPT += `${escape(tweet)},${results}\n`;
            const itemData = {};
            itemData.text = tweet;
            itemData.sentiment = results;
            jsonData.tweets.push(itemData);
            if (jsonData.tweets.length === nbrOfTweetsInSearch) {
              SCRIPT += "];";
              res.send({ script: SCRIPT });
            }
          });
        }
      });
    });
});

app.get("api/sentiment/:text", (req, res) => {
  textapi.sentiment(req.params.text, (err, resp) => {
    if (err !== null) {
      console.log(`Error: ${err}`);
    } else {
      res.send(resp);
    }
  });
});

app.listen(3000, () => console.log("Server running"));

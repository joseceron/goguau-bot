var chalk = require("chalk");
const {
  dialogflow,
  Image,
  Suggestions,
  List,
  actionssdk,
  BasicCard,
  Button,
  Carousel,
  LinkOutSuggestion,
  BrowseCarousel,
  BrowseCarouselItem,
  addSuggestionLink,
  SignIn
} = require("actions-on-google");
const express = require("express");
const bodyParser = require("body-parser");

// const jwt = require("jsonwebtoken");

require("dotenv").config();
// const path = require('path');
const ngrok = require("ngrok");

const server = express();
const port = process.env.PORT || 3002;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const app = dialogflow({
  clientId: 102335120436157238343
});

const greetingsModule = require("./API/intents/greetingsModule")
const servicesModule = require('./API/intents/servicesModule')

app.intent("welcome-intent", async conv => {
  let userId = ""
  console.log(chalk.green.inverse('welcome-intent'))

  let { replies, suggestions, contexts } = greetingsModule.greetings()

  replies.map(reply => {
    conv.ask(reply)
  });

  if (suggestions.length > 0) {
    conv.ask(new Suggestions(suggestions));
  }

  contexts.map(context => {
    conv.contexts.set(context.name, context.lifespan, context.parameters);
  });

});

app.intent('service-walk-intent', conv => {
  console.log(chalk.green.inverse('service-walk-intent'))

  let { replies, cards, suggestions, contexts, card } = servicesModule.walks()

  replies.forEach(function(reply) {
    conv.ask(reply)
  })

  if (suggestions.length > 0) {
    conv.ask(new Suggestions(suggestions))
  }

  if (cards.length > 0) {
    var mappedCards = cards.reduce(function(map, obj) {
      map[obj.key_name] = obj.key_values;
      return map
    }, {})
    conv.ask(new List({
      title: 'Tipo de paseos',
      items: mappedCards
    }))
  }
  if (card != '') {
    conv.ask(new BasicCard(card))
  } 

  if (contexts.length > 0) {
    contexts.forEach(function(context) {
      conv.contexts.set(context.name, context.lifespan, context.parameters);
    })
  }

})








server.post("/fulfillment2", app);

const serv = server.listen(port, function() {
  console.log("SERVER: UP AND LISTENING: " + serv.address().port);
});

ngrok.connect(
  {
    proto: "http",
    addr: 3002
  },
  (err, url) => {
    if (err) {
      console.error("Error while connecting Ngrok", err);
      return new Error("Ngrok Failed");
    } else {
      console.log("Tunnel Created -> ", url);
    }
  }
);

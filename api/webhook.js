'use strict';

// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json());
const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Get body, PSID, message type
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      let isMessage = webhook_event.message;
      let isPostback = webhook_event.postback;

      console.log(webhook_event);
      console.log('Sender PSID: ' + sender_psid);

      // Check if event is message or postback to
      // pass the event to the appropriate handler
      if (isMessage) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (isPostback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "mkRGx0S4TK"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;
  let text = received_message.text;
  let attachment = received_message.attachments;

  // Check if message has text
  if (text) {
    response = {
      "text": `You sent the message: "${text}". Direct messaging is not supported at this time.`
    }

  } else if (attachment) {
    response = {
      "text": "Please do not send attachments."
    }
  }

  // Send response
  callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case 'get-started':
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Welcome to CivAssist!",
              "subtitle": "Tap a button to continue",
              "image_url": "https://civic-hacks.herokuapp.com/static/civassist.png",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sign In",
                  "payload": "sign",
                },
                {
                  "type": "postback",
                  "title": "Log In",
                  "payload": "log"
                }
              ],
            }]
          }
        }
      }
      break;
    case 'sign':
      break;
    case 'log':
      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}


function callSendAPI(sender_psid, response) {
  // Construct message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  path: '/api',
  handler: app
}


'use strict';

// Import dependencies
/* eslint-disable */
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyCKbckfbi7xKdG7Q368tdHflPYxpMiDcHM",
  authDomain: "hackathon-3cd54.firebaseapp.com",
  databaseURL: "https://hackathon-3cd54.firebaseio.com",
  projectId: "hackathon-3cd54",
  storageBucket: "hackathon-3cd54.appspot.com",
  messagingSenderId: "279651007594",
  appId: "1:279651007594:web:43590bce5c69595b1d5e13",
  measurementId: "G-KN56T860B9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()

const express = require('express')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json());
const request = require('request');
// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const PAGE_ACCESS_TOKEN = "EAAmhWoMcs2EBAOqJ3NYaE6FkAoccKPxoyVIsLsRbhOyi7hGqvBMB0MlQV0ZBh8RDYOhiDMVrzHUR8Pku0pTkxnQmF71ptPHfhpdcrvobi93aKXtMm41DUic4vLE5yJdC49zjU040sKLCujTgmQgUnrPN2KZAZAu5Udfyl09KgZDZD";
const user = "";
const passkey = "";
const queries = [];

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
  console.log(text)

  // Check if message has text
  if (text) {
    user = "";
    passkey = "";
    queries = [];
    queries = text.split(" ");
    console.log(queries)
    switch (queries[0]) {
      case 'user:':
        user = queries[1]
        response = {
          "text": `Your new username is: "${queries[1]}". Please type a username with the format 'pk: [my-passkey]'.`
        }
        break;
      case 'pk:':
        passkey = queries[1]
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": `Log in or Sign up with "${user}" and "${passkey}"?`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log In",
                  "payload": "log"
                },
                {
                  "type": "postback",
                  "title": "Sign Up",
                  "payload": "sign"
                }
              ]
            }
          }
        }
        break;
      default:
        response = {
          "text": "Invalid"
        }
    }
  } else if (attachment) {
    response = {
      "text": "Attachments are not supported at this time. Please choose an option from the hamburger menu."
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
              "image_url": "https://i.ibb.co/26sn6MG/civassist.png",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sign Up or Log In",
                  "payload": "auth",
                }
              ],
            }]
          }
        }
      }
      break;
    case 'auth':
      response = {
        "text": "Please type a username with the format 'user: [my-username]'."
      }
      break;
    case 'log':
      fbAuth('log');
      break;
    case 'sign':
      fbAuth('sign');
      break;
    case 'settings':
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": "Edit your settings here!",
            "buttons": [
              {
                "type": "web_url",
                "url": "https://www.facebook.com",
                "title": "Facebook"
              }
            ]
          }
        }
      }
      break;
    case 'report':
      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

async function fbAuth(loginType) {
  if (loginType == 'log') {
    console.log(account.password)
    console.log(account.email)
    await auth.signInWithEmailAndPassword(account.email, account.password)
    const { email, uid } = auth.currentUser
  } else {
    await auth.createUserWithEmailAndPassword(account.email, account.password)
    const { email, uid } = auth.currentUser
    await db.collection("users").add({
      name: account.name,
      email: email,
      uid: uid
    })
  }
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
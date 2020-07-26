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
const fetch = require('node-fetch');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var emailID = "";
var passkey = "";
var PSID = ""
var queries = [];
var settings = [];
var allInfo = [];

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
      let isQuickReply = webhook_event.quick_reply;

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

async function handleMessage(sender_psid, received_message) {
  let response, response2, response3, response4, response5 = {};
  let text = received_message.text;
  let attachment = received_message.attachments;
  console.log(text)

  // Check if message has text
  if (text) {
    queries = [];
    queries = text.split(" ");
    console.log(queries)
    switch (queries[0]) {
      case 'em:':
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": `You are logged in with ${emailID}. Please log out to change accounts.`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log Out",
                  "payload": "out"
                }
              ]
            }
          }
        }
        if (emailID === "") {
          emailID = queries[1]
          response = {
            "text": `Your new email is: ${emailID}. Please type a passkey with the format 'pk: [my-passkey]'.`
          }
        }
        break;
      case 'pk:':
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": `You are logged in with ${emailID}. Please log out to change accounts.`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log Out",
                  "payload": "out"
                }
              ]
            }
          }
        }
        if (passkey === "") {
          passkey = queries[1]
          response = {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "button",
                "text": `Log in or Sign up with "${emailID}" and "${passkey}"?\nNew users should sign up and returning users should log in.`,
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
        }

        break;
      case '|':
        await updateSettings(text).then(result => {
          response = result;
        });

        break;
      case 'Get':
        await collectInformation().then(result => {
          response = result;
        })
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
  callSendAPI(sender_psid, response).then(() => {
    return callSendAPI(sender_psid, response2).then(() => {
      return callSendAPI(sender_psid, response3).then(() => {
        return callSendAPI(sender_psid, response4).then(() => {
          return callSendAPI(sender_psid, response5);
        });
      });
    });
  });
}

async function handlePostback(sender_psid, received_postback) {
  let response, response2, response3, response4, response5 = {};
  let payload = received_postback.payload;
  PSID = sender_psid

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
              "subtitle": "Tap the button to continue",
              "image_url": "https://i.ibb.co/26sn6MG/civassist.png",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Get Started",
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
        "text": "Please type an email with the format 'em: [my-email]'."
      }
      break;
    case 'log':
    case 'sign':
      response = await fbAuth(payload)
      break;
    case 'out':
      await fbAuthOut().then(result => {
        response = result
      }).catch(error => {
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": error,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log In",
                  "payload": "auth"
                }
              ]
            }
          }
        }
      })
      break;
    case 'main':
      response = {
        "text" : "Choose an option from the hamburger menu near the input bar."
      }
      break;
    case 'report':      
      await getInfo().then(result => {
        response = {
          "text": `Tap the Get Report reply.`,
          "quick_replies": [
            {
              "content_type":"text",
              "title":"Get Report",
              "payload":"state-officials",
            }
          ]
        }
      }).catch(error => {
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": error,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log In",
                  "payload": "auth"
                }
              ]
            }
          }
        }
      })
      break;
    case 'settings':
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": `Email: ${emailID}\nPasskey: ${passkey}`,
            "buttons": [
              {
                "type": "postback",
                "title": "Log Out",
                "payload": "out"
              },
            ]
          }
        }
      }
      response2 = {
        "text": `Toggle Settings: \n${settings.join("\n")}`,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"| State Officials",
            "payload":"state-officials",
          },
          {
            "content_type":"text",
            "title":"| County Officials",
            "payload":"county-officials",
          },
          {
            "content_type":"text",
            "title":"| City Officials",
            "payload":"city-officials",
          },
          {
            "content_type":"text",
            "title":"| State Propositions",
            "payload":"state-propositions",
          },
          {
            "content_type":"text",
            "title":"| County Measures",
            "payload":"county-measures",
          },
          {
            "content_type":"text",
            "title":"| City Resolutions",
            "payload":"city-resolutions",
          }
        ]
      }
      if (emailID === "") {
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": `You are not logged in.`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Log In",
                  "payload": "auth"
                },
              ]
            }
          }
        }
        response2 = {}
      }


      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response).then(() => {
    return callSendAPI(sender_psid, response2).then(() => {
      return callSendAPI(sender_psid, response3).then(() => {
        return callSendAPI(sender_psid, response4).then(() => {
          return callSendAPI(sender_psid, response5);
        });
      });
    });
  });
}

async function collectInformation() {
  var obj;
  let response;
  if (settings.includes('State Officials')) {

    console.log(allInfo[1])
    console.log(allInfo[2])
  }
  if (settings.includes('County Officials')) {
    obj = ""
    allInfo[4].forEach(function(element) {
      obj += "Name: " + element.name;
      obj += "\nPosition: " + element.position;
      obj += "\nWebsite: " + element.website + "\n\n";
    })
    response = {
      "text": obj
    }
  }
  if (settings.includes('City Officials')) {
    obj = ""
    allInfo[6].forEach(function(element) {
      obj += "Name: " + element.name;
      obj += "\nPosition: " + element.position;
      obj += "\nWebsite: " + element.website + "\n\n";
    })
    response = {
      "text": obj
    }
  }
  if (settings.includes('State Propositions')) {
    obj = ""
    allInfo[0].forEach(function(element) {
      obj += "Name: " + element.name;
      obj += "\nNumber: " + element.number;
      obj += "\nSubject: " + element.subject;
      obj += "\nWebsite: " + element.url;
      obj += "\nDescription: " + element.desc + "\n\n";
    })
    console.log(obj)
    response = {
      "text": obj
    }

  }
  if (settings.includes('County Measures')) {
    console.log(allInfo[3])

  }
  if (settings.includes('City Resolutions')) {
    console.log(allInfo[5])

  }

  return response;
}


async function updateSettings(text) {
  let response = {}
  text = text.split(" ").splice(1).join(" ");

  if (settings.indexOf(text) >= 0) {
    settings.splice(settings.indexOf(text), 1)
  } else {
    settings.push(text)
  }

  await db.collection("users").doc(PSID).update({
    settings: settings
  });

  response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "button",
        "text": `Success! Settings now read: \n${settings.join("\n")}`,
        "buttons": [
          {
            "type": "postback",
            "title": "Continue",
            "payload": "main"
          }
        ]
      }
    }
  }
  return response

}


async function getInfo() {
  if (emailID == "") {
    throw 'User is not logged in. Please log in to continue.';
    return;
  }

  var STprops = []
  var propositions = await db
    .collection("states")
    .doc("446b8ad0-cec1-11ea-9ce1-c163adabfc4b")
    .collection("propositions");
  propositions = await propositions.get();
  await propositions.forEach((doc) => {
    STprops.push({
      name: doc.data().name,
      number: doc.data().number,
      subject: doc.data().subject,
      url: doc.data().url,
      desc: doc.data().desc,
    });
  });

  var STreps = []
  var officials = await db
        .collection("states")
        .doc('446b8ad0-cec1-11ea-9ce1-c163adabfc4b')
        .collection("officials");
  var representatives = await officials
        .doc('45de0690-cec1-11ea-9ce1-c163adabfc4b')
        .collection("representatives")
  representatives = await representatives.get()
  await representatives.forEach(async (doc) => {
    STreps.push({
      name: doc.data().name,
      district: doc.data().district,
      party: doc.data().party,
      website: doc.data().website,
    });
  });
  
  var STsens = []
  var senators = await officials
        .doc('45de0690-cec1-11ea-9ce1-c163adabfc4b')
        .collection("senators")
  senators = await senators.get()
  await senators.forEach(async (doc) => {
    STsens.push({
      name: doc.data().name,
      party: doc.data().party,
      website: doc.data().website,
    });
  });

  var COUTmeasures = []
  const county = await db
        .collection("counties")
        .doc('415884a0-cea4-11ea-b45b-c767a5aa3ded')
  var measures = await county
        .collection("measures");
  measures = await measures.get()
  await measures.forEach((doc) => {
    COUTmeasures.push({
      applies: doc.data().applies,
      subject: doc.data().subject,
      desc: doc.data().desc,
    });
  });

  var COUTofficials = []
  officials = await county
        .collection("officials");
  officials = await officials.get();
  await officials.forEach((doc) => {
    COUTofficials.push({
      name: doc.data().name,
      position: doc.data().position,
      website: doc.data().website,
    });
  });

  var CITresolutions = []
  const cities = await db
        .collection("cities")
        .doc('5066d2a0-cec0-11ea-a6eb-89274da76583')
  var resolutions = await cities
    .collection("resolutions")
  resolutions = await resolutions.get();
  await resolutions.forEach((doc) => {
    CITresolutions.push({
      name: doc.data().name,
      number: doc.data().number,
      url: doc.data().url,
    });
  });

  var CITofficials = []
  officials = await cities
        .collection("officials");
  officials = await officials.get();
  await officials.forEach((doc) => {
    CITofficials.push({
      name: doc.data().name,
      position: doc.data().position,
      website: doc.data().website,
    });
  });

  allInfo = [STprops, STreps, STsens, COUTmeasures, COUTofficials, CITresolutions, CITofficials];
}

async function fbAuth(loginType) {
  let response;

  if (loginType == 'log') {
    await auth.signInWithEmailAndPassword(emailID, passkey).then(async result => {
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": `Success! You are now logged in with email ${emailID}.`,
            "buttons": [
              {
                "type": "postback",
                "title": "Continue",
                "payload": "main"
              }
            ]
          }
        }
      }

      var users = await db.collection("users").doc(PSID)
      var user = await users.get()
      settings = user.data().settings
    }).catch(error =>  {
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": error.message + `\n\nEmail: "${emailID}" and\nPasskey: "${passkey}" must be changed accordingly.`,
            "buttons": [
              {
                "type": "postback",
                "title": "Try again",
                "payload": "auth"
              },
              {
                "type": "postback",
                "title": "Log In",
                "payload": "log"
              }
            ]
          }
        }
      }
    })
  } else {
    await auth.createUserWithEmailAndPassword(emailID, passkey).then(async result => {
      const { email, uid } = auth.currentUser
      await db.collection("users").doc(PSID).set({
        email: email,
        uid: uid
      })
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": `Success! You have created an account with email ${emailID}.`,
            "buttons": [
              {
                "type": "postback",
                "title": "Continue",
                "payload": "settings"
              }
            ]
          }
        }
      }
    }).catch(error => {
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": error.message + `\n\nEmail: ${emailID} and\nPasskey: ${passkey} must be changed accordingly.`,
            "buttons": [
              {
                "type": "postback",
                "title": "Try again",
                "payload": "auth"
              }
            ]
          }
        }
      }
    })
  }
  return(response);
}

async function fbAuthOut() {
  if (emailID === "") {
    throw 'You are not logged in.'
    return;
  }
  
  let response = {};

  await auth.signOut().then(result => {
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": `Success! You have signed out of ${emailID}.`,
          "buttons": [
            {
              "type": "postback",
              "title": "Continue",
              "payload": "get-started"
            }
          ]
        }
      }
    }
  }).catch(error => {
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": error.message,
          "buttons": [
            {
              "type": "postback",
              "title": "Try again",
              "payload": "main"
            }
          ]
        }
      }
    }
  });
  emailID = "";
  passkey = "";
  return (response);
}

function callSendAPI(sender_psid, response) {

  if (response == {}) {
    return;
  }
  // Construct message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  const qs = "access_token=" + PAGE_ACCESS_TOKEN;
  return fetch('https://graph.facebook.com/v2.6/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(request_body),
  });
}

module.exports = {
  path: '/api',
  handler: app
}
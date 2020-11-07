const functions = require('firebase-functions');
const SpeechToText = require('./SpeechToText');
const admin = require('firebase-admin');
admin.initializeApp();

exports.SpeechToText = SpeechToText.requestHandler; 

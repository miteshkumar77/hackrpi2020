const functions = require('firebase-functions');
const SpeechToText = require('./SpeechToText');
const TextSearch = require('./textSearch.js');
const admin = require('firebase-admin')
admin.initializeApp();

exports.SpeechToText = SpeechToText.requestHandler;
exports.AddToIndex = TextSearch.addToIndex;
exports.UpdateIndex = TextSearch.updateIndex;
exports.DeleteFromIndex = TextSearch.deleteFromIndex; 
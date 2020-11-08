const functions = require('firebase-functions');
const SpeechToText = require('./SpeechToText');
const TextSearch = require('./textSearch.js');

exports.SpeechToText = SpeechToText.requestHandler;
exports.AddToIndex = TextSearch.addToIndex;
exports.UpdateIndex = TextSearch.updateIndex;
exports.DeleteFromIndex = TextSearch.deleteFromIndex; 
const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US"
};

const textToSpeech = async (audioUrl) => {
    const audioDoc = {
        "config": config,
        "audio": {
            "uri": audioUrl
        }
    }

    const [response] = await client.recognize(audioDoc);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: `, transcription);
    return transcription

};

const requestHandler = functions.https.onRequest(async (req, res) => {
    const audioUrl = req.query.audioUrl;
    res.json({ transcription: await textToSpeech(audioUrl) });
});

module.exports.requestHandler = requestHandler; 
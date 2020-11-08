const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');
ffmpeg.bin = ffmpeg_static.path;
const path = require('path');
const os = require('os');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');

const client = new speech.SpeechClient();
const storage = new Storage();

const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
    model: "default",
    enableAutomaticPunctuation: true
};


function promisifyCommand(command) {
    return new Promise((resolve, reject) => {
        command.on('end', resolve).on('error', reject).run();
    });
}

const textToSpeech = async (fpath) => {

    const audioDoc = {
        "config": config,
        "audio": {
            "content": fs.readFileSync(fpath).toString('base64')
        }
    }

    console.log(`processing audio at path: ${fpath} ...`);

    const [response] = await client.recognize(audioDoc);
    console.log(response);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: `, transcription);
    return transcription
};

const requestHandler = functions.https.onRequest(async (req, res) => {
    const bucketName = req.query.bN;
    const srcAudioName = req.query.sAN;
    const fileName = 'temporary_soundbite';
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const targetTempFileName = fileName.replace(/\.[^/.]+$/, '') + '_output.flac';
    const targetTempFilePath = path.join(os.tmpdir(), targetTempFileName);

    const options = {
        destination: tempFilePath,
    };

    await storage.bucket(bucketName).file(srcAudioName).download(options);

    console.log('Audio downloaded locally to', tempFilePath);
    // Convert the audio to mono channel using FFMPEG.

    console.log('Creating ffmpeg command...');

    let command = ffmpeg(tempFilePath)
        .audioChannels(1)
        .audioFrequency(16000)
        .format('wav')
        .output(targetTempFilePath);

    await promisifyCommand(command);
    console.log('Output audio created at', targetTempFilePath);
    // Uploading the audio.

    let transcription = await textToSpeech(targetTempFilePath);

    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(targetTempFilePath);

    res.json({ transcription: transcription });
});

module.exports.requestHandler = requestHandler; 
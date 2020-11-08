import React from 'react'
import { soundStorage, speechToText } from '../helpers/helpers';
import Mic from './Mic';

const options = {
    metadata: {
        contentType: 'audio/mpeg',
    }
};

// https://us-central1-sound-bite-277bd.cloudfunctions.net/SpeechToText?bN=sound-bite-277bd&sAN=sounds/blob:http:/localhost:3000/085d5f12-8b7b-44e0-957e-df063b7a77c5

// https://us-central1-sound-bite-277bd.cloudfunctions.net/SpeechToText?bN=sound-bite-277bd&sAN=
const speechToTextEndpoint = 'https://us-central1-sound-bite-277bd.cloudfunctions.net/SpeechToText?bN=sound-bite-277bd&sAN=';
const bucketName = 'sound-bite-277bd';

function ClipSaver() {



    const setBlobURL = async (blobURL) => {

        let blobList = blobURL.split('/');
        console.log(blobList);
        let blobName = blobList[blobList.length - 1];

        let storageRef = soundStorage.ref();
        let soundRef = storageRef.child("sounds/" + blobName);
        soundRef.put(await fetch(blobURL).then(r => r.blob()), options).then(async (snapshot, error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Uploaded sound blob!');
                console.log('sounds/' + blobName);
                const command = speechToTextEndpoint + "sounds/" + blobName;
                const data = await fetch(command, { method: 'POST', mode: 'no-cors' });

            }
        });
    }

    return (
        <div>
            <Mic setBlobURL={setBlobURL} />
        </div>
    )
}

export default ClipSaver

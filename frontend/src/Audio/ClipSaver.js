import React from 'react'
import { soundStorage, speechToText } from '../helpers/helpers';
import Mic from './Mic';
import { getCurrentUser } from '../helpers/helpers';
const options = {
    metadata: {
        contentType: 'audio/mpeg',
    }
};

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
                const command = speechToTextEndpoint + "sounds/" + blobName + '&username=' + getCurrentUser().email;
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

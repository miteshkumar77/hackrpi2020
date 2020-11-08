import { firebaseConfig } from './config';
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

let soundStorage = firebase.app().storage('gs://sound-bite-277bd');
let speechToText = firebase.functions().httpsCallable('SpeechToText', { method: 'GET', mode: 'no-cors' });
export { soundStorage, speechToText };
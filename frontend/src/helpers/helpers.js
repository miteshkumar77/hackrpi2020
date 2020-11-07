import { firebaseConfig } from './config';
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

let soundStorage = firebase.storage('gs://sound-bite-277bd');

export { soundStorage };
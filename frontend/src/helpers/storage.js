import { firebaseConfig } from '../config';
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

let storage = firebase.storage(); 
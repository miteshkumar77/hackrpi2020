import { firebaseConfig } from './config';
import firebase from 'firebase';
import "firebase/auth";
firebase.initializeApp(firebaseConfig);

let soundStorage = firebase.app().storage('gs://sound-bite-277bd');
let speechToText = firebase.functions().httpsCallable('SpeechToText', { method: 'GET', mode: 'no-cors' });
export { soundStorage, speechToText };

export { soundStorage };

// export function signup(email: string, password: string) {

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

// export function signin(email: string, password: string) {

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
    return auth().signOut();
}

export function getCurrentUser() {
    return auth().currentUser;
}

import { firebaseConfig } from './config';
import firebase from 'firebase';
import "firebase/auth";
firebase.initializeApp(firebaseConfig);

let soundStorage = firebase.app().storage('gs://sound-bite-277bd');
let speechToText = firebase.functions().httpsCallable('SpeechToText', { method: 'GET', mode: 'no-cors' });


let auth = firebase.auth;
// export function signup(email: string, password: string) {
export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}

export function logout() {
    return auth().signOut();
}

export function getCurrentUser() {
    return auth().currentUser;
}

export { auth, soundStorage, speechToText };

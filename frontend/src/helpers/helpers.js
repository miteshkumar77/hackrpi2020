import { firebaseConfig } from './config';
import firebase from 'firebase';
import "firebase/auth";
firebase.initializeApp(firebaseConfig);

let soundStorage = firebase.storage('gs://sound-bite-277bd');

export { soundStorage };

export function signup(email: string, password: string) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email: string, password: string) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut();
}

export function getCurrentUser() {
  return auth().currentUser;
}

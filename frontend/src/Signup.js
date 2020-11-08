import React from 'react';
import './Signup.css';
import firebase from 'firebase';
import "firebase/auth";
firebase.initializeApp(firebaseConfig);

function Signup() {

  function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

  function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Create user with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }


  return (

    <div className="container" id="container">
       <div className="form-container sign-up-container">
       </div>
       <div className="form-container sign-in-container">
          <form action="#">
             <h1>Sign in</h1>
             <input type="text" id="email" name="email" placeholder="Email" />
             <input type="password" id="password" name="password" placeholder="Password" />
             <button disabled onClick={toggleSignIn}>Sign In</button>
          </form>
       </div>
       <div className="overlay-container">
          <form action="#">
             <h1>Create Account</h1>
             <input type="email" id="email" name="email" placeholder="Email" />
             <input type="password" id="password" name="password" placeholder="Password" />
             <button onClick={handleSignUp}>Sign Up</button>
          </form>
       </div>
    </div>

    );

}

export default Signup;

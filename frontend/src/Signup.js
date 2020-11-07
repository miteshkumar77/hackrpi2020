import React from 'react';
import './Signup.css';

function Signup() {

  return (
    
    <div className="container" id="container">
       <div className="form-container sign-up-container">
       </div>
       <div className="form-container sign-in-container">
          <form action="#">
             <h1>Sign in</h1>
             <input type="email" placeholder="Email" />
             <input type="password" placeholder="Password" />
             <button>Sign In</button>
          </form>
       </div>
       <div className="overlay-container">
          <form action="#">
             <h1>Create Account</h1>
             <input type="text" placeholder="Name" />
             <input type="email" placeholder="Email" />
             <input type="password" placeholder="Password" />
             <button>Sign Up</button>
          </form>
       </div>
    </div>

    );


}

export default Signup;

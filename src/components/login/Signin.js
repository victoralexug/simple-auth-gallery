import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Signin() {
  const auth = getAuth(); // Get the auth instance
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/simple-auth-gallery');
    } catch (error) {
      setError(true) // if user is not logged in
    }
  };

  return (
    <div>    
      <div className="login-container">
        <h2>Login to Your Account</h2>

              {/* Display Error message */}
          {error && <p className='error'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/></svg><span className='error-message'>Incorrect username or password.</span></p>}

          <form className='login-form' onSubmit={handleLogin}>
              <label htmlFor="email"><i className='bx bxs-envelope'></i> Email:</label>
              <input type="email" id="email" name="email" placeholder='Enter email' autoComplete="current-email" onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="password"><i className='bx bx-user-pin'></i> Password:</label>
              <input type="password" id="password" name="password" placeholder='Enter password' autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
             
              <br/>
              <button type="submit">Login</button>
          </form>

          <p className='sign-up'>Don't have an account?
            <Link to={'/signup'}>
              <span>  sign up</span>
            </Link>
          </p>
      </div>
    </div>
  );
}

export default Signin;

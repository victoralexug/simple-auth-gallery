import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/simple-auth-gallery');
    } catch (error) {
      console.error('Error signing up:', error);
      // if user is not signed up
    }
  };

  return (
    <div className="login-container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignUp}  className='login-form'>
            <label htmlFor="email"><i className='bx bxs-envelope'></i> Email:</label>
            <input type="email" placeholder="Email" value={email} autoComplete="current-email" onChange={(e) => setEmail(e.target.value)} />
            
            <label htmlFor="password"><i className='bx bx-user-pin'></i> Password:</label>
            <input type="password" placeholder="Password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            
            <br/>
            <button type="submit">Sign Up</button>
        </form>
        
        <p className='sign-up'>Already have an account?
            <Link to={'/signin'}>
              <span>  sign in</span>
            </Link>
        </p>
    </div>
  );
}

export default SignUp;

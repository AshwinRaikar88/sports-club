import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Adjust the import path as necessary
import './LoginForm.css';
import '../Fixtures/Participants.css';

function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (userName.trim() === '') {
      setErrorMessage('Username is required');
      return;
    }
    if (password.trim() === '') {
      setErrorMessage('Password is required');
      return;
    }

    // Check if username and password are correct
    if (userName === 'ShlokPW' && password === 'Pawaskar@123') {
      setIsLoggedIn(true);  // Set the global login state to true
      navigate('/Home');    // Redirect to the '/Home' route
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className='loginform_container'>
      <div className='l1_cover'>
        <div className='lglass_cover'></div>
        <h1>Login</h1>  
        <img className='lcover_img' src="./images/login_cover.jpg" alt="cover" />
      </div>
      
      <div className='login_data'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className='btnLoginSubmit' type="submit">Login</button>    
      </form>
      </div>
    </div>
  );
}

export default LoginForm;

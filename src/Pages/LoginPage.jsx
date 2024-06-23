import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../Styles/LoginPage.css'

import LoginForm from '../components/LoginForm/LoginForm.jsx';

function LoginPage() {
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return (
    <div>
        <div className='login_area'>
            <LoginForm />
        </div>
    </div>
  );
}  

export default LoginPage;
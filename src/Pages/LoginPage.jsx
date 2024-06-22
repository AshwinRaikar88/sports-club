import React from 'react';
import '../Styles/LoginPage.css'

import LoginForm from '../components/LoginForm/LoginForm.jsx';

function LoginPage() {

  return (
    <div>
        <div className='login_area'>
            <LoginForm />
        </div>
    </div>
  );
}  

export default LoginPage;
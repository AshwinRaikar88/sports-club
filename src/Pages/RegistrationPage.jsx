import React from 'react';
import '../Styles/RegistrationPage.css'

import UserDataForm from '../components/RegistrationForm/UserDataForm.jsx';

function RegistrationPage() {

  return (
    <div>
        <div className='registration_area'>
            <UserDataForm />
        </div>
    </div>
  );
}  

export default RegistrationPage;
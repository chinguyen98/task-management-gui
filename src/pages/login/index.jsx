import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';

LoginPage.propTypes = {}

function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='Login'>
      <h1>Login Page</h1>
      <LoginForm></LoginForm>
    </div>
  )
}

export default LoginPage;
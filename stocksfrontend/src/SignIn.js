import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

const SignIn = (props) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  if (Cookie.get('token'))
    redirectToPortfolio();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };
    const response = await fetch('/api/user/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user })
    });
    
    if (response.status === 200)
      redirectToPortfolio();
  };
  const handeEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  
  const setDemoUser = () => {
    setEmail('azab@gmail.com');
    setPassword('catdog');
  };
  
  function redirectToPortfolio() {
    props.history.push('/dashboard/portfolio');
  }

  return <>
    <div style={centerStyle} >
      <div className="ui centered card">
        <div className="content">
          <div className="header">Sign In For Stocks</div>
        </div>
        <div className="content">
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="text" value={email} onChange={handeEmailChange} placeholder="email"/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={handlePasswordChange} placeholder="password "/>
            </div>
            <button className="ui teal button">Sign In</button>
            <div className="ui button" onClick={setDemoUser}>Demo User</div>
          </form>
        </div>
        <div className="content">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  </>;
};

const centerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute'
};

export default SignIn;
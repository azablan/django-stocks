import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, username, password };
    const response = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.status === 201) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      redirectToPortfolio();
    }
  };

  const handeEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  
  function redirectToPortfolio() {
    props.history.push('/dashboard/portfolio');
  }

  return <>
    <div style={centerStyle}>
      <div className="ui centered card">
        <div className="content">
          <div className="header">Sign Up For Stocks</div>
        </div>
        <div className="content">
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Username</label>
              <input type="text" value={username} placeholder="username" minLength="1" onChange={handleUsernameChange}/>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} placeholder="email" onChange={handeEmailChange}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} placeholder="password" minLength="6" onChange={handlePasswordChange}/>
            </div>
            <button className="ui teal button" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="content">
          <Link to="/signin">Sign In</Link>
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

export default SignUp;
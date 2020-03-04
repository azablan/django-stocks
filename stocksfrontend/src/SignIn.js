import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = (props) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    const response = await fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    if (response.status === 200) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      redirectToPortfolio();
    }
  };

  const handeEmailChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  
  const setDemoUser = () => {
    setUsername('azab');
    setPassword('promenade');
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
              <label>Username</label>
              <input type="text" value={username} onChange={handeEmailChange} placeholder="username"/>
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
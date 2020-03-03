import React from 'react';
import { 
  BrowserRouter, 
  Route,
  Switch
} from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

const App = () => {
  return <>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path={["/", "/signin"]} component={SignIn} />
      </Switch>
    </BrowserRouter>
  </>;
};

export default App;

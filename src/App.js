import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" render={props => <Dashboard {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
      </Router>
    </div>
  );
}

export default App;

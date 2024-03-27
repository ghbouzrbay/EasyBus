import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const firebaseConfig = {
  // Your Firebase configuration goes here
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/dashboard"
            render={() => <Dashboard user={user} setUser={setUser} />}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/matches" component={Matches} />
          <Route path="/chat" component={Chat} />
          <Route path="/settings" component={Settings} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
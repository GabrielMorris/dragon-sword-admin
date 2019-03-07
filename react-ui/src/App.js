import React, { Component } from 'react';
import './App.css';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import { Navbar, Nav } from 'react-bootstrap';
import Login from './components/auth/login';
import Admin from './components/admin/admin';
import requireAuth from './components/auth/require-auth';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand href="/">DRAGON SWORD</Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse className="justify-content-end">
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            {/* Home route */}
            {/* <Route path='/' exact component={}></Route> */}

            {/* Login route */}
            <Route path="/login" exact component={Login} />

            {/* Admin route */}
            <Route path="/admin" exact component={requireAuth(Admin)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import './App.css';

// Routing
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Components
import { Container, Row } from 'react-bootstrap';
import Login from './components/auth/login';
import Admin from './components/admin/admin';
import requireAuth from './components/auth/require-auth';

// TODO: move these
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Row>
            <nav role="navigation">
              {/* TODO: move to a nav component */}
              <Link to="/">
                <span>Home</span>
              </Link>
              <Link to="/admin">
                <span>Admin</span>
              </Link>
            </nav>
          </Row>

          <main>
            {/* END TODO:  */}
            <Switch>
              {/* Home route */}
              {/* <Route path='/' exact component={}></Route> */}

              {/* Login route */}
              <Route path="/login" exact component={Login} />

              {/* Admin route */}
              <Route path="/admin" exact component={requireAuth(Admin)} />
            </Switch>
          </main>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

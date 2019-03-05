// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import { Form, Button, Row, Container } from 'react-bootstrap';

// Styles

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: ''
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  _handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const { user, password } = this.state;

    this.props.dispatch(actions.login(user, password));
  }

  render() {
    return (
      <Row className="justify-content-md-center">
        <Form onSubmit={this._handleSubmit}>
          <Form.Group controlId="usernameControl">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="user"
              placeholder="Username"
              value={this.state.user}
              onChange={this._handleChange}
            />
          </Form.Group>

          <Form.Group controlId="passwordControl">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this._handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Login);

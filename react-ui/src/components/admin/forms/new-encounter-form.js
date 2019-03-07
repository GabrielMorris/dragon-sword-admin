// React
import React from 'react';
import { connect } from 'react-redux';

// Redux
import * as actions from '../actions';

// Components
import { Form, Button } from 'react-bootstrap';

export function NewEncounterForm(props) {
  return (
    <Form
      onSubmit={event => {
        event.preventDefault();

        const encounter = {
          text: props.state.text
        };

        const user = {
          user: props.auth.user,
          password: props.auth.password
        };

        props.dispatch(actions.newEncounter(encounter, user));
        props.closeModal();
      }}
    >
      <Form.Group controlId="newEncounterForm">
        <Form.Label>Text</Form.Label>
        <Form.Control
          as="textarea"
          name="text"
          placeholder="Text"
          value={props.state.text}
          onChange={props.handleChange}
          required
        />

        <Button variant="primary" type="submit" style={{ marginTop: '1em' }}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NewEncounterForm);

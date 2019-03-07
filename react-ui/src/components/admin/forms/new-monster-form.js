// React
import React from 'react';
import { connect } from 'react-redux';

// Redux
import * as actions from '../actions';

// Components
import { Form, Button } from 'react-bootstrap';

export function NewMonsterForm(props) {
  return (
    <Form
      onSubmit={event => {
        event.preventDefault();

        const health = Number(props.state.HP);
        const xpValue = Number(props.state.xpValue);
        const isBoss = props.state.boss === 'true';

        const monsterObj = {
          name: props.state.name,
          health: health,
          xpValue: xpValue,
          thumbnail: props.state.thumbnail,
          description: props.state.description,
          outro: props.state.outro,
          isBoss: isBoss
        };

        const user = {
          user: props.auth.user,
          password: props.auth.password
        };

        props.dispatch(actions.newMonster(monsterObj, user));
        props.closeModal();
      }}
    >
      <Form.Group controlId="newMonsterForm">
        {/* Name */}
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Name"
          value={props.state.name}
          onChange={props.handleChange}
          required
        />

        {/* HP */}
        <Form.Label>Health</Form.Label>
        <Form.Control
          type="text"
          name="HP"
          placeholder="HP"
          value={props.state.HP}
          onChange={props.handleChange}
          required
        />

        {/* XP */}
        <Form.Label>XP value</Form.Label>
        <Form.Control
          type="text"
          name="xpValue"
          placeholder="XP value"
          value={props.state.xpValue}
          onChange={props.handleChange}
          required
        />

        {/* Thumb */}
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="thumbnail"
          placeholder="Image"
          value={props.state.thumbnail}
          onChange={props.handleChange}
          required
        />

        {/* Description */}
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          placeholder="Description"
          value={props.state.description}
          onChange={props.handleChange}
          required
        />

        {/* Outro */}
        <Form.Label>Outro</Form.Label>
        <Form.Control
          as="textarea"
          name="outro"
          placeholder="Outro"
          value={props.state.outro}
          onChange={props.handleChange}
          required
        />

        {/* Boss? */}
        <Form.Label>Boss?</Form.Label>
        <Form.Control
          as="select"
          name="boss"
          placeholder="false"
          value={props.state.boss}
          onChange={props.handleChange}
          required
        >
          <option value={true}>true</option>
          <option value={false}>false</option>
        </Form.Control>

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

export default connect(mapStateToProps)(NewMonsterForm);

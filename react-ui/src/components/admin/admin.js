// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import { Modal, Tabs, Tab, Button, Form } from 'react-bootstrap';

import MonstersContainer from './monsters/monsters-container';
import EncountersContainer from './encounters/encounters-container';
import CharactersContainer from './characters/characters-container';

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedTab: 'monsters',
      characters: [],
      games: [],
      encounters: [],
      monsters: [],
      modalOpen: false,
      // TODO: move these to the monster modal
      name: '',
      HP: '',
      xpValue: '',
      thumbnail: '',
      description: '',
      outro: '',
      boss: false
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchMonsters());
    this.props.dispatch(actions.fetchCharacters());
    this.props.dispatch(actions.fetchEncounters());
  }

  handleModalOpen() {
    this.setState({ modalOpen: true });
  }

  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  _handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1em',
          marginBottom: '1em'
        }}
      >
        <h1 className="text-center">DRAGON SWORD</h1>

        <Tabs
          id="adminTabs"
          activeKey={this.state.focusedTab}
          onSelect={tab => this.setState({ focusedTab: tab })}
        >
          <Tab title="Monsters" eventKey="monsters">
            <Button
              variant="primary"
              onClick={this.handleModalOpen}
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block'
              }}
            >
              Add Monster
            </Button>

            <MonstersContainer />
          </Tab>

          <Tab title="Characters" eventKey="characters">
            <CharactersContainer />
          </Tab>

          <Tab title="Encounters" eventKey="encounters">
            <EncountersContainer />
          </Tab>
        </Tabs>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.modalOpen}
          onHide={this.handleModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              New Monster
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Form */}
            <Form
              onSubmit={event => {
                event.preventDefault();

                const health = Number(this.state.HP);
                const xpValue = Number(this.state.xpValue);
                const isBoss = this.state.boss === 'true';

                const monsterObj = {
                  name: this.state.name,
                  health: health,
                  xpValue: xpValue,
                  thumbnail: this.state.thumbnail,
                  description: this.state.description,
                  outro: this.state.outro,
                  isBoss: isBoss
                };

                const user = {
                  user: this.props.auth.user,
                  password: this.props.auth.password
                };

                console.log(monsterObj);

                // TODO: make this close the form and refresh the admin
                this.props.dispatch(actions.newMonster(monsterObj, user));
              }}
            >
              <Form.Group controlId="newMonsterForm">
                {/* Name */}
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this._handleChange}
                  required
                />

                {/* HP */}
                <Form.Label>Health</Form.Label>
                <Form.Control
                  type="text"
                  name="HP"
                  placeholder="HP"
                  value={this.state.HP}
                  onChange={this._handleChange}
                  required
                />

                {/* XP */}
                <Form.Label>XP value</Form.Label>
                <Form.Control
                  type="text"
                  name="xpValue"
                  placeholder="XP value"
                  value={this.state.xpValue}
                  onChange={this._handleChange}
                  required
                />

                {/* Thumb */}
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="thumbnail"
                  placeholder="Image"
                  value={this.state.thumbnail}
                  onChange={this._handleChange}
                  required
                />

                {/* Description */}
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this._handleChange}
                  required
                />

                {/* Outro */}
                <Form.Label>Outro</Form.Label>
                <Form.Control
                  as="textarea"
                  name="outro"
                  placeholder="Outro"
                  value={this.state.outro}
                  onChange={this._handleChange}
                  required
                />

                {/* Boss? */}
                <Form.Label>Boss?</Form.Label>
                <Form.Control
                  as="select"
                  name="boss"
                  placeholder="false"
                  value={this.state.boss}
                  onChange={this._handleChange}
                  required
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Form.Control>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: '1em' }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monsters: state.admin.monsters,
  characters: state.admin.characters,
  encounters: state.admin.encounters,
  auth: state.auth
});

export default connect(mapStateToProps)(Admin);

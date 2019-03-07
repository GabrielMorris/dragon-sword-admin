// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import { Modal, Tabs, Tab, Button, Container } from 'react-bootstrap';

import MonstersContainer from './monsters/monsters-container';
import EncountersContainer from './encounters/encounters-container';
import CharactersContainer from './characters/characters-container';

import NewEncounterForm from './forms/new-encounter-form';
import NewMonsterForm from './forms/new-monster-form';

// Utils
import { capitalizeFirstLetter } from '../../utils/game-utils';

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
      boss: false,
      // TODO: move these to the encounter modal
      text: ''
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

  /* Form generators */
  generateModalForm() {
    if (this.state.focusedTab === 'monsters') {
      return (
        <NewMonsterForm
          state={this.state}
          closeModal={this.handleModalClose}
          handleChange={this._handleChange}
        />
      );
    } else if (this.state.focusedTab === 'encounters') {
      return (
        <NewEncounterForm
          state={this.state}
          closeModal={this.handleModalClose}
          handleChange={this._handleChange}
        />
      );
    }
  }

  /* Handlers */
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
      <Container>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em',
            marginBottom: '1em'
          }}
        >
          <Tabs
            id="adminTabs"
            activeKey={this.state.focusedTab}
            onSelect={tab => this.setState({ focusedTab: tab })}
          >
            {/* Monsters tab */}
            <Tab title="Monsters" eventKey="monsters">
              <Button
                variant="primary"
                onClick={() => {
                  this.handleModalOpen();
                }}
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

            {/* Characters tab */}
            <Tab title="Characters" eventKey="characters">
              <CharactersContainer />
            </Tab>

            {/* Encounters tab */}
            <Tab title="Encounters" eventKey="encounters">
              <Button
                variant="primary"
                onClick={() => {
                  this.handleModalOpen();
                }}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block'
                }}
              >
                Add Encounter
              </Button>
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
                New{' '}
                {capitalizeFirstLetter(this.state.focusedTab).slice(
                  0,
                  this.state.focusedTab.length - 1
                )}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>{this.generateModalForm()}</Modal.Body>
            <Modal.Footer />
          </Modal>
        </div>
      </Container>
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

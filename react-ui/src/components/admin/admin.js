// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

// Components
import CharacterCard from '../cards/character-card';
import MonsterCard from '../cards/monster-card';
import EncountersCard from '../cards/encounters-card';
import { Modal, Row, Col, CardColumns } from 'react-bootstrap';

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      games: [],
      encounters: [],
      monsters: [],
      modalOpen: false
    };

    this._handleModalOpen = this._handleModalOpen.bind(this);
    this._handleModalClose = this._handleModalClose.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchMonsters());
    this.props.dispatch(actions.fetchCharacters());
    this.props.dispatch(actions.fetchEncounters());
  }

  generateCharacters() {
    return this.props.characters.map((character, index) => {
      return <CharacterCard character={character} key={index} />;
    });
  }

  generateEncounters() {
    return this.props.encounters.map((encounter, index) => {
      return <EncountersCard encounter={encounter} key={index} />;
    });
  }

  generateMonsters() {
    return this.props.monsters.map((monster, index) => {
      return <MonsterCard monster={monster} key={index} />;
    });
  }

  _handleModalOpen() {
    this.setState({ modalOpen: true });
    console.log(this.state);
  }

  _handleModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div
        style={{
          // maxWidth: '70%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1em',
          marginBottom: '1em'
        }}
      >
        <h1 className="text-center">DRAGON SWORD</h1>

        {/* Monsters */}
        <div style={{ marginBottom: '1em' }}>
          <h3>Monsters</h3>

          <button onClick={() => this._handleModalOpen()}>ADD MONSTER</button>

          <CardColumns>{this.generateMonsters()}</CardColumns>
        </div>

        {/* Characters */}
        <div style={{ marginBottom: '1em' }}>
          <h3>Characters</h3>

          <CardColumns>{this.generateCharacters()}</CardColumns>
        </div>

        {/* Encounters */}
        <div style={{ marginBottom: '1em' }}>
          <h3>Encounters</h3>

          <CardColumns style={{ width: '100%' }}>
            {this.generateEncounters()}
          </CardColumns>
        </div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.modalOpen}
          onHide={this._handleModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
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
  encounters: state.admin.encounters
});

export default connect(mapStateToProps)(Admin);

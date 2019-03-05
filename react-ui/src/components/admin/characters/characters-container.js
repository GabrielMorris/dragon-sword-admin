// React
import React from 'react';
import { connect } from 'react-redux';

// Components
import CharacterCard from '../../cards/character-card';
import { CardColumns, Button } from 'react-bootstrap';

export class CharactersContainer extends React.Component {
  generateCharacterCards() {
    return (
      <div style={{ marginBottom: '1em' }}>
        <h3>Characters</h3>

        <CardColumns>{this.generateCharacters()}</CardColumns>
      </div>
    );
  }

  generateCharacters() {
    return this.props.characters.map((character, index) => {
      return <CharacterCard character={character} key={index} />;
    });
  }

  render() {
    return this.generateCharacterCards();
  }
}

const mapStateToProps = state => ({
  characters: state.admin.characters
});

export default connect(mapStateToProps)(CharactersContainer);

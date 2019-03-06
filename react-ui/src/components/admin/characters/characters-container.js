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
    return this._sortCharacters(this.props.characters).map(
      (character, index) => {
        return <CharacterCard character={character} key={index} />;
      }
    );
  }

  _sortCharacters(characters) {
    if (characters.length > 0) {
      return characters.sort((a, b) => {
        return b.experience - a.experience;
      });
    }

    return characters;
  }

  render() {
    return this.generateCharacterCards();
  }
}

const mapStateToProps = state => ({
  characters: state.admin.characters
});

export default connect(mapStateToProps)(CharactersContainer);

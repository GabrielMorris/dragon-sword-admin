import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      characters: [],
      games: [],
      encounters: [],
      monsters: []
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      })
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      });
    fetch('/api/characters')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          characters: json
        });
      });
    fetch('/api/games')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          games: json
        });
      });
    fetch('/api/encounters')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          encounters: json
        });
      });
    fetch('/api/monsters')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          monsters: json
        });
      });
  }

  generateCharacters() {
    return this.state.characters.map(character => {
      return (
        <ul>
          <li>Class: {character.class}</li>
          <li>Guild ID: {character.guildID}</li>
          <li>User: {character.memberID}</li>
          <li>XP: {character.experience}</li>
          <li>HP: {character.health}</li>
          <li>MP: {character.mana}</li>
          <li>STR: {character.str}</li>
          <li>DEF: {character.def}</li>
          <li>AGI: {character.agi}</li>
          <li>LUCK: {character.luck}</li>
          <li>Pronouns: {character.pronouns}</li>
        </ul>
      );
    });
  }

  generateEncounters() {
    return this.state.encounters.map(encounter => {
      return <li>{encounter.text}</li>;
    });
  }

  generateMonsters() {
    return this.state.monsters.map(monster => {
      return (
        <ul>
          <li>
            Portrait:{' '}
            <img
              src={monster.thumbnail}
              alt={monster.name}
              style={{ height: 100, width: 100 }}
            />
          </li>
          <li>Name: {monster.name}</li>
          <li>HP: {monster.health}</li>
          <li>XP value: {monster.xpValue}</li>
          <li>Description: {monster.description}</li>
          <li>Outro: {monster.outro}</li>
        </ul>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>DRAGON SWORD</h1>
        </header>

        <main>
          <h2>Characters</h2>
          {this.generateCharacters()}

          <h2>Monsters</h2>
          {this.generateMonsters()}

          <h2>Encounters</h2>
          <ul>{this.generateEncounters()}</ul>
        </main>
      </div>
    );
  }
}

export default App;

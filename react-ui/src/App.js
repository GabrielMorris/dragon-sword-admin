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

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}

        <main>{this.generateCharacters()}</main>
      </div>
    );
  }
}

export default App;

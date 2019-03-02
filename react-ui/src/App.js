import React, { Component } from 'react';
import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CharacterCard from './components/cards/character-card';
import MonsterCard from './components/cards/monster-card';
import EncountersCard from './components/cards/encounters-card';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      games: [],
      encounters: [],
      monsters: []
    };
  }

  componentDidMount() {
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
    return this.state.characters.map((character, index) => {
      return (
        <Grid item sm={3} key={index}>
          <CharacterCard character={character} key={index} />
        </Grid>
      );
    });
  }

  generateEncounters() {
    return this.state.encounters.map((encounter, index) => {
      return (
        <Grid item sm={4} key={index}>
          <EncountersCard encounter={encounter} key={index} />
        </Grid>
      );
    });
  }

  generateMonsters() {
    return this.state.monsters.map((monster, index) => {
      return (
        <Grid item sm={4} key={index}>
          <MonsterCard monster={monster} key={index} />
        </Grid>
      );
    });
  }

  render() {
    return (
      <Grid container spacing={24}>
        <div
          style={{
            maxWidth: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1em',
            marginBottom: '1em'
          }}
        >
          <MuiThemeProvider theme={theme}>
            <Typography component="h2" variant="h2" align="center" gutterBottom>
              DRAGON SWORD
            </Typography>

            {/* Monsters */}
            <div style={{ marginBottom: '1em' }}>
              <Typography component="h3" variant="h3" gutterBottom>
                Monsters
              </Typography>

              <Grid container spacing={24}>
                {this.generateMonsters()}
              </Grid>
            </div>

            {/* Characters */}
            <div style={{ marginBottom: '1em' }}>
              <Typography component="h3" variant="h3" gutterBottom>
                Characters
              </Typography>
              <Grid container spacing={24}>
                {this.generateCharacters()}
              </Grid>
            </div>

            {/* Encounters */}
            <div style={{ marginBottom: '1em' }}>
              <Typography component="h3" variant="h3" gutterBottom>
                Encounters
              </Typography>

              <Grid container spacing={24}>
                {this.generateEncounters()}
              </Grid>
            </div>
          </MuiThemeProvider>
        </div>
      </Grid>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

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
    return this.state.characters.map(character => {
      return (
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {character.memberID}
              </Typography>

              <Typography component="li">Class: {character.class}</Typography>
              <Typography component="li">
                Guild ID: {character.guildID}
              </Typography>
              <Typography component="li">XP: {character.experience}</Typography>
              <Typography component="li">HP: {character.health}</Typography>
              <Typography component="li">MP: {character.mana}</Typography>
              <Typography component="li">STR: {character.str}</Typography>
              <Typography component="li">DEF: {character.def}</Typography>
              <Typography component="li">AGI: {character.agi}</Typography>
              <Typography component="li">LUCK: {character.luck}</Typography>
              <Typography component="li">
                Pronouns: {character.pronouns}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  generateEncounters() {
    return this.state.encounters.map(encounter => {
      return (
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <Typography component="p">{encounter.text}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  generateMonsters() {
    return this.state.monsters.map(monster => {
      return (
        <Grid item sm={4}>
          <Card>
            <CardMedia
              component="img"
              alt={monster.name}
              style={{
                height: 100,
                width: 100,
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              image={monster.thumbnail}
              title={monster.name}
            />

            <CardContent>
              <Typography variant="h5" component="h2">
                {monster.name}
              </Typography>

              <Typography component="li">HP: {monster.health}</Typography>
              <Typography component="li">
                XP value: {monster.xpValue}
              </Typography>
              <Typography component="li">
                Description: {monster.description}
              </Typography>
              <Typography component="li">Outro: {monster.outro}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  render() {
    return (
      <div style={{ maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
        <MuiThemeProvider theme={theme}>
          <Typography component="h2" variant="h1" align="center" gutterBottom>
            DRAGON SWORD
          </Typography>

          {/* Monsters */}
          <div style={{ marginBottom: '1em' }}>
            <Typography variant="h2" gutterBottom>
              Monsters
            </Typography>

            <Grid container spacing={24}>
              {this.generateMonsters()}
            </Grid>
          </div>

          {/* Characters */}
          <div style={{ marginBottom: '1em' }}>
            <Typography variant="h2" gutterBottom>
              Characters
            </Typography>
            <Grid container spacing={24}>
              {this.generateCharacters()}
            </Grid>
          </div>

          {/* Encounters */}
          <div style={{ marginBottom: '1em' }}>
            <Typography variant="h2" gutterBottom>
              Encounters
            </Typography>

            <Grid container spacing={24}>
              {this.generateEncounters()}
            </Grid>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

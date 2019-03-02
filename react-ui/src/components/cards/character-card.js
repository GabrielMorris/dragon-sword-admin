// React
import React from 'react';

// Components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function CharacterCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {props.character.username}
        </Typography>

        <Typography component="li">Class: {props.character.class}</Typography>
        <Typography component="li">
          Guild: {props.character.guildName}
        </Typography>
        <Typography component="li">XP: {props.character.experience}</Typography>
        <Typography component="li">HP: {props.character.health}</Typography>
        <Typography component="li">MP: {props.character.mana}</Typography>
        <Typography component="li">STR: {props.character.str}</Typography>
        <Typography component="li">DEF: {props.character.def}</Typography>
        <Typography component="li">AGI: {props.character.agi}</Typography>
        <Typography component="li">LUCK: {props.character.luck}</Typography>
        <Typography component="li">
          Pronouns: {props.character.pronouns}
        </Typography>
      </CardContent>
    </Card>
  );
}

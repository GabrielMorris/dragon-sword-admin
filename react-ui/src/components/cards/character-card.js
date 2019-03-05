// React
import React from 'react';

// Components
import { Card, ListGroup } from 'react-bootstrap';

// Utils
import { calculateStats, getCharacterLevel } from '../../utils/game-utils';
import classes from '../../constants/character-classes';

export default function CharacterCard(props) {
  if (!props.character) return null;

  const level = getCharacterLevel(props.character);
  const stats = calculateStats(props.character, level);
  const classObj = classes.find(
    classObj => classObj.name === props.character.class.toLowerCase()
  );

  return (
    <Card>
      <Card.Img
        variant="top"
        src={classObj.thumbnail}
        style={{
          height: '100px',
          width: '100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block'
        }}
      />

      <Card.Header as="h4" className="text-center">
        {props.character.username}
      </Card.Header>

      <ListGroup>
        <ListGroup.Item as="h5" className="text-center">
          {props.character.class}
        </ListGroup.Item>
        <ListGroup.Item>Pronouns: {props.character.pronouns}</ListGroup.Item>
        <ListGroup.Item>Guild: {props.character.guildName}</ListGroup.Item>
        <ListGroup.Item>XP: {props.character.experience}</ListGroup.Item>
        <ListGroup.Item>HP: {stats.HP}</ListGroup.Item>
        <ListGroup.Item>MP: {stats.MP}</ListGroup.Item>
        <ListGroup.Item>DEF: {stats.DEF}</ListGroup.Item>
        <ListGroup.Item>AGI: {stats.AGI}</ListGroup.Item>
        <ListGroup.Item>LUCK: {stats.LUCK}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

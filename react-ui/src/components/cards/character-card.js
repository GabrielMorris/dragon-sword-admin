// React
import React from 'react';

// Components
import { Card, ListGroup } from 'react-bootstrap';

// Utils
import { calculateStats, getCharacterLevel } from '../../utils/game-utils';

export default function CharacterCard(props) {
  if (!props.character) return null;

  const level = getCharacterLevel(props.character);
  const stats = calculateStats(props.character, level);

  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        {props.character.username}
      </Card.Header>

      <ListGroup>
        <ListGroup.Item>Class: {props.character.class}</ListGroup.Item>
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

// React
import React from 'react';

// Components
import { Card, ListGroup } from 'react-bootstrap';

// Utils
import { capitalizeFirstLetter } from '../../utils/game-utils';

export default function MonsterCard(props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={props.monster.thumbnail}
        style={{
          height: '100px',
          width: '100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block'
        }}
      />

      <Card.Header as="h4" className="text-center">
        {props.monster.name}
      </Card.Header>

      <ListGroup>
        <ListGroup.Item>HP: {props.monster.health}</ListGroup.Item>
        <ListGroup.Item>XP value: {props.monster.xpValue}</ListGroup.Item>
        <ListGroup.Item>Damage: {props.monster.damage}</ListGroup.Item>
        <ListGroup.Item>
          Is boss?: {props.monster.isBoss ? 'true' : 'false'}
        </ListGroup.Item>
        <ListGroup.Item>
          Description: {capitalizeFirstLetter(props.monster.description)}
        </ListGroup.Item>
        <ListGroup.Item>Outro: {props.monster.outro}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

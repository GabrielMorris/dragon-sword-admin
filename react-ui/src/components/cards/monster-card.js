// React
import React from 'react';

// Components
import { Card, ListGroup } from 'react-bootstrap';

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
          marginRight: 'auto'
        }}
      />

      <Card.Header as="h5">{props.monster.name}</Card.Header>

      <ListGroup>
        <ListGroup.Item>HP: {props.monster.health}</ListGroup.Item>
        <ListGroup.Item>XP value: {props.monster.xpValue}</ListGroup.Item>
        <ListGroup.Item>
          Description: {props.monster.description}
        </ListGroup.Item>
        <ListGroup.Item>Outro: {props.monster.outro}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

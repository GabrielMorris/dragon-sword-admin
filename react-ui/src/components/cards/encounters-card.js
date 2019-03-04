// React
import React from 'react';

// Components
import { Card } from 'react-bootstrap';

export default function EncountersCard(props) {
  return (
    <Card>
      <Card.Body>{props.encounter.text}</Card.Body>
    </Card>
  );
}

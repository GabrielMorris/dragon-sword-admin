// React
import React from 'react';

// Components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function EncountersCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography component="p">{props.encounter.text}</Typography>
      </CardContent>
    </Card>
  );
}

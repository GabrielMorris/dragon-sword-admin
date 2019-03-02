// React
import React from 'react';

// Components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default function MonsterCard(props) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={props.monster.name}
        style={{
          height: 100,
          width: 100,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        image={props.monster.thumbnail}
        title={props.monster.name}
      />

      <CardContent>
        <Typography variant="h5" component="h2">
          {props.monster.name}
        </Typography>

        <Typography component="li">HP: {props.monster.health}</Typography>
        <Typography component="li">
          XP value: {props.monster.xpValue}
        </Typography>
        <Typography component="li">
          Description: {props.monster.description}
        </Typography>
        <Typography component="li">Outro: {props.monster.outro}</Typography>
      </CardContent>
    </Card>
  );
}

// React
import React from 'react';
import { connect } from 'react-redux';

// Components
import MonsterCard from '../../cards/monster-card';
import { CardColumns, Button } from 'react-bootstrap';

export class MonstersContainer extends React.Component {
  generateMonsterCards() {
    return (
      <div style={{ marginBottom: '1em' }}>
        <h3>Monsters</h3>

        <CardColumns style={{ marginTop: '1em' }}>
          {this.generateMonsters()}
        </CardColumns>
      </div>
    );
  }

  generateMonsters() {
    return this._sortMonsters(this.props.monsters).map((monster, index) => {
      return <MonsterCard monster={monster} key={index} />;
    });
  }

  _sortMonsters(monsters) {
    if (monsters.length > 0) {
      return monsters.sort((a, b) => {
        return b.health - a.health;
      });
    }

    return monsters;
  }

  render() {
    return this.generateMonsterCards();
  }
}

const mapStateToProps = state => ({
  monsters: state.admin.monsters
});

export default connect(mapStateToProps)(MonstersContainer);

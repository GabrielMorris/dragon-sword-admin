// React
import React from 'react';
import { connect } from 'react-redux';

// Components
import EncountersCard from '../../cards/encounters-card';
import { CardColumns, Button } from 'react-bootstrap';

export class EncountersContainer extends React.Component {
  generateEncounterCards() {
    return (
      <div style={{ marginBottom: '1em' }}>
        <h3>Encounters</h3>

        <CardColumns style={{ width: '100%' }}>
          {this.generateEncounters()}
        </CardColumns>
      </div>
    );
  }

  generateEncounters() {
    return this.props.encounters.map((encounter, index) => {
      return <EncountersCard encounter={encounter} key={index} />;
    });
  }

  render() {
    return this.generateEncounterCards();
  }
}

const mapStateToProps = state => ({
  encounters: state.admin.encounters
});

export default connect(mapStateToProps)(EncountersContainer);

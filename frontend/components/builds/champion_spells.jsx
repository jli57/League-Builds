import React from 'react';

class ChampionSpells extends React.Component {
  constructor(props) {
    super(props);
  }

  getSkillKey(i) {
    switch(i) {
      case 0: return "Q";
      case 1: return "W";
      case 2: return "E";
      case 3: return "R";
    }
  }

  render() {
    return (
      <table className="spells-table">
        <thead>
          <tr>
            <td>Key</td>
            <td>Spell Name</td>
            <td>Spell Description</td>
          </tr>
        </thead>
        <tbody>
          { this.props.spells.map( (spell, i) => (
              <tr key={i}>
                <td>{ this.getSkillKey(i) }</td>
                <td>{spell.name}</td>
                <td>{spell.description}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default ChampionSpells;

import React from 'react';

class ChampionStats extends React.Component {
  constructor(props) {
    super(props);
  }

  calculateStat(key) {
    let val = this.props.stats[key];
    const perlevelKey = `${key}perlevel`;
    if ( this.props.stats[perlevelKey] !== undefined ) {
      val += this.props.stats[perlevelKey]*( this.props.level - 1 );
      val = Math.round(val, 2);
    }
    return val;
  }

  render() {
    return (
      <table className="stats-table">
        <tbody>
          { Object.keys(this.props.stats).map( key => (
              key.indexOf("perlevel") >= 0 ? null :
              <tr key={key}>
                <td>{key}</td>
                <td>{this.calculateStat(key)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default ChampionStats;

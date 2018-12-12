import React from 'react';
import ChampionStats from './champion_stats';
import ChampionSpells from './champion_spells';

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1
    };
  }

  handleClick(delta) {
    const level = this.state.level + delta;
    if ( level >= 1 && level <= 18 ) {
      this.setState({level});
    }
  }

  render() {
    return (
      <section id="champion-data" className="hidden">
          <h1>{ this.props.champion.name }</h1>
          <div id="champion-level" >
            <button onClick={this.handleClick.bind(this, -1)}><i className="fas fa-caret-left"></i></button>
            { this.state.level }
            <button onClick={this.handleClick.bind(this, 1)}><i className="fas fa-caret-right"></i></button>
          </div>

        <div className="flexbox">
          <ChampionStats stats={this.props.champion.stats || {} } level={this.state.level} />
          <ChampionSpells spells={this.props.champion.spells || []} level={this.state.level} />
        </div>
      </section>
    )
  }
}

export default Champion;

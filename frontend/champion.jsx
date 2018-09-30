import React from 'react';
import APIUtil from './api_util';

class Champion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick() {
    $.getJSON(APIUtil.champions,
      (res) => {
        const data = res.data;
        const champions = Object.keys(data);
        this.setState({champions});
      }
    );
    $.getJSON(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/${championName}.json`,
      (res) => {
        const data = res.data;
      }
    )
  }

  render() {
    return (
      <div className="champion-icon">
        <img className="champion-img-icon" src={ APIUtil.championIcon(this.props.championName ) } alt={ this.props.championName }/>
        <p>{ this.props.championName }</p>
      </div>
    )
  }
}

export default Champion;

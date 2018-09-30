import React from 'react';
import Champion from './champion';
import APIUtil from './api_util';

class ChampionIndex extends React.Component {

  constructor() {
    super();
    this.state = { champions: [], query: "", allChampions: [] };
  }

  componentDidMount = () => {
    APIUtil.getChampions(this.renderAllChampions.bind(this));
  }

  renderAllChampions = (res) => {
    const data = res.data;
    const allChampions = Object.keys(data);
    this.setState( {allChampions}, () => {
      this.setChampions(this.state.query);
    });
  }

  setChampions = (query) => {
    const champions = this.state.allChampions.filter( (championName) => (
       championName.toLowerCase().includes( this.state.query )
    ));
    this.setState({champions});
  }

  search = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({query}, () => {
      this.setChampions(query);
    });
  }

  render() {
    return (
      <div>
        <h1>All Champions</h1>
        <input type="text" onChange={ this.search } value={ this.state.query }/>
        <p>Total: { this.state.champions.length }</p>
        <ul className="champion-list">
          { this.state.champions.map( (champion, i) => (
            <li key={i} ><Champion championName={ champion } /></li>
          )) }
        </ul>
      </div>
    )
  }
}
export default ChampionIndex;

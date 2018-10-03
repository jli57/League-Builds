import React from 'react';
import ChampionsIndex from './champions_index';

class ChampionsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  componentDidMount() {
    this.props.fetchChampions();
  }

  setSearchTerm(e) {
    e.preventDefault();
    const searchTerm = e.target.value;
    this.setState({ setSearchTerm })
      .then( () => console.log("Search Champions") );
  }

  render() {
    return (
      <div>
        <label>Search
          <input type="text" onChange={ this.setSearchTerm } value={ this.state.searchTerm }/>
        </label>
        <ChampionsIndex champions={this.props.champions} />
      </div>
    )
  }

}
export default ChampionsSearch

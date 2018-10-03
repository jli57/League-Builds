import { connect } from 'react-redux';
import ChampionsSearch from './champions_search';
import { fetchChampions } from '../../actions/champion_actions';
import { allChampions } from '../../reducers/selectors';

const mapStateToProps = state => ({
  champions: allChampions(state),
});

const mapDispatchToProps = dispatch => ({
 fetchChampions: () => dispatch(fetchChampions())
});

const ChampionSearchContainer = connect(mapStateToProps, mapDispatchToProps)
(ChampionsSearch);

export default ChampionSearchContainer;

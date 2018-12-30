import { connect } from 'react-redux';
import ChampionsSearch from './champions_search';
import { fetchChampions } from '../../actions/champion_actions';
import { fetchChampionData } from '../../actions/build_actions';
import { selectChampions } from '../../reducers/selectors';

const mapStateToProps = state => ({
  champions: selectChampions(state.champions),
});

const mapDispatchToProps = dispatch => ({
 fetchChampions: () => dispatch(fetchChampions()),
 fetchChampionData: (championKey) => dispatch(fetchChampionData(championKey))
});

const ChampionSearchContainer = connect(mapStateToProps, mapDispatchToProps)
(ChampionsSearch);

export default ChampionSearchContainer;

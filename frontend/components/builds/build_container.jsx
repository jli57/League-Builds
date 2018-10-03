import { connect } from 'react-redux';
import BuildEditor from './build_editor';
import { selectChampion } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    champion: selectChampion(state.build.champion),
  };
};

const mapDispatchToProps = dispatch => ({

});

const BuildContainer = connect(mapStateToProps)(BuildEditor);

export default BuildContainer;

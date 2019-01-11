import { RECEIVE_CHAMPION } from '../actions/build_actions';
import merge from 'lodash/merge';

const initialState = { champion: {}, items: [], mastery: []};

export const buildsReducer = ( state = initialState, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHAMPION:
      let newState = merge({}, state);
      newState.champion = Object.values(action.champion)[0];
      return newState;
    default:
      return state;
  }
}

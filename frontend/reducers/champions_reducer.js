import { RECEIVE_CHAMPIONS } from '../actions/champion_actions';
import merge from 'lodash/merge';

const initialState = {};

export const championsReducer = ( state = initialState, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHAMPIONS:
      let newState = merge({}, state, action.champions);
      return newState;
    default:
      return state;
  }
}

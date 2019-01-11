import { RECEIVE_ITEMS } from '../actions/item_actions';
import merge from 'lodash/merge';

const initialState = {};

export const itemsReducer = ( state = initialState, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ITEMS:
      let newState = merge({}, state, action.items);
      return newState;
    default:
      return state;
  }
}

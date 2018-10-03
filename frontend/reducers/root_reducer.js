import { combineReducers } from 'redux';
import { championsReducer } from './champions_reducer';

export const rootReducer = combineReducers({
  champions: championsReducer,
});

import { combineReducers } from 'redux';
import { championsReducer } from './champions_reducer';
import { buildsReducer } from './builds_reducer';

export const rootReducer = combineReducers({
  champions: championsReducer,
  build: buildsReducer,
});

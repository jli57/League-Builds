import { combineReducers } from 'redux';
import { championsReducer } from './champions_reducer';
import { buildsReducer } from './builds_reducer';
import { itemsReducer } from './item_reducer';

export const rootReducer = combineReducers({
  champions: championsReducer,
  items: itemsReducer,
  build: buildsReducer,
});

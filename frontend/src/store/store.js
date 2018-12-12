import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/root_reducer.js';
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';

export const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
};

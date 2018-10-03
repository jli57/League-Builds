import React from 'react';
import { Provider } from 'react-redux';
import ChampionSearchContainer from './champions/champions_search_container';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <ChampionSearchContainer />
    </Provider>
  );
};

export default Root;

import React from 'react';
import ChampionSearchContainer from './champions/champions_search_container';
import BuildContainer from './builds/build_container';

const App = () => {
  return (
    <section id="app">
      <ChampionSearchContainer />
      <BuildContainer />
    </section>
  );
};

export default App;

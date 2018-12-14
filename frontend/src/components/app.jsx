import React from 'react';
import ChampionSearchContainer from './champions/champions_search_container';
import BuildContainer from './builds/build_container';
import Header from './header/header';

const App = () => {
  return (
    <div id="app">
      <Header />
      <section id="body">
        <ChampionSearchContainer />
        <BuildContainer />
      </section>
    </div>
  );
};

export default App;

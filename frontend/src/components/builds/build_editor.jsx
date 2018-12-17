import React from 'react';
import Champion from './champion';

const BuildEditor = ({champion, items, masteries}) => {
  if ( champion.length === 0 ) return null;
  return (
    <section className="build">
      <Champion champion={champion} />
    </section>
  )
}

export default BuildEditor;

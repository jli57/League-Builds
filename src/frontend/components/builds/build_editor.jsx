import React from 'react';
import Champion from './champion';

const BuildEditor = ({champion, items, masteries}) => {
  return (
    <section className="build-section">
      <Champion champion={champion} />
    </section>
  )
}

export default BuildEditor;

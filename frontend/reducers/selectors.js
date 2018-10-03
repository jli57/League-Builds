export const selectChampions = (champions) => {
  return Object.keys(champions).map(championName => champions[championName] );
}

export const selectChampion = (champion) => {
  if ( $.isEmptyObject(champion) ) {
    return []; 
  }
  return Object.values(champion)[0];;
}

export const filterChampions = (champions, searchTerm) => {
  if ( searchTerm !== "" ) {
    return champions.filter((champion) => (
      champion.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }
  return champions;
}

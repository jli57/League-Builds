export const selectChampions = (champions) => {
  return Object.values(champions);
}

export const selectChampion = (champion) => {
  if ( $.isEmptyObject(champion) ) {
    return [];
  }
  return Object.values(champion)[0];;
}


export const selectItem = (items) => {
  return Object.values(items);
}

export const filterChampions = (champions, searchTerm) => {
  if ( searchTerm !== "" ) {
    return champions.filter((champion) => (
      champion.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }
  return champions;
}

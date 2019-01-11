export const selectChampions = (champions) => {
  return Object.values(champions);
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

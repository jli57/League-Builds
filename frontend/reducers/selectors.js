export const allChampions = ({champions}) => {
  console.log(champions);
  return Object.keys(champions).map(championName => champions[championName] );
}

export const filterChampions = (champions, searchTerm) => {
  if ( searchTerm !== "" ) {
    return champions.filter((champion) => champion.name.includes(searchTerm));
  }
  return champions; 
}

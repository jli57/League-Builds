export const allChampions = ({champions}) => {
  console.log(champions);
  return Object.keys(champions).map(championName => champions[championName] );
}

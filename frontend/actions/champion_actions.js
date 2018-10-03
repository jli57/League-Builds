import * as APIUtil from '../utils/api_util';

export const RECEIVE_CHAMPIONS = "RECEIVE_CHAMPIONS";
export const FILTER_CHAMPIONS = "FILTER_CHAMPIONS";

export const searchChampions = searchTerm => dispatch => {

}

export const receiveChampions = (champions) => ({
  type: RECEIVE_CHAMPIONS,
  champions
});

export const fetchChampions = () => {
  return (dispatch) => {
    return APIUtil.fetchChampions().then(
      (res) => dispatch(receiveChampions(res.data))
    );
  }
}

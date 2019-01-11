import * as APIUtil from '../utils/item_api_util';

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export const RECEIVE_ITEM = "RECEIVE_ITEM";

export const receiveItems = (items) => ({
  type: RECEIVE_ITEMS,
  items
});

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item
});

export const fetchItems = () => dispatch => {
  return APIUtil.fetchItems().then(
    (res) => {
      dispatch(receiveItems(res.data))
    }
  );
}

export const fetchItem = () => dispatch => {
  return APIUtil.fetchItem().then(
    (res) => {
      dispatch(receiveItem(res.data))
    }
  )
}
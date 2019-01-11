import React from 'react';
import { connect } from 'react-redux';
import ItemsIndex from './items_index';
import { fetchItems, fetchItem } from '../../actions/item_actions';
import { selectItem } from '../../reducers/selectors';

class ItemsIndexContainer extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return <ItemsIndex items={this.props.items} />
  }
}

const mapStateToProps = state => ({
  items: selectItem(state.items),
});

const mapDispatchToProps = dispatch => ({
 fetchItems: () => dispatch(fetchItems()),
 fetchItem: (itemKey) => dispatch(fetchItem(itemKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)
(ItemsIndexContainer);

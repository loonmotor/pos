import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import ItemsAPI from '../api/ItemsAPI';

const actionCreators = {
	fetchItems (api) {
		let fetchItemsBinded = actionCreators.fetchItems.bind(null, api);
		AppDispatcher.dispatchAsync(api(), {
			request : constants.FETCH_ITEMS,
			success : constants.FETCH_ITEMS_SUCCESS,
			error   : constants.FETCH_ITEMS_ERROR
		}, null, fetchItemsBinded);
	},
	setItems (data) {
		AppDispatcher.dispatch({
			type : constants.SET_ITEMS,
			data
		});
	},
	setPaginationOffset (offset) {
		AppDispatcher.dispatch({
			type : constants.SET_PAGINATION_OFFSET,
			offset
		});
	}
};

export default actionCreators;
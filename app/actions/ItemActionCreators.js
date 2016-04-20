import constants from '../constants';
import AppDispatcher from '../AppDispatcher';

export default {
	editItemField (field, value) {
		AppDispatcher.dispatch({
			type : constants.EDIT_ITEM_FIELD,
			field,
			value
		});
	},
	submitItem () {
		AppDispatcher.dispatch({
			type : constants.SUBMIT_ITEM
		});
	}
};
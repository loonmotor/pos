import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import ItemAPI from '../api/ItemAPI';

export default {
	editItemField (field, value) {
		AppDispatcher.dispatch({
			type : constants.EDIT_ITEM_FIELD,
			field,
			value
		});
	},
	togglePaymentType (paymentType) {
		AppDispatcher.dispatch({
			type : constants.TOGGLE_PAYMENT_TYPE,
			paymentType
		});
	},
	submitItem (item) {
		AppDispatcher.dispatchAsync(ItemAPI.submitItem(item), {
			request : constants.SUBMIT_ITEM,
			success : constants.SUBMIT_ITEM_SUCCESS,
			error   : constants.SUBMIT_ITEM_ERROR
		}, item);
	},
	setItem (item) {
		AppDispatcher.dispatch({
			type : constants.SET_ITEM,
			item
		});
	},
	setItemError (error) {
		AppDispatcher.dispatch({
			type : constants.SET_ITEM_ERROR,
			payload : Object.assign({}, {error})
		});
	},
	resetItem () {
		AppDispatcher.dispatch({
			type : constants.RESET_ITEM,
		});
	},
	editMode () {
		AppDispatcher.dispatch({
			type : constants.EDIT_MODE
		});
	},
	deleteItem (id) {
		AppDispatcher.dispatchAsync(ItemAPI.deleteItem(id), {
			request : constants.DELETE_ITEM,
			success : constants.DELETE_ITEM_SUCCESS,
			error   : constants.DELETE_ITEM_ERROR
		});
	},
	displayItem (id) {
		AppDispatcher.dispatch({
			type : constants.DISPLAY_ITEM,
			id
		});
	}
};
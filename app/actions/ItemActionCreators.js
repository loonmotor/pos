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
		});
	},
	hideNotification () {
		AppDispatcher.dispatch({
			type : constants.HIDE_NOTIFICATION
		});
	},
	setItem (item) {
		AppDispatcher.dispatch({
			type : constants.SET_ITEM,
			item
		});
	}
};
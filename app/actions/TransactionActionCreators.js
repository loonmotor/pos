import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import TransactionAPI from '../api/TransactionAPI';

const actionCreators = {
	editBuyerField (field, value) {
		AppDispatcher.dispatch({
			type : constants.EDIT_BUYER_FIELD,
			field,
			value
		});
	},
	submitTransaction (transaction) {
		AppDispatcher.dispatchAsync(TransactionAPI.submitTransaction(transaction), {
			request : constants.SUBMIT_TRANSACTION,
			success : constants.SUBMIT_TRANSACTION_SUCCESS,
			error   : constants.SUBMIT_TRANSACTION_ERROR
		});
	},
	editMode () {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_EDIT_MODE
		});
	},
	displayItem (itemId) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_DISPLAY_ITEM,
			itemId
		});
	},
	resetTransaction () {
		AppDispatcher.dispatch({
			type : constants.RESET_TRANSACTION
		});
	},
	setItem (item) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_SET_ITEM,
			item
		});
	},
	editQuantityField (value) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_EDIT_QUANTITY,
			value
		})
	},
	editPaymentType (value) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_EDIT_PAYMENT_TYPE,
			value
		});
	}
};

export default actionCreators;
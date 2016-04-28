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
		let submitTransactionBinded = actionCreators.submitTransaction.bind(null, transaction);
		AppDispatcher.dispatchAsync(TransactionAPI.submitTransaction(transaction), {
			request : constants.SUBMIT_TRANSACTION,
			success : constants.SUBMIT_TRANSACTION_SUCCESS,
			error   : constants.SUBMIT_TRANSACTION_ERROR
		}, transaction, submitTransactionBinded);
	},
	editMode () {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_EDIT_MODE
		});
	},
	displayTransactionItem (itemId) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_DISPLAY_ITEM,
			itemId
		});
	},
	displayTransaction (id) {
		AppDispatcher.dispatch({
			type : constants.DISPLAY_TRANSACTION,
			id
		});
	},
	resetTransaction () {
		AppDispatcher.dispatch({
			type : constants.RESET_TRANSACTION
		});
	},
	setTransactionItem (item) {
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
	},
	editPayment (field, value, paymentId) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTION_EDIT_PAYMENT,
			paymentId,
			value
		});
	},
	deleteTransaction (id) {
		let deleteTransactionBinded = actionCreators.deleteTransaction.bind(null, id);
		AppDispatcher.dispatchAsync(TransactionAPI.deleteTransaction(id), {
			request : constants.DELETE_TRANSACTION,
			success : constants.DELETE_TRANSACTION_SUCCESS,
			error   : constants.DELETE_TRANSACTION_ERROR
		}, {id}, deleteTransactionBinded)
	}
};

export default actionCreators;
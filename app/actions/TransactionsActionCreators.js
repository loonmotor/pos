import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import TransactionsAPI from '../api/TransactionsAPI';

const actionCreators = {
	fetchTransactions (api) {
		let fetchTransactionsBinded = actionCreators.fetchTransactions.bind(null, api);
		AppDispatcher.dispatchAsync(api(), {
			request : constants.FETCH_TRANSACTIONS,
			success : constants.FETCH_TRANSACTIONS_SUCCESS,
			error   : constants.FETCH_TRANSACTIONS_ERROR
		}, null, fetchTransactionsBinded);
	},
	setTransactions (data) {
		AppDispatcher.dispatch({
			type : constants.SET_TRANSACTIONS,
			data
		})
	},
	setTransactionsWithLimit () {
		AppDispatcher.dispatch({
			type : constants.SET_TRANSACTIONS_WITH_LIMIT,
		});
	},
	setPaginationOffset (offset) {
		AppDispatcher.dispatch({
			type : constants.TRANSACTIONS_SET_PAGINATION_OFFSET,
			offset
		});
	}
};

export default actionCreators;
import 'whatwg-fetch';

export default {
	fetchTransactions () {
		return fetch('data/transactions').then(response => response.json());
	}
};
import 'whatwg-fetch';

export default {
	fetchTransactions () {
		return fetch('/pos/data/transactions').then(response => response.json());
	}
};
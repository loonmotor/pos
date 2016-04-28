import 'whatwg-fetch';
import {checkStatus} from '../utils';

export default {
	submitTransaction (transaction) {
		return fetch('/data/transaction', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(transaction)
		}).then(checkStatus);
	},
	deleteTransaction (id) {
		console.log('horah');
		return fetch('/data/transaction', {
			method : 'DELETE',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({id})
		}).then(checkStatus);
	}
};
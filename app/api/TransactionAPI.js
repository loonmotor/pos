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
	}
};
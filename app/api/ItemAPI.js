import 'whatwg-fetch';
import {checkStatus} from '../utils';

export default {
	submitItem (item) {
		return fetch('/data/item', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(item)
		}).then(checkStatus);
	},
	fetchItem (id) {
		return fetch(`/data/item/${id}`).then(checkStatus);
	},
	deleteItem (id) {
		return fetch('/data/item', {
			method : 'DELETE',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({id})
		}).then(checkStatus);
	}
};
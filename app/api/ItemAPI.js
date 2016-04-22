import 'whatwg-fetch';

export default {
	submitItem (item) {
		return fetch('/data/item', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(item)
		}).then(response => response.json());
	},
	fetchItem (id) {
		return fetch(`/data/item/${id}`).then(response => response.json());
	}
};
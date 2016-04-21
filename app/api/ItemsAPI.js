import 'whatwg-fetch';

export default {
	fetchItems () {
		return fetch('/data/items').then(response => response.json());
	}
};
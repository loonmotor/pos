export const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response.json();
	}
	return response.json().then(response => {
		let error = new Error(response.msg);
		error.response = response;
		throw error;
	});
};
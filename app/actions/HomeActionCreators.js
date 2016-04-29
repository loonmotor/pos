import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

export default {
	setHome (home) {
		AppDispatcher.dispatch({
			type : constants.SET_HOME,
			home
		});
	},
	getHome () {
		AppDispatcher.dispatch({
			type : constants.GET_HOME
		});
	}
};
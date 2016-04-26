import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

export default {
	online () {
		AppDispatcher.dispatch({
			type : constants.ONLINE
		});
	},
	offline () {
		AppDispatcher.dispatch({
			type : constants.OFFLINE
		});
	},
	resetActionCreators () {
		AppDispatcher.dispatch({
			type : constants.RESET_ACTION_CREATORS
		});
	}
};
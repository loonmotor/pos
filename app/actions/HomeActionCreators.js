import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

const actionCreators = {
	setHome (home) {
		AppDispatcher.dispatch({
			type : constants.SET_HOME,
			home
		});
	},
	fetchHome (api) {
		let fetchHomeBinded = actionCreators.fetchHome.bind(null, api);
		AppDispatcher.dispatchAsync(api(), {
			request : constants.FETCH_HOME,
			success : constants.FETCH_HOME_SUCCESS,
			error   : constants.FETCH_HOME_ERROR
		}, null, fetchHomeBinded);
	}
};

export default actionCreators;
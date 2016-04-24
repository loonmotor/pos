import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

class NotificationStore extends ReduceStore {
	getInitialState () {
		return {};
	}
	reduce (state, action) {
		console.log(action);
		if (action.type.indexOf('SUCCESS') > -1) {
			return {
				type : 'success',
				msg  : action.payload.response.msg
			};
		}
		if (action.type.indexOf('ERROR') > -1) {
			return {
				type : 'danger',
				msg  : action.payload.error.response.msg
			};
		}
		return state;
	}
}

export default new NotificationStore(AppDispatcher);
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import OnlineOfflineStore from './OnlineOfflineStore';

class NotificationStore extends ReduceStore {
	getInitialState () {
		return {};
	}
	reduce (state, action) {
		if (action.type.indexOf('SUCCESS') > -1 && action.payload.response.msg) {
			return {
				type : 'success',
				msg  : action.payload.response.msg
			};
		}
		if (action.type.indexOf('ERROR') > -1 && action.payload.error.response.msg) {
			return {
				type : 'danger',
				msg  : action.payload.error.response.msg
			};
		}
		if (action.actionCreator && !OnlineOfflineStore.getState()) {
			return {
				type : 'warning',
				msg : 'Request has been queued'
			}
		}

		return state;
	}
}

export default new NotificationStore(AppDispatcher);
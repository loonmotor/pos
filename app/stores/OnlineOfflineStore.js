import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

class OnlineOfflineStore extends ReduceStore {
	getInitialState () {
		return true;
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.ONLINE :
				return true;
			case constants.OFFLINE :
				return false;
			default :
				return state;
		}
	}
}

export default new OnlineOfflineStore(AppDispatcher);
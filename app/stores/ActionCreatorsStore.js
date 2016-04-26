import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import update from 'react-addons-update';
import OnlineOfflineStore from './OnlineOfflineStore';
import constants from '../constants';

class ActionCreatorsStore extends ReduceStore {
	getInitialState () {
		return [];
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.RESET_ACTION_CREATORS :
				return this.getInitialState();
		}
		const {actionCreator} = action;
		if (actionCreator && !OnlineOfflineStore.getState()) {
			return update(this.getState(), {
				$push : [actionCreator]
			});
		}
		return state;
	}
}

export default new ActionCreatorsStore(AppDispatcher); 
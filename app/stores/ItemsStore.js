import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';

class ItemsStore extends ReduceStore {
	getInitialState () {
		return [];
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.FETCH_ITEMS_SUCCESS :
				return update(this.getState(), {
					$set : action.payload.response
				});
			default :
				return state;
		}
	}
}

export default new ItemsStore(AppDispatcher);
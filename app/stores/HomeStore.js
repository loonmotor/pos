import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';
import ItemsStore from './ItemsStore';
import TransactionsStore from './TransactionsStore';

class HomeStore extends ReduceStore {
	getInitialState () {
		return {
			itemCount : 0,
			transactionCount : 0
		};
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.SET_HOME :
				return update(this.getState(), {
					$set : action.home 
				});
			case constants.GET_HOME :
				return update(this.getState(), {
					itemCount : {
						$set : ItemsStore.getState().items.length
					},
					transactionCount : {
						$set : TransactionsStore.getState().transactions.length
					}
				});
			default :
				return state;
		}
	}
}

export default new HomeStore(AppDispatcher);
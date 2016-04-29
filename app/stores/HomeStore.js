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
						$apply : value => {
							return ItemsStore.getState().items.length > 0 ? ItemsStore.getState().items.length : value;
						}
					},
					transactionCount : {
						$apply : value => {
							return TransactionsStore.getState().transactions.length > 0 ? TransactionsStore.getState().transactions.length : value;
						}
					}
				});
			default :
				return state;
		}
	}
}

export default new HomeStore(AppDispatcher);
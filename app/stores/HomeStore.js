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
			case constants.FETCH_HOME_SUCCESS :
				return update(this.getState(), {
					$set : action.payload.response
				});
			case constants.SET_ITEMS :
				return update(this.getState(), {
					itemCount : {
						$set : action.data.items.length
					}
				});
			case constants.SET_TRANSACTIONS :
				return update(this.getState(), {
					transactionCount : {
						$set : action.data.transactions.length 
					}
				});
			case constants.SUBMIT_ITEM :
				return update(this.getState(), {
					itemCount : {
						$apply : value => ++value
					}
				});
			case constants.SUBMIT_TRANSACTION :
				return update(this.getState(), {
					transactionCount : {
						$apply : value => ++value
					}
				});
			case constants.SUBMIT_ITEM_ERROR :
				return update(this.getState(), {
					itemCount : {
						$apply : value => --value
					}
				});
			case constants.SUBMIT_TRANSACTION_ERROR :
				return update(this.getState(), {
					transactionCount : {
						$apply : value => --value
					}
				});
			case constants.DELETE_ITEM :
				return update(this.getState(), {
					itemCount : {
						$apply : value => --value
					}
				});
			case constants.DELETE_TRANSACTION :
				return update(this.getState(), {
					transactionCount : {
						$apply : value => --value
					}
				});
			default :
				return state;
		}
	}
}

export default new HomeStore(AppDispatcher);
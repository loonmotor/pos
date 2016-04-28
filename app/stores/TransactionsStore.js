import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';
import TransactionStore from './TransactionStore';

class TransactionsStore extends ReduceStore {
	getInitialState () {
		return {
			meta : {
				offset : 0,
				limit : 10,
				pageNum : 0,
				count : 0
			},
			transactions : []
		}
	}
	getTransactionIndex (id) {
		return this._state.transactions.findIndex(transaction => transaction.id === id);
	}
	getTransaction (id) {
		return this._state.transactions[this.getTransactionIndex(id)];
	}
	reduce (state, action) {
		this.getDispatcher().waitFor([
			TransactionStore.getDispatchToken()
		]);
		switch (action.type) {
			case constants.FETCH_TRANSACTIONS_SUCCESS :
				return update(this.getState(), {
					transactions : {
						$set : action.payload.response.transactions
					},
					meta : {
						count : {
							$set : action.payload.response.count
						},
						pageNum : {
							$set : Math.ceil(action.payload.response.count / this.getState().meta.limit)
						}
					}
				});
			case constants.SET_TRANSACTIONS :
				return update(this.getState(), {
					transactions : {
						$set : action.data.transactions.splice(0, this.getState().meta.limit)
					},
					meta : {
						count : {
							$set : action.data.count
						},
						pageNum : {
							$set : Math.ceil(action.data.count / this.getState().meta.limit)
						}
					}
				});
			case constants.TRANSACTIONS_SET_PAGINATION_OFFSET :
				return update(this.getState(), {
					meta : {
						offset : {
							$set : action.offset
						}
					}
				});
			case constants.SUBMIT_TRANSACTION :
				if (action.payload.editMode) {
					return update(this.getState(), {
						transactions : {
							$splice : [[this.getTransactionIndex(action.payload.id), 1, action.payload]]
						}
					});
				}
				return update(this.getState(), {
					items : {
						$unshift : [action.payload]
					}
				});
			case constants.DELETE_TRANSACTION :
				const index = this.getTransactionIndex(action.payload.id);
				if (index > -1) {
					return update(this.getState(), {
						transactions : {
							$splice : [[index, 1]]
						}
					})
				}
			default :
				return state;
		}
	}
}

export default new TransactionsStore(AppDispatcher);
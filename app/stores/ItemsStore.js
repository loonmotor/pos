import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';

class ItemsStore extends ReduceStore {
	getInitialState () {
		return {
			meta : {
				offset : 0,
				limit : 10,
				pageNum : 0,
				count : 0
			},
			items : []
		};
	}
	getItemIndex (id) {
		return this._state.items.findIndex(item => item.id === id);
	}
	getItem (id) {
		return this._state.items[this.getItemIndex(id)];
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.FETCH_ITEMS_SUCCESS :
				return update(this.getState(), {
					items : {
						$set : action.payload.response.items
					},
					meta : {
						count : {
							$set : action.payload.response.count
						},
						pageNum : {
							$set : Math.cel(action.payload.response.count / this.getState().meta.limit)
						}
					}
				});
			case constants.SET_ITEMS :
				return update(this.getState(), {
					items : {
						$set : action.data.items.splice(0, this.getState().meta.limit)
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
			case constants.SET_PAGINATION_OFFSET :
				return update(this.getState(), {
					meta : {
						offset : {
							$set : action.offset
						}
					}
				});
			case constants.SUBMIT_ITEM :
				if (action.payload.editMode) {
					return update(this.getState(), {
						items : {
							$splice : [[this.getItemIndex(action.payload.id), 1, action.payload]]
						}
					});
				}
				return update(this.getState(), {
					items : {
						$unshift : [action.payload]
					}
				});
			default :
				return state;
		}
	}
}

export default new ItemsStore(AppDispatcher);
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
	reduce (state, action) {
		switch (action.type) {
			case constants.FETCH_ITEMS_SUCCESS :
				console.log(action.payload.response);
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
			default :
				return state;
		}
	}
}

export default new ItemsStore(AppDispatcher);
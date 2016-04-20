import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';

class ItemStore extends ReduceStore {
	getInitialState () {
		return {
			name : '',
			price : '',
			dirty : false,
			error : {
				required : {
					name : true,
					price : true,
					paymentType : false
				}
			}
		};
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.EDIT_ITEM_FIELD :
				return update(this.getState(), {
					[action.field] : {
						$set : action.value
					},
					error : {
						required : {
							[action.field] : {
								$set : !!!action.value
							}
						}
					}
				});
			case constants.SUBMIT_ITEM :
				return update(this.getState(), {
					dirty : {
						$set : true
					}
				});
			default :
				return state;
		}
	}
}

export default new ItemStore(AppDispatcher);
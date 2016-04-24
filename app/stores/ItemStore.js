import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';

class ItemStore extends ReduceStore {
	getInitialState () {
		return {
			id : Date.now().toString(),
			name : '',
			price : '',
			paymentTypes : {
				upfront : true,
				downpayment : false,
				multiplepayments : false
			},
			dirty : false,
			editMode : false,
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
		let nextState;
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
			case constants.TOGGLE_PAYMENT_TYPE :
				nextState = update(this.getState(), {
					paymentTypes : {
						[action.paymentType] : {
							$apply : value => !value
						}
					}
				});
				const atLeastAPaymentTypeIsSelected = Object.keys(nextState.paymentTypes).some(paymentTypeKey => nextState.paymentTypes[paymentTypeKey]);
				return update(nextState, {
					error : {
						required : {
							paymentType : {
								$set : !atLeastAPaymentTypeIsSelected
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
			case constants.SET_ITEM :
				return Object.assign({}, this.getState(), action.item);
			case constants.RESET_ITEM :
				return this.getInitialState();
			case constants.EDIT_MODE :
				return update(this.getState(), {
					error : {
						required : {
							name : {
								$set : false
							},
							price : {
								$set : false
							}
						}
					},
					editMode : {
						$set : true
					}
				});
			case constants.DELETE_ITEM_ERROR :
				console.log('delete item error');
				return state;
			default :
				return state;
		}
	}
}

export default new ItemStore(AppDispatcher);
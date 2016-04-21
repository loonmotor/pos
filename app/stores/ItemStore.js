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
			},
			paymentTypes : {
				upfront : true,
				downpayment : false,
				multiplepayments : false
			},
			created : null,
			showNotification : false
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
			case constants.SUBMIT_ITEM_SUCCESS :
				if (!action.payload.response.errors) {
					nextState = this.getInitialState();
					return update(nextState, {
						created : {
							$set : action.payload.response
						},
						showNotification : {
							$set : true
						}
					});
				}
			case constants.HIDE_NOTIFICATION :
				return update(this.getState(), {
					showNotification : {
						$set : false
					}
				});
			default :
				return state;
		}
	}
}

export default new ItemStore(AppDispatcher);
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';
import shortid from 'shortid';
import ItemsStore from './ItemsStore';

class TransactionStore extends ReduceStore {
	getInitialState () {
		return {
			id : shortid.generate(),
			buyer : {
				company : '',
				name : '',
				email : '',
				phone : ''
			},
			item : {
				name : '',
				price : '',
				paymentTypes : {
					upfront : true,
					downpayment : false,
					multiplepayments : false
				}
			},
			quantity : 1,
			paymentType : '',
			payments : [

			],
			error : {
				required : {
					buyer : {
						company : true,
						name : true,
						email : true,
						phone : true
					},
					quantity : true,
					paymentType : true
				}
			},
			dirty : false,
			editMode : false
		};
	}
	reduce (state, action) {
		switch (action.type) {
			case constants.EDIT_BUYER_FIELD :
				return update(this.getState(), {
					buyer : {
						[action.field] : {
							$set : action.value
						}
					},
					error : {
						required : {
							buyer : {
								[action.field] : {
									$set : !!!action.value
								}
							}
						}
					}
				});
			case constants.SUBMIT_TRANSACTION :
				return update(this.getState(), {
					dirty : {
						$set : true
					}
				});
			case constants.TRANSACTION_EDIT_MODE :
				return update(this.getState(), {
					error : {
						required : {
							quantity : {
								$set : false
							}
						}
					},
					editMode : {
						$set : true
					}
				});
			case constants.TRANSACTION_DISPLAY_ITEM :
				return Object.assign({}, this.getState(), {item:ItemsStore.getItem(action.itemId)});
			case constants.RESET_TRANSACTION :
				return this.getInitialState();
			case constants.TRANSACTION_SET_ITEM :
				return update(this.getState(), {
					item : {
						$set : action.item
					}
				});
			case constants.TRANSACTION_EDIT_QUANTITY :
				return update(this.getState(), {
					quantity : {
						$set : action.value
					},
					error : {
						required : {
							quantity : {
								$set : !Number(action.value) > 0
							}
						}
					}
				});
			case constants.TRANSACTION_EDIT_PAYMENT_TYPE :
				return update(this.getState(), {
					paymentType : {
						$set : action.value
					},
					error : {
						required : {
							paymentType : {
								$set : !!!action.value
							}
						}
					}
				});
		}
		return state;
	}
}

export default new TransactionStore(AppDispatcher);
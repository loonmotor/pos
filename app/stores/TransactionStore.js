import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';
import shortid from 'shortid';
import ItemsStore from './ItemsStore';
import TransactionsStore from './TransactionsStore';
import TransactionActionCreators from '../actions/TransactionActionCreators';

const defaultPayment = () => ({
	id : shortid.generate(),
	modified : Date.now(),
	amount : 0
});

class TransactionStore extends ReduceStore {
	getPaymentIndex (id) {
		return this._state.payments.findIndex(payment => payment.id === id);
	}
	getInitialState () {
		return {
			id : shortid.generate(),
			modified : Date.now(),
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
			payments : [defaultPayment()],
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
				},
				payment : {
					exceed : false,
					less : false
				}
			},
			dirty : false,
			editMode : false
		};
	}
	reduce (state, action) {
		let nextState;
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
							},
							buyer : {
								company : {
									$set : false
								},
								name : {
									$set : false
								},
								email : {
									$set : false
								},
								phone : {
									$set : false
								}
							},
							paymentType : {
								$set : false
							}
						}
					},
					editMode : {
						$set : true
					}
				});
			case constants.TRANSACTION_ITEM_EDIT_MODE :
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
			case constants.DISPLAY_TRANSACTION :
				return Object.assign({}, this.getState(), TransactionsStore.getTransaction(action.id));
			case constants.RESET_TRANSACTION :
				return this.getInitialState();
			case constants.TRANSACTION_SET_ITEM :
				return update(this.getState(), {
					item : {
						$set : action.item
					}
				});
			case constants.TRANSACTION_EDIT_QUANTITY :
				setTimeout(() => {
					TransactionActionCreators.editPaymentType(this.getState().paymentType);
				}, 0);
				return update(this.getState(), {
					quantity : {
						$set : Number(action.value) > 0 ? action.value : 1
					}
				});
			case constants.TRANSACTION_EDIT_PAYMENT_TYPE :
				let toSplice = this._state.payments.length;
				switch (action.value) {
					case 'upfront' :
						toSplice = 1;
						break;
					case 'downpayment' :
						toSplice = 2;
						break;
					case 'multiplepayments' :
						toSplice = this._state.payments.length;
						break;
				}
				nextState = update(this.getState(), {
					paymentType : {
						$set : action.value
					},
					error : {
						required : {
							paymentType : {
								$set : !!!action.value
							}
						},
						payment : {
							exceed : {
								$set : false
							},
							less : {
								$set : false
							}
						}
					},
					payments : {
						$splice : [[toSplice]]
					}
				});
				let total = nextState.item.price * nextState.quantity;
				let paymentTotal = nextState.payments.reduce((acc, payment) => acc + Number(payment.amount), 0);

				if (paymentTotal > total) {
					return update(nextState, {
						error : {
							payment : {
								exceed : {
									$set : paymentTotal > total
								}
							}
						}
					});
				}

				if (nextState.paymentType === 'upfront') {
					return update(nextState, {
						error : {
							payment : {
								less : {
									$set : paymentTotal < total
								}
							}
						}
					});
				}
				if (nextState.paymentType === 'downpayment' && nextState.payments.length === 2 && nextState.payments[1].amount !== 0) {
					nextState = update(nextState, {
						error : {
							payment : {
								less : {
									$set : paymentTotal < total
								}
							}
						}
					});
				}
				return nextState;
			case constants.TRANSACTION_EDIT_PAYMENT :
				action.value = Number(action.value);
				if (action.value === 0) {
					nextState = update(this.getState(), {
						payments : {
							$splice : [[this.getPaymentIndex(action.paymentId), 1]]
						}
					});
				}
				if (action.value) {
					nextState = update(this.getState(), {
						payments : {
							[this.getPaymentIndex(action.paymentId)] : {
								amount : {
									$set : action.value
								}
							}
						}
					});
				}
				if (nextState.payments.length <= 0 || nextState.payments[nextState.payments.length - 1].amount !== 0) {					
					nextState = update(nextState, {
						payments : {
							$push : [defaultPayment()]
						}
					});
				}
				if (nextState.paymentType === 'upfront') {
					nextState = update(nextState, {
						payments : {
							$splice : [[1]]
						}
					});
				}
				if (nextState.paymentType === 'downpayment') {
					nextState = update(nextState, {
						payments : {
							$splice : [[2]]
						}
					});
				}
				nextState = update(nextState, {
					error : {
						payment : {
							exceed : {
								$set : false
							},
							less : {
								$set : false
							}
						}
					}
				});
				total = nextState.item.price * nextState.quantity;
				paymentTotal = nextState.payments.reduce((acc, payment) => acc + Number(payment.amount), 0);
				if (paymentTotal > total) {
					nextState = update(nextState, {
						error : {
							payment : {
								exceed : {
									$set : paymentTotal > total
								}
							}
						}
					});
				}
				if (nextState.paymentType === 'upfront') {
					nextState = update(nextState, {
						error : {
							payment : {
								less : {
									$set : paymentTotal < total
								}
							}
						}
					});
				}
				if (nextState.paymentType === 'downpayment' && nextState.payments.length === 2 && nextState.payments[1].amount !== 0) {
					nextState = update(nextState, {
						error : {
							payment : {
								less : {
									$set : paymentTotal < total
								}
							}
						}
					});
				}
				return nextState;
			case constants.SET_TRANSACTION :
				return Object.assign({}, this.getState(), action.transaction);
		}
		return state;
	}
}

export default new TransactionStore(AppDispatcher);
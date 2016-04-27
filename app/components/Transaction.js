import React, {Component} from 'react';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import TransactionStore from '../stores/TransactionStore';
import TransactionActionCreators from '../actions/TransactionActionCreators';
import ItemField from './ItemField';
import ItemCheckbox from './ItemCheckbox';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../utils';

class Transaction extends Component {
	constructor () {
		super(...arguments);
		TransactionActionCreators.resetTransaction();
		if (this.props.initialData) {
			TransactionActionCreators.setItem(this.props.initialData);
			TransactionActionCreators.editMode();
		}
	}
	componentDidMount () {
		if (!this.props.initialData && this.props.params.itemId) {
			setTimeout(() => {
				TransactionActionCreators.displayItem(this.props.params.itemId);
				TransactionActionCreators.editMode();
			}, 0);
		}
	}
	handleBuyerFieldChange (field, value) {
		TransactionActionCreators.editBuyerField(field, value);
	}
	handleQuantityFieldChange (field, value) {
		TransactionActionCreators.editQuantityField(value);
	}
	handlePaymentTypeChange (value) {
		TransactionActionCreators.editPaymentType(value);
	}
	handleTransactionSubmit (transaction, event) {
		event.preventDefault();
		TransactionActionCreators.submitTransaction(transaction);
	}
	render () {
		const {transaction} = this.state;
		console.log(transaction);
		const
			buyerCompanyClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : transaction.dirty && transaction.error.required.buyer.company
			})
			, buyerCompanyRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.buyer.company,
				'uk-text-danger' : true
			})
			, 
			buyerNameClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : transaction.dirty && transaction.error.required.buyer.name
			})
			, buyerNameRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.buyer.name,
				'uk-text-danger' : true
			})
			, 
			buyerEmailClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : transaction.dirty && transaction.error.required.buyer.email
			})
			, buyerEmailRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.buyer.email,
				'uk-text-danger' : true
			})
			, 
			buyerPhoneClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : transaction.dirty && transaction.error.required.buyer.phone
			})
			, buyerPhoneRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.buyer.phone,
				'uk-text-danger' : true
			})
			, quantityClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : transaction.dirty && transaction.error.required.quantity
			})
			, quantityRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.quantity,
				'uk-text-danger' : true
			})
			, paymentTypeRequiredClass = classNames({
				'uk-hidden' : !transaction.error.required.paymentType,
				'uk-text-danger' : true
			})
			, isDirtyClass = classNames({
				'uk-hidden' : !transaction.dirty
			});
		const gotError = Object.keys(transaction.error.required.buyer).some(key => transaction.error.required.buyer[key])
							|| transaction.error.required.paymentType;
		console.log(transaction);
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<form className="uk-form uk-form-horizontal uk-margin-large-top" method="POST" onSubmit={this.handleTransactionSubmit.bind(this, transaction)}>
						<fieldset>
							<legend>Buyer</legend>
							<ItemField name="Company" type="text" value={transaction.buyer.company} handleFieldChange={this.handleBuyerFieldChange.bind(this)} autoFocus={true} className={buyerCompanyClass} isDirtyClass={isDirtyClass} requiredClass={buyerCompanyRequiredClass} />
							<ItemField name="Name" type="text" value={transaction.buyer.name} handleFieldChange={this.handleBuyerFieldChange.bind(this)} className={buyerNameClass} isDirtyClass={isDirtyClass} requiredClass={buyerNameRequiredClass} />
							<ItemField name="Email" type="email" value={transaction.buyer.email} handleFieldChange={this.handleBuyerFieldChange.bind(this)} className={buyerEmailClass} isDirtyClass={isDirtyClass} requiredClass={buyerEmailRequiredClass} />
							<ItemField name="Phone" type="number" value={transaction.buyer.phone} handleFieldChange={this.handleBuyerFieldChange.bind(this)} className={buyerPhoneClass} isDirtyClass={isDirtyClass} requiredClass={buyerPhoneRequiredClass} />
						</fieldset>
						<br />
						<fieldset>
							<legend>Item</legend>
							<ItemField name="Name" type="text" value={transaction.item.name} readOnly={true} className="uk-width-1-1" requiredClass="uk-hidden" />
							<ItemField name="Price" type="text" value={transaction.item.price} readOnly={true} className="uk-width-1-1" requiredClass="uk-hidden" />
							<div className="uk-form-row">
								<label className="uk-form-label" htmlFor="payment-type">Payment Types</label>
								<div className="uk-form-controls">
									{/*<ItemCheckbox name="Upfront Full" value='upfront' disabled={true} checked={transaction.item.paymentTypes.upfront}  />
									<ItemCheckbox name="Down Payment" value='downpayment' disabled={true} checked={transaction.item.paymentTypes.downpayment}  />
									<ItemCheckbox name="Multiple Payments" value='multiplepayments' disabled={true} checked={transaction.item.paymentTypes.multiplepayments}  />*/}
									{Object.keys(transaction.item.paymentTypes).map(paymentType => {
										if (transaction.item.paymentTypes[paymentType]) {
											return (
												<label key={paymentType}>
													<input type="radio" name="paymentType" onChange={this.handlePaymentTypeChange.bind(this, paymentType)} /> {paymentType} &nbsp;&nbsp;&nbsp;
												</label>
											);
										} else {
											return null;
										}
									})}
									<section className={isDirtyClass}>
										<div className={paymentTypeRequiredClass}>Please select at least one payment type</div>
									</section>
								</div>
							</div>
							<ItemField name="Quantity" type="number" value={transaction.quantity} handleFieldChange={this.handleQuantityFieldChange.bind(this)} className={quantityClass} isDirtyClass={isDirtyClass} requiredClass={quantityRequiredClass} />
							<ItemField name="Total" type="number" value={transaction.quantity * transaction.item.price} readOnly={true} className="uk-width-1-1" requiredClass="uk-hidden" />

						</fieldset>
						<br />
						<fieldset>
							<legend>Payments</legend>

						</fieldset>


						<div className="uk-form-row">
							<button type="submit" className="uk-button noscript-hide" disabled={gotError && transaction.dirty}>Save</button>
							<button type="submit" className="uk-button noscript-show">Save</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Transaction.requestInitialData = ({server, client}) => {
	if (server) {
		const [,,itemId] = server.originalUrl;
		if (itemId) {
			return fetch(`http://localhost:3000/data/item/${itemId}`)
					.then(checkStatus);
		}
	}
};

Transaction.getStores = () => [TransactionStore];

Transaction.calculateState = prevState => ({
	transaction : TransactionStore.getState()
});

export default Container.create(Transaction);
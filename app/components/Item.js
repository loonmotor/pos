import React, {Component} from 'react';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import ItemStore from '../stores/ItemStore';
import ItemActionCreators from '../actions/ItemActionCreators';

class Item extends Component {
	handleFieldChange (field, event) {
		ItemActionCreators.editItemField(field, event.target.value);
	}
	handlePaymentTypeToggle (paymentType, event) {
		ItemActionCreators.togglePaymentType(paymentType);
	}
	handleItemSubmit (item, event) {
		event.preventDefault();
		ItemActionCreators.submitItem(item);
	}
	render () {
		console.log(this.state);
		const
			nameClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : false
			})
			, priceClass = classNames({
				'uk-width-1-1' : true,
				'uk-form-danger' : false
			})
			, isDirtyClass = classNames({
				'uk-hidden' : !this.state.item.dirty
			})
			, nameRequiredClass = classNames({
				'uk-hidden' : !this.state.item.error.required.name,
				'uk-text-danger' : true
			})
			, priceRequiredClass = classNames({
				'uk-hidden' : !this.state.item.error.required.price,
				'uk-text-danger' : true
			})
			, paymentTypeRequiredClass = classNames({
				'uk-hidden' : !this.state.item.error.required.paymentType,
				'uk-text-danger' : true
			});
		const gotError = Object.keys(this.state.item.error.required).some(key => this.state.item.error.required[key]);
		console.log('goterror', gotError);
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<form className="uk-form uk-form-horizontal uk-margin-large-top" onSubmit={this.handleItemSubmit.bind(this, this.state.item)}>
						<fieldset>
							<legend>Create Item</legend>
						<div className="uk-form-row">
							<label className="uk-form-label" htmlFor="name">Name</label>
							<div className="uk-form-controls">
								<input type="text" id="name" className={nameClass} value={this.state.item.name} onChange={this.handleFieldChange.bind(this, 'name')} autoFocus />
								<section className={isDirtyClass}>
									<div className={nameRequiredClass}>This field is required</div>
								</section>
							</div>
						</div>
						<div className="uk-form-row">
							<label className="uk-form-label" htmlFor="price">Price</label>
							<div className="uk-form-controls">
								<input type="number" id="price" className={priceClass} value={this.state.item.price} onChange={this.handleFieldChange.bind(this, 'price')} />
								<section className={isDirtyClass}>
									<div className={priceRequiredClass}>This field is required</div>
								</section>
							</div>
						</div>
						<div className="uk-form-row">
							<label className="uk-form-label" htmlFor="payment-type">Payment Types</label>
							<div className="uk-form-controls">
								<div className="uk-form-row">
									<label>
										<input type="checkbox" checked={this.state.item.paymentTypes.upfront} onChange={this.handlePaymentTypeToggle.bind(this, 'upfront')} />
										Upfront Full
										
									</label>
								</div>
								<div className="uk-form-row">
									<label>
										<input type="checkbox" checked={this.state.item.paymentTypes.downpayment} onChange={this.handlePaymentTypeToggle.bind(this, 'downpayment')} />
										Down Payment
									</label>
								</div>
								<div className="uk-form-row">
									<label>
										<input type="checkbox" checked={this.state.item.paymentTypes.multiplepayments} onChange={this.handlePaymentTypeToggle.bind(this, 'multiplepayments')} />
										Multiple Payments
									</label>
								</div>
								<section className={isDirtyClass}>
									<div className={paymentTypeRequiredClass}>Please select at least one payment type</div>
								</section>
							</div>
						</div>
						<div className="uk-form-row">
							<button className="uk-button" disabled={gotError && this.state.item.dirty}>Save</button>
						</div>
						</fieldset>
					</form>

				</div>
			</div>
		);
	}
}

Item.getStores = () => [ItemStore];

Item.calculateState = (prevState) => ({
	item : ItemStore.getState()
});

export default Container.create(Item);
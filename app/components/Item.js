import React, {Component} from 'react';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import ItemStore from '../stores/ItemStore';
import ItemActionCreators from '../actions/ItemActionCreators';

class Item extends Component {
	handleFieldChange (field, event) {
		ItemActionCreators.editItemField(field, event.target.value);
	}
	handleItemSubmit (event) {
		event.preventDefault();
		ItemActionCreators.submitItem();
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
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<form className="uk-form uk-form-horizontal uk-margin-large-top" onSubmit={this.handleItemSubmit.bind(this)}>
						<fieldset>
							<legend>Create Item</legend>
						<div className="uk-form-row">
							<label className="uk-form-label" htmlFor="name">Name</label>
							<div className="uk-form-controls">
								<input type="text" id="name" className={nameClass} onChange={this.handleFieldChange.bind(this, 'name')} autoFocus />
								<section className={isDirtyClass}>
									<div className={nameRequiredClass}>This field is required</div>
								</section>
							</div>
						</div>
						<div className="uk-form-row">
							<label className="uk-form-label" htmlFor="price">Price</label>
							<div className="uk-form-controls">
								<input type="number" id="price" className={priceClass} onChange={this.handleFieldChange.bind(this, 'price')} />
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
									<input type="checkbox" defaultChecked={true} value="upfront" />
									Upfront Full
									<section className={isDirtyClass}>
										<div className={paymentTypeRequiredClass}>This field is required</div>
									</section>
								</label>
								</div>
								<div className="uk-form-row">
								<label>
									<input type="checkbox" value="downpayment" />
									Down Payment
								</label>
								</div>
								<div className="uk-form-row">
								<label>
									<input type="checkbox" value="multiplepayments" />
									Multiple Payments
								</label>
								</div>
							</div>
						</div>
						<div className="uk-form-row">
							<button className="uk-button">Save</button>
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
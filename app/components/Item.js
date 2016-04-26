import React, {Component} from 'react';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import ItemStore from '../stores/ItemStore';
import ItemActionCreators from '../actions/ItemActionCreators';
import ItemField from './ItemField';
import ItemCheckbox from './ItemCheckbox';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../utils';

class Item extends Component {
	constructor () {
		super(...arguments);
		ItemActionCreators.resetItem();
		if (this.props.initialData) {
			ItemActionCreators.editMode();
			ItemActionCreators.setItem(this.props.initialData);
		}
	}
	componentDidMount () {
		if (this.props.params.id) {
			setTimeout(() => {
				ItemActionCreators.displayItem(this.props.params.id);
				ItemActionCreators.editMode();
			}, 0);
		}
	}
	handleItemSubmit (item, event) {
		event.preventDefault();
		ItemActionCreators.submitItem(item);
	}
	render () {
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
			})
			, msgClass = classNames({
				'uk-hidden' : !this.state.item.msg,
				'uk-alert' : true,
				'noscript-show' : true
			});
		const gotError = Object.keys(this.state.item.error.required).some(key => this.state.item.error.required[key]);
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<form className="uk-form uk-form-horizontal uk-margin-large-top" method="POST" onSubmit={this.handleItemSubmit.bind(this, this.state.item)}>
						<fieldset>
							<legend>Create Item</legend>

							<div className={msgClass}>{this.state.item.msg}</div>
						
							<input name="id" type="hidden" value={this.state.item.id} />

							<ItemField name="Name" type="text" value={this.state.item.name} autoFocus={true} className={nameClass} isDirtyClass={isDirtyClass} requiredClass={nameRequiredClass} />
					
							<ItemField name="Price" type="number" value={this.state.item.price} autoFocus={false} className={priceClass} isDirtyClass={isDirtyClass} requiredClass={priceRequiredClass} />

							<div className="uk-form-row">
								<label className="uk-form-label" htmlFor="payment-type">Payment Types</label>
								<div className="uk-form-controls">
									<ItemCheckbox name="Upfront Full" value='upfront' checked={this.state.item.paymentTypes.upfront}  />
									<ItemCheckbox name="Down Payment" value='downpayment' checked={this.state.item.paymentTypes.downpayment}  />
									<ItemCheckbox name="Multiple Payments" value='multiplepayments' checked={this.state.item.paymentTypes.multiplepayments}  />
									<section className={isDirtyClass}>
										<div className={paymentTypeRequiredClass}>Please select at least one payment type</div>
									</section>
								</div>
							</div>

							<div className="uk-form-row">
								<button type="submit" className="uk-button noscript-hide" disabled={gotError && this.state.item.dirty}>Save</button>
								<button type="submit" className="uk-button noscript-show">Save</button>
							</div>

						</fieldset>
					</form>

				</div>
			</div>
		);
	}
}

Item.requestInitialData = ({server, client}) => {
	if (server) {
		const [,,id] = server.originalUrl;
		if (id) {
			return fetch(`http://localhost:3000/data/item/${id}`)
					.then(checkStatus);
		}
		console.log('x');
		return Promise.reject('Create Item');
	}
	if (client) {
		const {id} = client;
		return fetch(`http://localhost:3000/data/item/${id}`)
				.then(checkStatus);
	}
};

Item.noScriptPost = body => {
	return fetch(`http://localhost:3000/noscript/data/item`, {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json',
		},
		body : JSON.stringify(body)
	}).then(response => response.json());
};

Item.getStores = () => [ItemStore];

Item.calculateState = prevState => ({
	item : ItemStore.getState()
});

export default Container.create(Item);
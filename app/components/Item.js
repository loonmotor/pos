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
		if (this.props.initialData) {
			ItemActionCreators.setItem(this.props.initialData);
			ItemActionCreators.editMode();
		}
	}
	componentDidMount () {
		if (!this.props.initialData && this.props.params.id) {
			setTimeout(() => {
				ItemActionCreators.displayItem(this.props.params.id);
				ItemActionCreators.editMode();
			}, 0);
			// Item.requestInitialData({client:{id:this.props.params.id}}).then(
			// 	data => {
			// 		ItemActionCreators.setItem(data);
			// 		ItemActionCreators.editMode();
			// 	},
			// 	error => {
			// 		ItemActionCreators.setItemError(error);
			// 	}
			// );
		}
	}
	componentWillUnmount () {
		ItemActionCreators.resetItem();
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
			});
		const gotError = Object.keys(this.state.item.error.required).some(key => this.state.item.error.required[key]);
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<form className="uk-form uk-form-horizontal uk-margin-large-top" onSubmit={this.handleItemSubmit.bind(this, this.state.item)}>
						<fieldset>
							<legend>Create Item</legend>

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
								<button className="uk-button" disabled={gotError && this.state.item.dirty}>Save</button>
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
		return Promise.reject('Create Item');
	}
	if (client) {
		const {id} = client;
		return fetch(`http://localhost:3000/data/item/${id}`)
				.then(checkStatus);
	}
};

Item.getStores = () => [ItemStore];

Item.calculateState = prevState => ({
	item : ItemStore.getState()
});

export default Container.create(Item);
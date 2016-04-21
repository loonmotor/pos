import React, {Component} from 'react';
import ItemActionCreators from '../actions/ItemActionCreators';

class ItemCheckbox extends Component {
	handlePaymentTypeToggle (paymentType, event) {
		ItemActionCreators.togglePaymentType(paymentType);
	}
	render () {
		const {name, value, checked} = this.props;
		return (
			<div className="uk-form-row">
				<label>
					<input type="checkbox" checked={checked} onChange={this.handlePaymentTypeToggle.bind(this, value)} />
					{name}
				</label>
			</div>
		);
	}
}

export default ItemCheckbox;
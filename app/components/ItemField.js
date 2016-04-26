import React, {Component} from 'react';
import ItemActionCreators from '../actions/ItemActionCreators';

class ItemField extends Component {
	handleFieldChange (field, event) {
		ItemActionCreators.editItemField(field, event.target.value);
	}
	render () {
		const {name, type, value, autoFocus, className, isDirtyClass, requiredClass} = this.props;
		return (
			<div className="uk-form-row">
				<label className="uk-form-label" htmlFor={name}>{name}</label>
				<div className="uk-form-controls">
					<input type={type} name={name.toLowerCase()} id={name.toLowerCase()} className={className} value={value} onChange={this.handleFieldChange.bind(this, name.toLowerCase())} autoFocus={autoFocus} />
					<section className={isDirtyClass}>
						<div className={requiredClass}>This field is required</div>
					</section>
				</div>
			</div>
		);
	}
}

export default ItemField;
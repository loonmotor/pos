import React, {Component} from 'react';

class ItemField extends Component {
	handleFieldChange (field, event) {
		this.props.handleFieldChange(field, event.target.value);
	}
	render () {
		const {name = '', type, value, autoFocus, className, isDirtyClass, requiredClass, readOnly, label} = this.props;
		const style = {
			background : readOnly ? '#ddd' : 'inherit'
		};
		return (
			<div className="uk-form-row">
				<label className="uk-form-label" htmlFor={name.toLowerCase()}>{label || name}</label>
				<div className="uk-form-controls">
					<input type={type} name={name.toLowerCase()} id={name.toLowerCase()} className={className} style={style} readOnly={readOnly} value={value} onChange={this.handleFieldChange.bind(this, name.toLowerCase())} autoFocus={autoFocus} />
					<section className={isDirtyClass}>
						<div className={requiredClass}>This field is required</div>
					</section>
				</div>
			</div>
		);
	}
}

export default ItemField;
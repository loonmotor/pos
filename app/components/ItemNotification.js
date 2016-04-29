import React, {Component} from 'react';
import classNames from 'classnames';
import ItemActionCreators from '../actions/ItemActionCreators';

class ItemNotification extends Component {
	render () {
		const {id, showNotification} = this.props;
		const className = classNames({
			'uk-alert' : true,
			'uk-alert-success' : true,
			'uk-hidden' : !showNotification
		});
		return (
			<div className={className} data-uk-alert>
				Item created successfully : {id}
			</div>
		);
	}
	componentDidMount () {
		setTimeout(() => {
			ItemActionCreators.hideNotification();
		}, 3000);
	}
	shouldComponentUpdate (nextProps, nextState) {
		return this.props.showNotification !== nextProps.showNotification;
	}
	componentDidUpdate () {
		setTimeout(() => {
			ItemActionCreators.hideNotification();
		}, 3000);
	}
}

export default ItemNotification;
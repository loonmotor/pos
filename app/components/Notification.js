import React, {Component} from 'react';
import {Container} from 'flux/utils';
import NotificationStore from '../stores/NotificationStore';

class Notification extends Component {
	componentWillUpdate (nextProps, nextState) {
		const {type, msg} = nextState.notification;
		UIkit.notify({
		    message : msg,
		    status  : type,
		    timeout : 3000,
		    pos     : 'top-center'
		});
	}
	render () {
		return null;
	}
}

Notification.getStores = () => [NotificationStore];

Notification.calculateState = (prevState) => ({
	notification : NotificationStore.getState()
});

export default Container.create(Notification);
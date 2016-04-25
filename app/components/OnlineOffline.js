import React, {Component} from 'react';
import OnlineOfflineActionCreators from '../actions/OnlineOfflineActionCreators';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import OnlineOfflineStore from '../stores/OnlineOfflineStore';

class OnlineOffline extends Component {
	componentDidMount () {
		const eventSource = new EventSource('/sse');
		let timeoutId;
		const isOffline = () => {
			OnlineOfflineActionCreators.offline();
		};
		eventSource.addEventListener('heartbeat', (event) => {
			OnlineOfflineActionCreators.online();
			clearTimeout(timeoutId);
			timeoutId = setTimeout(isOffline, 2000);
		});
	}
	render () {
		const
			className = classNames({
				'uk-badge' : true,
				'uk-badge-danger' : true,
				'uk-text-bold' : true,
				'uk-hidden' : this.state.online
			});
		return (
			<div className={className}>Offline</div>
		);
	}
}

OnlineOffline.getStores = () => [OnlineOfflineStore];

OnlineOffline.calculateState = prevState => ({
	online : OnlineOfflineStore.getState()
});

export default Container.create(OnlineOffline);
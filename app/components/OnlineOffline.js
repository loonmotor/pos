import React, {Component} from 'react';
import OnlineOfflineActionCreators from '../actions/OnlineOfflineActionCreators';
import classNames from 'classnames';
import {Container} from 'flux/utils';
import OnlineOfflineStore from '../stores/OnlineOfflineStore';
import ActionCreatorsStore from '../stores/ActionCreatorsStore';

class OnlineOffline extends Component {
	componentDidMount () {
		const eventSource = new EventSource('/pos/sse');
		let timeoutId;
		const isOffline = () => {
			OnlineOfflineActionCreators.offline();
		};
		eventSource.addEventListener('heartbeat', (event) => {
			OnlineOfflineActionCreators.online();
			clearTimeout(timeoutId);
			timeoutId = setTimeout(isOffline, 4000);
			ActionCreatorsStore.getState().forEach((actionCreator) => actionCreator());
			OnlineOfflineActionCreators.resetActionCreators();
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

OnlineOffline.getStores = () => [OnlineOfflineStore, ActionCreatorsStore];

OnlineOffline.calculateState = prevState => ({
	online : OnlineOfflineStore.getState(),
	actionCreators : ActionCreatorsStore.getState()
});

export default Container.create(OnlineOffline);
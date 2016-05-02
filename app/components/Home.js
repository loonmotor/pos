import React, {Component} from 'react';
import {Container} from 'flux/utils';
import HomeStore from '../stores/HomeStore';
import fetch from 'isomorphic-fetch';
import HomeActionCreators from '../actions/HomeActionCreators';
import {Link} from 'react-router';
import {host} from '../config';

class Home extends Component {
	constructor () {
		super(...arguments);
		if (this.props.initialData) {
			HomeActionCreators.setHome(this.props.initialData);
		}
	}
	componentDidMount () {
		if (!this.props.initialData) {
			// HomeActionCreators.fetchHome(Home.requestInitialData.bind(null, {client:{}}));
		}
	}
	render () {
		return (
			<div className="uk-grid uk-text-center">
				<div className="uk-width-medium-4-5 uk-width-large-3-5 uk-container-center uk-margin-top">
					<div className="uk-grid">
						<div className="uk-width-3-6">
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<h1>{this.state.data.itemCount}</h1>
								<h3 className="uk-panel-title"><Link to="items">Items</Link></h3>
							</div>
						</div>
						<div className="uk-width-3-6">
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<h1>{this.state.data.transactionCount}</h1>
								<h3 className="uk-panel-title"><Link to="transactions">Transactions</Link></h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.requestInitialData = ({server, client}) => {
	if (server) {
		return fetch(`http://localhost:3008/data/home`).then(response => response.json());
	}
	if (client) {
		return fetch(`${host}/data/home`).then(response => response.json());
	}
};

Home.getStores = () => [HomeStore];

Home.calculateState = prevState => ({
	data : HomeStore.getState()
});

export default Container.create(Home);
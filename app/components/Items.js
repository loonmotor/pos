import React, {Component} from 'react';
import ItemsActionCreators from '../actions/ItemsActionCreators';
import {Container} from 'flux/utils';
import ItemsStore from '../stores/ItemsStore';
import fetch from 'isomorphic-fetch';

class Items extends Component {
	constructor () {
		super(...arguments);
		ItemsActionCreators.setItems(this.props.initialData || []);
	}
	componentDidMount () {
		if (!this.props.initialData) {
			Items.requestInitialData().then(items => ItemsActionCreators.setItems(items));
		}
	}
	render () {
		return (
			<div>
				<div className="uk-grid">
					<div className="uk-width-medium-4-5 uk-width-large-4-5 uk-container-center uk-margin-top">
						<h3>Manage Items</h3>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-medium-4-5 uk-width-large-4-5 uk-container-center uk-margin-large-bottom">
						<table className="uk-table uk-table-hover uk-table-striped uk-table-condensed">
							<thead>
								<tr>
									<th>No</th>
									<th>Name</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{this.state.items.map((item, index) => (
									<tr key={item._id}>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{item.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

Items.requestInitialData = () => {
	return fetch('http://localhost:3000/data/items').then(response => response.json());
};
Items.getStores = () => [ItemsStore];
Items.calculateState = prevState => ({
	items : ItemsStore.getState()
});

export default Container.create(Items);
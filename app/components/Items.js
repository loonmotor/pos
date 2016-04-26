import React, {Component} from 'react';
import ItemsActionCreators from '../actions/ItemsActionCreators';
import ItemActionCreators from '../actions/ItemActionCreators';
import {Container} from 'flux/utils';
import ItemsStore from '../stores/ItemsStore';
import fetch from 'isomorphic-fetch';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';

class Items extends Component {
	constructor () {
		super(...arguments);
		if (this.props.initialData) {
			ItemsActionCreators.setItems(this.props.initialData);
		}
	}
	componentDidMount () {
		const {meta:{offset, limit}} = this.state.data;
		if (!this.props.initialData) {
			ItemsActionCreators.fetchItems(Items.requestInitialData.bind(null, {client : {offset, limit}}));
		}
	}
	handlePageClick (data, event) {
		const {meta:{limit}} = this.state.data;
		const offset = data.selected;

		ItemsActionCreators.setPaginationOffset(offset);
		ItemsActionCreators.fetchItems(Items.requestInitialData.bind(null, {client:{offset, limit}}));
	}
	handleItemDelete (id, event) {
		event.preventDefault();
		ItemActionCreators.deleteItem(id);
	}
	componentWillUnmount () {
		ItemsActionCreators.setPaginationOffset(0);
	}
	render () {
		const {items, meta:{offset, limit, pageNum}} = this.state.data;
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
									<th className="uk-text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, index) => (
									<tr key={item.id}>
										<td>{index + 1 + offset * limit}</td>
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td>
											<div className="uk-button-group">
												<Link to={`/item/${item.id}`} className="uk-button uk-button-mini"><i className="uk-icon-edit"></i> Edit</Link>
												<a href="#" className="uk-button uk-button-mini" onClick={this.handleItemDelete.bind(this, item.id)}><i className="uk-icon-remove"></i> Delete</a>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-medium-4-5 uk-width-large-4-5 uk-container-center uk-margin-large-bottom">
						<ReactPaginate previousLabel={"Previous"}
									   nextLabel={"Next"}
									   pageNum={pageNum}
									   marginPagesDisplayed={15}
									   clickCallback={this.handlePageClick.bind(this)}
									   containerClassName={"uk-pagination"}
									   activeClassName={"uk-active"} />
					</div>
				</div>
			</div>
		);
	}
}

Items.requestInitialData = ({server, client}) => {
	if (server) {
		return fetch(`http://localhost:3000/data/items`).then(response => response.json());
	}
	if (client) {
		const {offset, limit} = client;
		return fetch(`http://localhost:3000/data/items/${offset}/${limit}`).then(response => response.json());
	}
};
Items.getStores = () => [ItemsStore];
Items.calculateState = prevState => ({
	data : ItemsStore.getState()
});

export default Container.create(Items);
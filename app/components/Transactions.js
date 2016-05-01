import React, {Component} from 'react';
import TransactionsActionCreators from '../actions/TransactionsActionCreators';
import TransactionActionCreators from '../actions/TransactionActionCreators';
import {Container} from 'flux/utils';
import TransactionsStore from '../stores/TransactionsStore';
import fetch from 'isomorphic-fetch';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import classNames from 'classnames';
import {host} from '../config';

class Transactions extends Component {
	constructor () {
		super(...arguments);
		if (this.props.initialData) {
			TransactionsActionCreators.setTransactions(this.props.initialData);
		}
	}
	componentDidMount () {
		const {meta:{offset, limit}} = this.state.data;
		if (!this.props.initialData) {
			TransactionsActionCreators.fetchTransactions(Transactions.requestInitialData.bind(null, {client : {offset, limit}}));
		}
	}
	handlePageClick (data, event) {
		const {meta:{limit}} = this.state.data;
		const offset = data.selected;

		TransactionsActionCreators.setPaginationOffset(offset);
		TransactionsActionCreators.fetchTransactions(Transactions.requestInitialData.bind(null, {client:{offset, limit}}));
	}
	handleTransactionDelete (id, event) {
		event.preventDefault();
		TransactionActionCreators.deleteTransaction(id);
	}
	componentWillMount () {
		TransactionsActionCreators.setPaginationOffset(0);
	}
	render () {
		const
			msgClass = classNames({
				'uk-hidden' : !this.props.initialData.msg,
				'uk-alert' : true,
				'noscript-show' : true
			})
			, paginationClass = classNames({
				'uk-grid' : true,
				'noscript-hide' : true
			});
		const {transactions, meta:{offset, limit, pageNum}} = this.state.data;
		return (
			<div>
				<div className={msgClass}>{this.props.initialData.msg}</div>
				<div className="uk-grid">
					<div className="uk-width-medium-5-6 uk-width-large-5-6 uk-container-center uk-margin-top">
						<h3>Manage Transactions</h3>
					</div>
				</div>
				<div className="uk-grid">
					<div className="uk-width-medium-5-6 uk-width-large-5-6 uk-container-center uk-margin-large-bottom">
						<table className="uk-table uk-table-hover uk-table-striped uk-table-condensed">
							<thead>
								<tr>
									<th>No</th>
									<th>Date</th>
									<th>Buyer Company</th>
									<th>Item</th>
									<th>Quantity</th>
									<th>Total</th>
									<th>Payment Type</th>
									<th>Amount Paid</th>
									<th>Outstanding</th>
									<th className="uk-text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{transactions.map((transaction, index) => (
									<tr key={transaction.id}>
										<td>{index + 1 + offset * limit}</td>
										<td>{new Date(Number(transaction.modified)).toLocaleDateString()}</td>
										<td>{transaction.buyer.company}</td>
										<td>{transaction.item.name}</td>
										<td>{transaction.quantity}</td>
										<td>{Number(transaction.item.price * transaction.quantity).toFixed(2)}</td>
										<td>{transaction.paymentType}</td>
										<td>{transaction.payments.reduce((acc, payment) => acc + Number(payment.amount), 0).toFixed(2)}</td>
										<td className="uk-text-center">{transaction.payments.reduce((acc, payment) => acc + payment.amount, 0) >= transaction.item.price * transaction.quantity ? (<div className="uk-badge uk-badge-success">Paid</div>) : (<div className="uk-badge uk-badge-danger">Outstanding</div>)}</td>
										<td>
											<div className="uk-button-group">
												<Link to={`transaction/${transaction.id}`} className="uk-button uk-button-mini"><i className="uk-icon-edit"></i> Edit</Link>
												<form method="POST">
													<button type="submit" name="id" value={transaction.id} className="uk-button uk-button-mini" onClick={this.handleTransactionDelete.bind(this, transaction.id)}><i className="uk-icon-remove"></i> Delete</button>
												</form>
											</div>
										</td>
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

Transactions.requestInitialData = ({server, client}) => {
	if (server) {
		return fetch(`http://localhost:3000/data/transactions`).then(response => response.json());
	}
	if (client) {
		const {offset, limit} = client;
		return fetch(`${host}/data/transactions/${offset}/${limit}`).then(response => response.json());
	}
};

Transactions.noScriptPost = body => {
	return fetch(`http://localhost:3000/noscript/data/transactions`, {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(body)
	}).then(response => response.json());
};

Transactions.getStores = () => [TransactionsStore];

Transactions.calculateState = prevState => ({
	data : TransactionsStore.getState()
});

export default Container.create(Transactions);
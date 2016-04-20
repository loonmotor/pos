import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Item from './components/Item';
import Items from './components/Items';
import Transaction from './components/Transaction';
import Transactions from './components/Transactions';

export default (
	<Route path="/" component={App} name="Home">
		<IndexRoute component={Home} />
		<Route path="item" component={Item} name="Create Item">
			<Route path=":id" component={Item} name="Edit Item" />
		</Route>
		<Route path="items" component={Items} name="Items" />
		<Route path="transaction" component={Transaction} name="Create Transaction">
			<Route path=":id" component={Transaction} name="Edit Transaction" />
		</Route>
		<Route path="transactions" component={Transactions} name="Transactions" />
		<Route path="*" component={NotFound} name="Not Found" />
	</Route>
);
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
		<Route path="/pos" component={Home} />
		<Route path="item" component={Item} name="Create Item" />
		<Route path="item/:id" component={Item} name="Edit Item" />
		<Route path="items" component={Items} name="Manage Items" />
		<Route path="transaction/" component={Transaction} name="Create Transaction" />
		<Route path="transaction/:id" component={Transaction} name="Edit Transaction" />
		<Route path="transactions" component={Transactions} name="Manage Transactions" />
		<Route path="*" component={NotFound} name="Not Found" />
	</Route>
);
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';

export default (
	<Route path="/" component={App} name="Home">
		<IndexRoute component={Home} />
		<Route path="*" component={NotFound} name="Not found" />
	</Route>
);
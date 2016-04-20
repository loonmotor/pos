import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './app/routes';
import {render} from 'react-dom';

let handleCreateElement = (Component, props) => {
	if ('requestInitialData' in Component) {
		let initialData = document.getElementById('react-initial-data').textContent;
		if (initialData.length > 0) {
			initialData = JSON.parse(initialData);
		}
		return <Component initialData={initialData} {...props} />;
	} else {
		return <Component {...props} />;
	}
};

render((
	<Router history={browserHistory} createElement={handleCreateElement}>
		{routes}
	</Router>
), document.getElementById('root'));
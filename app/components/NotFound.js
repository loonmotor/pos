import React, {Component} from 'react';
import {Link} from 'react-router';

class NotFound extends Component {
	render () {
		return (
			<p>You are lost. <Link to="/">Go home</Link>.</p>
		);
	}
}

export default NotFound;
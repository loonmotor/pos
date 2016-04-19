import React, {Component} from 'react';

class App extends Component {
	render () {
		return (
			<div>
				<h3>Hello</h3>
				{this.props.children}
			</div>
		);
	}
}

export default App;
import React, {Component} from 'react';
import {Link} from 'react-router';
import NavMenu from './NavMenu';
import Breadcrumbs from 'react-breadcrumbs';
import Notification from './Notification';
import OnlineOffline from './OnlineOffline';

class App extends Component {
	render () {
		return (
			<div>
				<div className="uk-grid">
					<div className="uk-width-small-2-3 uk-container-center uk-margin-large-top">
						<div className="uk-grid">
							<div className="uk-width-1-3">
								<div>
								<Link to="">
									<span className="uk-badge uk-badge-success uk-text-large">POS</span>
								</Link>
								</div>
								<OnlineOffline />
							</div>
							<div className="uk-width-2-3">
								<NavMenu />
							</div>
						</div>
						<div className="uk-grid">
							<div className="uk-width-1-1">
								<Breadcrumbs routes={this.props.routes}
											 params={this.props.params}
											 separator=""
											 setDocumentTitle={true}
											 customClass="uk-breadcrumb noscript-hide"
											 wrapperElement="ul"
											 itemElement="li" />
							</div>
						</div>
						<div className="uk-grid">
							<div className="uk-width-1-1">
								{this.props.children}
							</div>
						</div>
					</div>
				</div>

				<Notification />
			</div>
		);
	}
}

export default App;
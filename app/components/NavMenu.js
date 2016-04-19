import React, {Component} from 'react';
import {Link} from 'react-router';

class NavMenu extends Component {
	render () {
		return (
			<ul className="uk-subnav uk-subnav-pill uk-float-right">
				<li data-uk-dropdown="{mode:'click'}">
					<a href="#">Actions <i className="uk-icon-angle-down"></i></a>
					<div className="uk-dropdown uk-dropdown-small">
						<ul className="uk-nav uk-nav-dropdown">
							<li><Link to="/"><i className="uk-icon-folder-o"></i> action1</Link></li>
							<li><Link to="/"><i className="uk-icon-folder-o"></i> action2</Link></li>
						</ul>
					</div>
				</li>
			</ul>
		);
	}
}

export default NavMenu;
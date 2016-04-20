import React, {Component} from 'react';
import {Link} from 'react-router';

class NavMenu extends Component {
	render () {
		return (
			<ul className="uk-subnav uk-subnav-pill uk-float-right">
				<li data-uk-dropdown="{mode:'click'}">
					<a href="#">Create <i className="uk-icon-angle-down"></i></a>
					<div className="uk-dropdown uk-dropdown-small">
						<ul className="uk-nav uk-nav-dropdown">
							<li><Link to="/item"><i className="uk-icon-plus-square"></i>&nbsp;&nbsp; Item</Link> </li>
							<li><Link to="/transaction"><i className="uk-icon-credit-card"></i>&nbsp; Transaction</Link></li>
						</ul>
					</div>
				</li>
				<li data-uk-dropdown="{mode:'click'}">
					<a href="#">Manage <i className="uk-icon-angle-down"></i></a>
					<div className="uk-dropdown uk-dropdown-small">
						<ul className="uk-nav uk-nav-dropdown">
							<li><Link to="/items"><i className="uk-icon-archive"></i>&nbsp;&nbsp; Items</Link></li>
							<li><Link to="/transactions"><i className="uk-icon-credit-card"></i>&nbsp; Transactions</Link></li>
						</ul>
					</div>
				</li>
			</ul>
		);
	}
}

export default NavMenu;
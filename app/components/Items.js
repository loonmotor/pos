import React, {Component} from 'react';

class Items extends Component {
	render () {
		return (
			<div className="uk-grid">
				<div className="uk-width-medium-4-5 uk-width-large-4-5 uk-container-center uk-margin-top">
					<table className="uk-table uk-table-striped">
						<thead>
							<tr>
								<th>test 1</th>
								<th>test 2</th>
								<th>test 3</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>dfdsf</td>
								<td>rewrwr</td>
								<td>bvcbcv</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Items;
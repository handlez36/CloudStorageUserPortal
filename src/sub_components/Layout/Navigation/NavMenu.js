import React, { Component } from 'react';

import SecondaryMenu from './SecondaryMenu';

class NavMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentModule: null,
			currentPage: null,
		};
	}

	render() {
		return (
			<div className='nav-menu'>
				<SecondaryMenu module={this.props.module} />
			</div>
		);
	}
}

export default NavMenu;

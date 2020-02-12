import React, { Component } from 'react';
import PrimaryMenu from '../Navigationv3/PrimaryMenu';
import SecondaryMenu from '../Navigationv3/SecondaryMenu';
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
				<SecondaryMenu />
			</div>
		);
	}
}

export default NavMenu;

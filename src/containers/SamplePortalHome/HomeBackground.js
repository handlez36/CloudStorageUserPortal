import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from './img/home-profile-module-2019.svg';
import Billing from './img/home-billing-module-2019.svg';
import Support from './img/home-support-module-2019.svg';
import Storage from './img/home-storage-module-2019.svg';
import { UserApi } from '../../services/user';
import Block from './Block';
import { updateModule, updatePage } from '../../actions/siteTracking';
import { SITE_MODULES, SITE_PAGES } from '../../components/Common/CommonConstants';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			storage: false,
		};
	}
	componentDidMount() {
		const { updateModule, updatePage } = this.props;
		updateModule(SITE_MODULES.HOME);
		updatePage(SITE_PAGES.HOME);
	}

	render() {
		return (
			<div>
				<div className='blocks-container-overlay' />
				<div className='blocks-container-parent'>
					<div className='blocks-container'>
						<div className='wrapper top'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper right'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper left'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper right-third'>
							<Block />
							<Block />
							<Block />
							<Block type='clickable' src={Profile} url='/portal/profile' />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper left-fourth'>
							<Block />
							<Block />
							<Block type='clickable' src={Billing} url='/portal/billing' />
							{/* <Block/> */}
							<Block type='clickable' src={Support} url='/portal/support' />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper right-fifth raised'>
							<Block />
							<Block />
							<Block />
							{/* Storage Block */}
							<Block type='clickable' url='/portal/storage/0' src={Storage} />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper left-fourth raised'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper right-third raised'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='wrapper left-fourth raised'>
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
							<Block />
						</div>
						<div className='blocks-container-child' />
						{/* end */}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ updateModule, updatePage },
)(App);

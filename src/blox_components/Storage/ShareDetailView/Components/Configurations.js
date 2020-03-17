import React, { Component, Fragment } from 'react';

import ExpandableContent from 'sub_components/Common/ExpandableContentBody';
import BloxButton from 'sub_components/Common/BloxButton';
import CopyLink from 'sub_components/Common/CopyLink';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const WhiteListIcon = `${CDN_URL}common/whitelist-button-default.svg`;
const WhiteListIconSelected = `${CDN_URL}common/whitelist-button-selected.svg`;
const ResetIcon = `${CDN_URL}common/icon-reset-default.svg`;

class Configurations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showApiKey: false,
		};
	}
	truncate = path => {
		if (path.length >= 35) {
			return path.slice(0, 35) + '...';
		} else {
			return path;
		}
	};
	onClick = () => {
		console.log('Clicking...');
		document.getElementById('manage-whitelist').src = WhiteListIconSelected;
		const whitelistButton = document.querySelector('.whitelist');
		whitelistButton.classList.add('selected');
		console.log('Toggle Whitelist func: ', this.props.toggleWhitelist);
		this.props.toggleWhitelist();
	};
	toggleSecretKey = () => {
		this.setState({ showApiKey: !this.state.showApiKey });
	};

	render() {
		const { type, share, fields, changeStoragePassword } = this.props;
		const { showApiKey } = this.state;
		return (
			<div className='config-container configuration'>
				<div className='title grid-item'>{`${type} Configuration`}</div>
				<div className='share-config'>
					<ExpandableContent fields={fields} />
					{type === 'SHARE' && (
						<Fragment>
							{share.type === 'object' && (
								<div className='api-key' onClick={this.toggleSecretKey}>
									{showApiKey ? share.api_key : 'View Secret Key'}
								</div>
							)}
							<div className='reset-button'>
								{share.type === 'file' && (
									<BloxButton
										imageId='reset-icon'
										title={'RESET'}
										enabled={true}
										customClass={`blox-button emerald-gradient`}
										onClick={changeStoragePassword}
										icon={ResetIcon}
									/>
								)}
							</div>
							<div className='copy-link'>
								<CopyLink link={share.share_path ? share.share_path : ''} />
							</div>{' '}
						</Fragment>
					)}
					{type === 'NETWORK' && (
						<Fragment>
							<div className='title grid-item'>WHITELIST Management</div>
							<div className='whitelist' onClick={this.onClick}>
								<img id='manage-whitelist' src={WhiteListIcon} />
								<div className='manage'>MANAGE</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default Configurations;

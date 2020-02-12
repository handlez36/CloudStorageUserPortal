import React, { Component } from 'react';
import ToggleSwitch from '../../../components/Common/ToggleSwitch';
import { UserProfileApi } from '../../../services/userProfile';
import { AvatarApi } from '../../../services/avatar';
import { Utils } from '../../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const ExpandIcon = `${CDN_URL}common/Accordian_Expand_Icon.svg`;
const CollapseIcon = `${CDN_URL}common/Accordian_Collapse_Icon.svg`;
const Atlanta = `${CDN_URL}profile/Atlanta-hover.svg`;
const Birmingham = `${CDN_URL}profile/Birmingham-Bubble.svg`;
const Chattanooga = `${CDN_URL}profile/Chattanooga-Bubble.svg`;
const Huntsville = `${CDN_URL}profile/Huntsville-Bubble.svg`;
const MultiLocation = `${CDN_URL}profile/Multi-location-Bubble.svg`;
const badge = `${CDN_URL}profile/icon-badge.svg`;
const locationPin = `${CDN_URL}profile/icon-locations-header.svg`;
const headerBadge = `${CDN_URL}profile/icon-badge-access.svg`;

export default class UserBlock extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.timeout = null;
		this.state = {
			user: null,
			enabled: false,
			expanded: false,
			hovered: false,
		};
	}

	onToggle = async userId => {
		const { enabled } = this.state;
		this.setState(state => ({ ...state, enabled: !enabled }));

		try {
			const response = await this.userProfileApi.updatePortalRosterActivation({
				userId,
				enabled: !enabled,
			});

			if (!Utils.isValidResponse(response)) {
				this.timeout = setTimeout(() => {
					this.setState(state => ({ ...state, enabled }));
				}, 1000);
			}
		} catch (e) {
			this.timeout = setTimeout(() => {
				this.setState(state => ({ ...state, enabled }));
			}, 1000);
		}
	};

	checkEnabledProp = () => {
		const { user } = this.props;
		const { user: existingUser } = this.state;

		if (user && !existingUser) {
			let enabled = null;
			try {
				enabled = JSON.parse(user.isActive);
			} catch (e) {
				enabled = user.isActive === 'true';
			}
			this.setState({ user, enabled });
		}
	};

	onMouseOver = () => {
		this.setState({ hovered: true });
	};

	onMouseOut = () => {
		this.setState({ hovered: false });
	};

	getHoverLabel = locations => {
		if (locations.length === 1) {
			const location = locations[0].datacenterCity;
			if (location === 'Atlanta') {
				return Atlanta;
			} else if (location === 'Chattanooga') {
				return Chattanooga;
			} else if (location === 'Huntsville') {
				return Huntsville;
			} else {
				return Birmingham;
			}
		} else {
			return MultiLocation;
		}
	};

	componentDidUpdate() {
		this.checkEnabledProp();
	}

	componentDidMount() {
		this.checkEnabledProp();
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	onClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		const {
			user: {
				firstName = '',
				lastName = '',
				emailAddress = '',
				badgeRequired = '',
				userAccess = [],
				id = '',
			} = {},
		} = this.props;
		const { enabled, expanded, hovered } = this.state;
		return (
			<div className='roster-block-wrapper'>
				{hovered && (
					<div className='hover-label'>
						<img src={this.getHoverLabel(userAccess)} />
					</div>
				)}
				<div className={`roster-block ${!enabled ? 'disabled' : ''}`}>
					<div
						className='location-icon'
						onMouseOver={this.onMouseOver}
						onMouseOut={this.onMouseOut}
					>
						<img src={Utils.getBuildingImage(userAccess)} />
					</div>

					<div className='roster-details'>
						{badgeRequired && (
							<span className='badge-access'>
								<img src={badge} />
							</span>
						)}
						<div className='user-name'>{`${firstName} ${lastName}`}</div>
						<div className='user-email'>{emailAddress}</div>
					</div>
					<div className='toggle-switch'>
						<ToggleSwitch on={enabled || false} onToggle={() => this.onToggle(id)} />
					</div>
					<div>
						<img
							className={`expand-button`}
							src={expanded ? CollapseIcon : ExpandIcon}
							onClick={this.onClick}
							alt='expand'
						/>
					</div>
				</div>
				{expanded && (
					<div className={`expanded-details ${!enabled ? 'disabled' : ''}`}>
						<div className='header'>
							<div className='location'>
								<img src={locationPin} />
								Locations
							</div>
							<div className='badge-access'>
								<img src={headerBadge} />
								Badge Access
							</div>
						</div>
						<span className='badge-info'>{badgeRequired ? 'Yes' : 'No'}</span>
						{userAccess && (
							<div className='locations'>
								{userAccess.map(user => (
									<li className='list-location'>{user.datacenterCity}</li>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

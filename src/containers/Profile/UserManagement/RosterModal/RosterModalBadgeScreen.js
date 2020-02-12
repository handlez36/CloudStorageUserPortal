import React, { Component } from 'react';
import RadioButton from '../../../../components/Common/Radio';

const PREFERENCES = {
	YES: 'Yes',
	NO: 'No',
};
const OPTIONS = [
	{ name: PREFERENCES.YES, value: PREFERENCES.YES },
	{ name: PREFERENCES.NO, value: PREFERENCES.NO },
];

class RosterModalBadgeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			badgeAccess: '',
		};
	}
	onChange = event => {
		const { onChange, id, markComplete } = this.props;
		onChange(id, event, this.state.badgeAccess, 'badgeAccess');
		markComplete('badgeAccess', true);
	};

	onClick = badgeAccess => {
		this.setState({ badgeAccess }, () => this.onChange());
	};

	render() {
		const { badgeAccess } = this.props;
		return (
			<div className='roster-badge-access'>
				<div className='title'>Add a New Person to Your Roster </div>
				<div className='sub-title'>Do they need badge access ? </div>
				<RadioButton
					callback={this.onClick}
					name='badgeAccess'
					value={badgeAccess}
					hidden={false}
					toggle={true}
					options={OPTIONS}
				/>
			</div>
		);
	}
}

export default RosterModalBadgeScreen;

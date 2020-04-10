import React, { Component } from 'react';
import { string } from 'prop-types';

import TextInput from '../../../../components/Forms/COMPANYTextInput';
import { INPUT_TYPES } from '../../../../components/Common/CommonConstants';

class RosterFirstnameScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { firstname, validations, markComplete } = this.props;

		return (
			<div className='roster-screen-firstname'>
				<div className='title'>Add a New Person to Your Roster</div>
				<TextInput
					placeholder=''
					type={INPUT_TYPES.INPUT}
					label='First Name'
					name='firstname'
					value={firstname}
					validations={validations}
					onChange={this.onChange}
					markComplete={markComplete}
					active={true}
					hideCheckmark
				/>
			</div>
		);
	}
}

RosterFirstnameScreen.propTypes = {
	firstname: string,
};

RosterFirstnameScreen.defaultProps = {
	firstname: '',
};

export default RosterFirstnameScreen;

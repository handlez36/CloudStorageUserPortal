import React, { Component } from 'react';
import { string } from 'prop-types';

import TextInput from '../../../../components/Forms/COMPANYTextInput';
import { INPUT_TYPES } from '../../../../components/Common/CommonConstants';

class RosterLastnameScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { lastname, validations, markComplete } = this.props;

		return (
			<div className='roster-screen-lastname'>
				<div className='title'>Add a New Person to Your Roster</div>
				<TextInput
					placeholder=''
					type={INPUT_TYPES.INPUT}
					label='Last Name'
					name='lastname'
					value={lastname}
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

RosterLastnameScreen.propTypes = {
	lastname: string,
};

RosterLastnameScreen.defaultProps = {
	lastname: '',
};

export default RosterLastnameScreen;

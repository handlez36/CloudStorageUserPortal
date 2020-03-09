import React, { Component } from 'react';
import { string } from 'prop-types';
import { INPUT_TYPES } from 'utils/CommonConstants';
import TextInput from 'components_old/Forms/BloxTextInput';

class UserLastnameScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { lastname, validations, markComplete } = this.props;

		return (
			<div className='username-screen-lastname'>
				<div className='title'>Invite your Teammate</div>
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

UserLastnameScreen.propTypes = {
	lastname: string,
};

UserLastnameScreen.defaultProps = {
	lastname: '',
};

export default UserLastnameScreen;

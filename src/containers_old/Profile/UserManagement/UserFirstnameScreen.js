import React, { Component } from 'react';
import { string } from 'prop-types';

import TextInput from '../../../components/Forms/BloxTextInput';
import { INPUT_TYPES } from '../../../components/Common/CommonConstants';

class UserFirstnameScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { firstname, validations, markComplete } = this.props;

		return (
			<div className='username-screen-firstname'>
				<div className='title'>Invite your Teammate</div>
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

UserFirstnameScreen.propTypes = {
	firstname: string,
};

UserFirstnameScreen.defaultProps = {
	firstname: '',
};

export default UserFirstnameScreen;

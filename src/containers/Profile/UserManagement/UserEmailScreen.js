import React, { Component } from 'react';
import { string } from 'prop-types';

import TextInput from '../../../components/Forms/BloxTextInput';
import { INPUT_TYPES } from '../../../components/Common/CommonConstants';

class UserEmailScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { email, validations, markComplete } = this.props;

		return (
			<div className='username-screen-email'>
				<div className='title'>Invite your Teammate</div>
				<TextInput
					placeholder=''
					type={INPUT_TYPES.INPUT}
					label='Email'
					name='email'
					value={email}
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

UserEmailScreen.propTypes = {
	email: string,
};

UserEmailScreen.defaultProps = {
	email: '',
};

export default UserEmailScreen;

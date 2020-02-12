import React, { Component } from 'react';
import { string } from 'prop-types';

import TextInput from '../../../../components/Forms/BloxTextInput';
import { INPUT_TYPES } from '../../../../components/Common/CommonConstants';

class RosterEmailScreen extends Component {
	onChange = event => {
		const { onChange, id } = this.props;
		onChange(id, event);
	};

	render() {
		const { email, validations, markComplete } = this.props;

		return (
			<div className='roster-screen-email'>
				<div className='title'>Add a New Person to Your Roster</div>
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

RosterEmailScreen.propTypes = {
	email: string,
};

RosterEmailScreen.defaultProps = {
	email: '',
};

export default RosterEmailScreen;

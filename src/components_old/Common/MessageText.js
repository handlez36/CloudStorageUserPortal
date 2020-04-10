import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AnimatedIcon from './AnimatedIcon';

/**
 * Component to display custom messages in a consistent format
 * Several areas in the Customer Portal contain areas with customized
 * messages coming from the COMPANY middleware services
 */
export default class MessageText extends Component {
	/**
	 * Format message
	 * @param msg - Message to format
	 */
	constructUserMessage({ context, status, message }) {
		const regex = /([\w\s,]*)([.;:]+)(.*)/;

		if (context === 'USERNAME' && status !== 'USERNAME_RESET') {
			const patternMatch = message.match(regex);

			if (patternMatch) {
				if (patternMatch[0] && patternMatch[1] && patternMatch[2]) {
					const bigText = patternMatch[1];
					const punctuation = patternMatch[2];
					const smallText = patternMatch[3];

					return (
						<div className='message_text_combo'>
							<span className='message_text_lg'>{bigText.toUpperCase()}</span>
							<span className='message_text_lg punctuation'>{punctuation}</span>
							<span className='message_text'>{smallText.toUpperCase()}</span>
						</div>
					);
				}
			}
		}

		return (
			<Fragment>
				<div
					className={
						message.includes('Validating your code') ? 'message_text validating' : 'message_text'
					}
				>
					{message.toUpperCase()}
				</div>
				{this.props.subMessage && (
					<div className='subMessage message_text'>{this.props.subMessage}</div>
				)}
			</Fragment>
		);
	}

	render() {
		return (
			<div className='message_section'>
				<AnimatedIcon enabled={this.props.reminder} icon={this.props.reminder} />
				{this.constructUserMessage(this.props)}
			</div>
		);
	}
}

/**
 * message - Message text to render
 * context - Current context to render message for (for login)
 * status  - status of request (for login)
 */
MessageText.propTypes = {
	message: PropTypes.string.isRequired,
	context: PropTypes.string,
	status: PropTypes.string,
	classes: PropTypes.string,
};

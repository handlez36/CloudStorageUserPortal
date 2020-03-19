import React, { Component } from 'react';

import IconInputComponent from 'sub_components/Common/IconInputComponent';
import PortalMessage from 'sub_components/Common/PortalMessage';
import {
	STEPS,
	TYPES,
	SEVERITIES,
	ICONS,
	TICKET_PRIORITY_MESSAGE_TEXT,
	TICKET_CREATE_ICONS,
} from 'utils/TicketConstants';
import { ExitButton } from 'components_old/Common/ExitButton';
import { TicketDetail } from './TicketDetail';

export default class TicketSeverity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			severity: '',
			clicked: false,
		};
	}

	getIcon() {
		const { type } = this.props;

		switch (type.toUpperCase()) {
			case TYPES.BILLING:
				return TICKET_CREATE_ICONS.BILLING;

			case TYPES.OUTAGE:
				return TICKET_CREATE_ICONS.OUTAGE;

			case TYPES.SUPPORT:
				return TICKET_CREATE_ICONS.SUPPORT;

			case TYPES.STORAGE:
				return TICKET_CREATE_ICONS.STORAGE;

			default:
				return TICKET_CREATE_ICONS.SUPPORT;
		}
	}

	onChange = severity => {
		this.setState({ severity, clicked: true });
		const attribute = { [STEPS.TICKET_SEVERITY]: severity };

		setTimeout(() => {
			this.props.setTicketAttribute(attribute);
		}, 1000);
	};

	onMouseEnter = severity => {
		this.setState({ severity });
	};

	onMouseLeave = () => {
		this.setState({ severity: '' });
	};

	resetTicketCreation = () => {
		const { resetTicketCreation } = this.props;
		resetTicketCreation();
	};

	render() {
		return (
			<div className='ticket-severity'>
				<div className='exit-button-section'>
					<ExitButton redirectTo={this.resetTicketCreation} />
				</div>
				<PortalMessage
					start={TICKET_PRIORITY_MESSAGE_TEXT.START}
					content={TICKET_PRIORITY_MESSAGE_TEXT.CONTENT}
				/>
				<TicketDetail ticket={{ type: this.props.type, priority: this.state.severity }} />
				<IconInputComponent icon={this.getIcon()}>
					{this.state.clicked ? (
						<div className='severity-group'>
							<button
								className='low-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.LOW)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.LOW)}
								onMouseLeave={this.onMouseLeave}
								disabled
							>
								<div className='low-severity' />
							</button>
							<button
								className='medium-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.MEDIUM)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.MEDIUM)}
								onMouseLeave={this.onMouseLeave}
								disabled
							>
								<div className='medium-severity' />
							</button>
							<button
								className='high-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.HIGH)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.HIGH)}
								onMouseLeave={this.onMouseLeave}
								disabled
							>
								<div className='high-severity' />
							</button>{' '}
						</div>
					) : (
						<div className='severity-group'>
							<button
								className='low-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.LOW)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.LOW)}
								onMouseLeave={this.onMouseLeave}
							>
								<div className='low-severity' />
							</button>
							<button
								className='medium-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.MEDIUM)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.MEDIUM)}
								onMouseLeave={this.onMouseLeave}
							>
								<div className='medium-severity' />
							</button>
							<button
								className='high-severity-wrapper'
								onClick={() => this.onChange(SEVERITIES.HIGH)}
								onMouseEnter={() => this.onMouseEnter(SEVERITIES.HIGH)}
								onMouseLeave={this.onMouseLeave}
							>
								<div className='high-severity' />
							</button>{' '}
						</div>
					)}
				</IconInputComponent>
			</div>
		);
	}
}

import React, { Component } from 'react';
import COMPANYButton from '../../../components/Common/COMPANYButton';
import Button from '../../../components/Common/COMPANYButton';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const DocuSignIcon = `${CDN_URL}support/icons-docusign-file.svg`;

const FIELDS = {
	AGREED: 1,
	DONE: 3,
};

class GuestAccessDocuSign extends Component {
	state = {
		agreed: '',
		duration: '',
		recurring: '',
		completedFields: ['clicked'],
		activeField: FIELDS.AGREED,
	};

	/** For new wizard... */
	formatWizardParams = (component, agreed) => {
		return {
			component,
			data: { agreed },
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { agreed } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(stepName, agreed);
		nextStep(data);
	};

	onClick = () => {
		const { id, updateProgress } = this.props;

		updateProgress(id, 1);
		this.setState({ agreed: true });
	};

	componentDidMount() {
		const { editParams, id, updateProgress } = this.props;
		const completedFields = ['datetime', 'recurring'];

		if (editParams) {
			this.setState({
				datetime: editParams.datetime,
				recurring: editParams.recurring,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		}
	}

	render() {
		return (
			<div className='ticket-sign'>
				<img className='ticket-sign-image' src={DocuSignIcon} alt='' />
				<div className='date-field-label'>
					Your guest will be required to review and sign the data center rules and regulations upon
					arrival.
				</div>
				<div className='sign-button'>
					<COMPANYButton
						title='I UNDERSTAND'
						enabled={true}
						customClass='COMPANY-button'
						onClick={this.onClick}
					/>
				</div>
				<Button
					title='REVIEW'
					enabled={this.state.agreed}
					customClass='COMPANY-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default GuestAccessDocuSign;

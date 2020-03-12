import React, { Component } from 'react';

import Button from 'sub_components/Common/BloxButton';
import PortalModal from './PortalModal';

const PHASES = {
	POPULATE: 'POPULATE',
	REVIEW: 'REVIEW',
	CONFIRMATION: 'CONFIRMATION',
};

class ModalWizard extends Component {
	state = {
		active: null,
		steps: {},
		stepCount: 0,
		phase: PHASES.POPULATE,
	};

	resetState = () => {
		this.setState({
			active: null,
			steps: {},
			stepCount: 0,
			phase: PHASES.POPULATE,
		});
	};

	onEditScreen = step => {
		this.setState({ active: step });
	};

	processWizardFields = () => {
		const { submitWizard } = this.props;
		submitWizard();
	};

	findNextStepForward = (active, stepCount, reviewStep, direction, steps) => {
		if (!parseInt(active)) {
			return;
		}

		const { onStepChange } = this.props;
		const nextStep = direction === 'next' ? active + 1 : active - 1;
		const pastPopulateScreens = nextStep > stepCount;
		if (pastPopulateScreens) {
			if (reviewStep) {
				this.setState({ active: PHASES.REVIEW, phase: PHASES.REVIEW });
			} else {
				this.processWizardFields();
			}
		} else if (nextStep < 1) {
			this.setState({ active: 1 });
		} else {
			this.setState({ active: nextStep });
			onStepChange(steps[nextStep].fieldname, nextStep);
		}
	};

	nextStep = direction => {
		const { steps, active, phase, stepCount } = this.state;

		if (phase === PHASES.POPULATE) {
			this.findNextStepForward(active, stepCount, steps[PHASES.REVIEW], direction, steps);
		} else if (phase === PHASES.REVIEW) {
			active !== PHASES.REVIEW
				? this.setState({ active: PHASES.REVIEW })
				: this.processWizardFields();
		} else if (phase === PHASES.CONFIRMATION) {
			this.toggleModal();
		}
	};

	toggleModal = () => {
		const { toggleOpen } = this.props;

		this.setState({ active: 1 });
		toggleOpen();
	};

	displayActiveStep = (active, steps) => {
		if (!active || !steps) {
			return;
		}

		const { component: Screen, params } = steps[active];
		return <Screen {...params} id={active} />;
	};

	showPrevButton = () => {
		const { active, phase } = this.state;
		return active > 1 && phase !== PHASES.CONFIRMATION;
	};

	showNextButton = () => {
		return true;
	};

	getNextButtonText = buttonText => {
		const { steps, active, phase } = this.state;
		let text = 'NEXT';

		if (phase === PHASES.CONFIRMATION) {
			text = buttonText.confirmation;
		} else {
			if (parseInt(active) && !steps[active + 1]) {
				text = buttonText.lastStep;
			}
		}

		return text;
	};

	setupScreens = steps => {
		if (!steps || steps.length <= 0) {
			return {};
		}

		const stepCount = Object.keys(steps).filter(
			step => step !== PHASES.REVIEW && step !== PHASES.CONFIRMATION,
		).length;
		return stepCount;
	};

	componentDidUpdate() {
		const { showConfirmationStep, active } = this.props;
		const { phase: existingPhase, active: existingActive } = this.state;

		if (showConfirmationStep && existingPhase !== PHASES.CONFIRMATION) {
			this.setState({ phase: PHASES.CONFIRMATION, active: PHASES.CONFIRMATION });
		} else if (existingActive !== active) {
			this.setState({ phase: PHASES.POPULATE, active });
		} else if (active !== PHASES.CONFIRMATION && existingPhase === PHASES.CONFIRMATION) {
			this.setState({ phase: PHASES.POPULATE });
		}
	}

	componentDidMount() {
		const { steps, reviewStep } = this.props;
		const stepCount = this.setupScreens(steps);
		const active = Object.keys(steps).length > 0 ? 1 : null;

		this.setState({
			active,
			steps,
			stepCount,
			reviewStep,
		});
	}

	render() {
		const { header: HeaderComponent, show, enableNav, buttonText, additionalClass } = this.props;
		const { active, steps } = this.state;
		const nextButtonLabel = this.getNextButtonText(buttonText);

		return (
			<PortalModal
				header={<HeaderComponent closeModal={this.toggleModal} />}
				isOpen={show}
				toggleOpen={this.toggleModal}
				additionalClass={`blox-modal-wizard ${additionalClass}`}
				useButton={true}
			>
				{this.displayActiveStep(active, steps)}
				<div className={`buttons-row`}>
					{this.showPrevButton() && (
						<div
							className={`prev ${!enableNav ? 'disabled' : ''}`}
							onClick={() => this.nextStep('prev')}
						>
							BACK
						</div>
					)}
					{this.showNextButton() && (
						<Button
							title={nextButtonLabel}
							enabled={enableNav}
							customClass='blox-button next-button'
							onClick={() => this.nextStep('next')}
						/>
					)}
				</div>
			</PortalModal>
		);
	}
}

export default ModalWizard;

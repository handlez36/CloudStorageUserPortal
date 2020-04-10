import React, { Component } from 'react';

import PageHeader from 'components_old/Support/PageHeader';

const STAGES = {
	POPULATE: 'POPULATE',
	REVIEW: 'REVIEW',
	COMPLETE: 'COMPLETE',
};

class COMPANYWizard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			headerAttributes: [],
			steps: null,
			stepCount: 0,
			active: null,
			stage: STAGES.POPULATE,
			headerTitles: null,
			reviewParams: {},
			editParams: null,
			submittedViaEmail: false,
		};
	}

	resetWizardToInitialState = () => {
		const { headerAttributes, steps } = this.props;
		let stepCount = 0;
		if (steps) {
			stepCount = this.getStepCount(steps);
		}

		this.setState({
			active: null,
			stage: STAGES.POPULATE,
			editParams: null,
			submittedViaEmail: false,
			headerAttributes,
			reviewParams: {},
			steps,
			stepCount,
		});
	};

	updateProgress = (stepKey, numFieldsCompleted) => {
		const { headerAttributes, headerAttributes: { progressAttributes } = {} } = this.state;
		const attributes = progressAttributes.filter(att => att.key === stepKey);
		const attribute = attributes.length > 0 ? attributes[0] : null;

		if (attribute) {
			attribute.completed = numFieldsCompleted;
			this.setState({ headerAttributes: { ...headerAttributes, progressAttributes } });
		}
	};

	editSection = (section, editParams) => {
		this.setState({ active: section, editParams });
	};

	completeWizard = () => {
		this.setState({ active: STAGES.COMPLETE, stage: STAGES.COMPLETE });
	};

	setProgressToComplete = () => {
		const { active, stage, headerAttributes: { progressAttributes } = {} } = this.state;
		if (stage === STAGES.REVIEW && active === STAGES.REVIEW) {
			progressAttributes.forEach(att => {
				att.showCheckMark = true;
			});
		} else if (stage === STAGES.REVIEW && active !== STAGES.REVIEW) {
			const attributes = progressAttributes.filter(att => att.key === active)[0];
			attributes.showCheckMark = false;
		} else if (stage === STAGES.POPULATE) {
			for (let i = 1; i < parseInt(active); i++) {
				progressAttributes[i - 1].showCheckMark = true;
			}
		}
	};

	findNextStep = () => {
		const { steps, active: currentStep, stage } = this.state;

		if (stage === STAGES.COMPLETE) {
			// Call wizard complete handler
		} else if (stage === STAGES.REVIEW) {
			this.setState({ active: STAGES.REVIEW, stage: STAGES.REVIEW });
		} else {
			const potentialNextStep = parseInt(currentStep + 1);

			if (steps[potentialNextStep]) {
				this.setState({ active: potentialNextStep, stage: STAGES.POPULATE });
			} else {
				this.setState({ active: STAGES.REVIEW, stage: STAGES.REVIEW });
			}
		}
	};

	onNextStep = data => {
		const { active, reviewParams } = this.state;
		reviewParams[active] = data;

		this.setState({ reviewParams }, this.findNextStep());
	};

	displayActiveStep = (active, steps) => {
		if (!active || !steps) {
			return;
		}

		const { component: Screen, params } = steps[active];
		const { editParams } = this.state;
		let screenParams = { ...params };
		if (active === STAGES.REVIEW || active === STAGES.COMPLETE) {
			const { reviewParams } = this.state;
			screenParams = {
				...params,
				data: reviewParams,
				editSection: this.editSection,
				completeWizard: this.completeWizard,
			};
		}

		return (
			<Screen
				{...screenParams}
				id={active}
				name={steps[active].name}
				nextStep={this.onNextStep}
				updateProgress={this.updateProgress}
				editParams={editParams}
				resetWizard={this.props.resetWizard}
				phase={active}
			/>
		);
	};

	getStepCount = steps => {
		if (steps.length <= 0) {
			return {};
		}

		const stepCount = Object.keys(steps).filter(
			step => step !== STAGES.REVIEW && step !== STAGES.COMPLETE,
		).length;
		return stepCount;
	};

	getScreenTitle = () => {
		const {
			active,
			stage,
			headerAttributes,
			headerAttributes: { icon, pageTitle, pageTitles } = {},
		} = this.state;
		if (!active || (!pageTitles && !pageTitle)) {
			return '';
		}

		if (!pageTitles && pageTitle) {
			return pageTitle;
		}

		if (pageTitles !== undefined && pageTitles !== null) {
			return pageTitles[stage] ? pageTitles[stage] : pageTitle;
		} else {
			return pageTitle;
		}
	};

	componentDidUpdate() {
		const { active: incomingActive, shouldWizardReset: incomingResetRequest } = this.props;
		const {
			active: existingActive,
			stage: existingStage,
			shouldWizardReset: existingResetState,
		} = this.state;

		if (incomingActive && incomingActive !== existingActive) {
			let stage = existingStage;
			if (incomingActive === STAGES.COMPLETE) {
				stage = STAGES.COMPLETE;
			}
			this.setState({ active: incomingActive, stage });
		}

		if (incomingResetRequest && !existingResetState) {
			this.setState({ shouldWizardReset: true });
			this.resetWizardToInitialState();
		} else if (!incomingResetRequest && existingResetState) {
			this.setState({ shouldWizardReset: false });
		}
	}

	componentDidMount() {
		const { steps, headerAttributes } = this.props;

		if (steps) {
			const stepCount = this.getStepCount(steps);
			this.setState({ steps, stepCount, active: 1, headerAttributes });
		}
	}

	render() {
		const {
			active,
			steps,
			headerAttributes: { icon, pageTitle, pageTitles, moduleTitle, progressAttributes } = {},
		} = this.state;

		this.setProgressToComplete();

		return (
			<div
				className={`${
					active === STAGES.REVIEW
						? 'review COMPANY-wizard-review'
						: 'populate COMPANY-wizard-populate'
				}`}
			>
				<PageHeader
					icon={icon}
					// pageTitle={pageTitle}
					pageTitle={this.getScreenTitle()}
					moduleTitle={moduleTitle}
					progressAttributes={progressAttributes}
				/>
				<div className='COMPANY-wizard'>{this.displayActiveStep(active, steps)}</div>
			</div>
		);
	}
}

export default COMPANYWizard;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wizard from '../../../components/Forms/BloxWizard';
import SelectInvoiceScreen from '../../../components/Billing/SelectInvoiceScreen';
import PaymentMethodScreen from './PaymentMethod';
import PaymentSummary from './PaymentSummary';
import Modal from '../../../components/Common/ErrorModal';
import Button from '../../../components/Common/BloxButton';
import { Utils } from '../../../services/utils';
import { BillingApi, BillingUtils } from '../../../services/billing';
import { INVOICE_SUMMARY_HEADERS, MENU } from '../BillingConstants';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';
import { updatePage } from '../../../actions/siteTracking';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const HeaderIcon = `${CDN_URL}billing/make-a-payment-icon.svg`;
const selectIconOn = `${CDN_URL}billing/Select-payment-method-icon-on.svg`;
const chequeIcon = `${CDN_URL}billing/select-invoice-icon-on.svg`;
const checkMark = `${CDN_URL}billing/check-mark-circle.svg`;

const STAGES = {
	POPULATE: 'POPULATE',
	REVIEW: 'REVIEW',
	COMPLETE: 'COMPLETE',
};
const HEADER_TITLE = {
	[STAGES.POPULATE]: '',
	[STAGES.REVIEW]: 'REVIEW & Submit',
	[STAGES.COMPLETE]: 'Confirmation',
};

class OnlinePayment extends Component {
	constructor(props) {
		super(props);

		this.billingApi = new BillingApi();
		this.commonParams = {};
		this.state = this.initializeWizard();
	}

	initializeWizard = () => {
		return {
			active: null,
			error: null,
			showModal: false,
			errorBody: null,
			ip: null,
			steps: {
				'1': {
					component: SelectInvoiceScreen,
					name: 'SelectInvoiceScreen',
					params: {
						...this.commonParams,
						data: { invoices: [] },
					},
				},
				'2': {
					component: PaymentMethodScreen,
					name: 'PaymentMethodScreen',
					resetProgressOnEdit: true,
					params: { ...this.commonParams, data: {} },
				},
				REVIEW: {
					component: PaymentSummary,
					name: 'PaymentReviewScreen',
					params: {
						...this.commonParams,
						phase: 'REVIEW',
						submitPayment: this.submitPayment,
						submitted: false,
					},
				},
				COMPLETE: {
					component: PaymentSummary,
					name: 'PaymentSummaryScreen',
					params: {
						...this.commonParams,
						phase: 'CONFIRMATION',
					},
				},
			},
		};
	};

	resetWizard = () => {
		this.setState(() => {
			return { ...this.initializeWizard(), active: 1 };
		});
		setTimeout(() => {
			this.setState({ active: null });
		}, 1000);
	};

	getSoftErrorBody = () => {
		return (
			<div className='soft-error'>
				<div className='top-message'>
					Something went wrong on our end, try submitting your payment again.
				</div>
				<div className='bottom-message'>
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
				<Button
					title='TRY AGAIN'
					enabled={true}
					customClass='blox-button gradient'
					onClick={this.toggleErrorModal}
				/>
			</div>
		);
	};

	getHardErrorBody = () => {
		return (
			<div className='hard-error'>
				<div className='top-message'>
					There was an error processing the credit card information.
				</div>
				<div className='bottom-message'>Please review the information entered and try again.</div>
				<Button
					title='OKAY'
					enabled={true}
					customClass='blox-button gradient'
					onClick={this.toggleErrorModal}
				/>
			</div>
		);
	};

	getSuccessBody = () => {
		const { refreshInvoices } = this.props;
		return (
			<div className='successful-payment-modal'>
				<div className='top-message'>Your payment is processing!</div>
				<div className='bottom-message'>
					Please <span className='bottom-message bold'> check your email </span> on file for a
					<br />
					receipt of this transaction
				</div>
				<Button
					title='OKAY'
					enabled={true}
					customClass='blox-button gradient'
					onClick={() => {
						refreshInvoices();
						this.toggleErrorModal();
					}}
				/>
			</div>
		);
	};

	getPublicIP = async () => {
		await this.billingApi
			.retrieveIPParams()
			.then(response => {
				const ip = response.data;
				this.setState({ ip });
			})
			.catch(error => console.log(error));
	};

	formatPaymentParams = data => {
		const { fuseBillId: customerId } = this.props.companyInfo;
		if (!data || !customerId) {
			return null;
		}

		const {
			1: { data: { total: amount, paymentAllocations: preFormattedPaymentAllocations } = {} },
			2: { data: { nonce, cardholderName, cardType, lastFour: cardLastFour } = {} },
		} = data;
		const paymentAllocations = preFormattedPaymentAllocations.map(payment => {
			return {
				invoiceID: payment.invoiceIdNumber,
				amount: Utils.formatAmount(payment.amount),
			};
		});

		return {
			customerId,
			amount,
			nonce,
			cardholderName,
			cardType,
			cardLastFour,
			paymentAllocations,
		};
	};

	submitPayment = async data => {
		const { ip } = this.state;
		const paymentParams = this.formatPaymentParams(data);
		if (!paymentParams) {
			this.setState({
				showModal: true,
				errorBody: this.getSoftErrorBody(),
				error: 'Network Error',
			});
			return;
		}

		paymentParams.publicIpAddress = { ip: ip || '0.0.0.0' };
		paymentParams.privateIpAddress = '127.0.0.1';
		this.setState(state => (state.steps['REVIEW'].params.submitted = true));
		try {
			const response = await BillingApi.submitPayment(paymentParams);
			if (Utils.isValidResponse(response)) {
				this.setState({
					active: STAGES.COMPLETE,
					showModal: true,
					errorBody: this.getSuccessBody(),
				});
			} else {
				this.setState(state => (state.steps['REVIEW'].params.submitted = false));
				let errorBody;
				if (response.retryError) {
					errorBody = this.getSoftErrorBody();
				} else {
					errorBody = this.getHardErrorBody();
				}
				this.setState({ showModal: true, errorBody, error: 'Network Error' });
			}
		} catch (e) {
			this.setState(state => (state.steps['REVIEW'].params.submitted = false));
			this.setState({
				showModal: true,
				errorBody: this.getSoftErrorBody(),
				error: 'Network Error',
			});
		}
	};

	toggleErrorModal = () => {
		this.setState({ error: false, showModal: false });
	};

	setInvoices = invoices => {
		if (!invoices) {
			return;
		}

		const { steps } = this.state;
		const stepsCopy = { ...steps };
		stepsCopy['1'].params.data.invoices = invoices;

		this.setState({ invoices, steps: stepsCopy });
	};

	requestOverdueInvoices = async () => {
		const params = {
			statusFilters: ['Overdue', 'Due'],
		};

		try {
			const response = await this.billingApi.getAll(params);
			if (Utils.isValidResponse(response)) {
				const massagedData = BillingUtils.massageData(
					response.data.invoices,
					INVOICE_SUMMARY_HEADERS,
				);
				this.setInvoices(massagedData);
			} else {
				this.handleInvoiceRetrievalError(response.data.error || 'Error');
			}
		} catch (e) {
			this.handleInvoiceRetrievalError('Network error');
		}
	};

	componentDidUpdate() {
		const { data } = this.props;
		const { invoices: existingInvoices } = this.state;

		if (data && !existingInvoices) {
			this.setInvoices(data);
		}
	}

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.BILLING[MENU.PAYMENT]);

		this.getPublicIP();
		this.requestOverdueInvoices();
	}

	render() {
		const { steps, active, error, showModal, errorBody } = this.state;
		const progressAttributes = [
			{
				key: 1,
				icon: chequeIcon,
				total: 1,
				completed: 0,
			},
			{
				key: 2,
				icon: selectIconOn,
				total: 5,
				completed: 0,
			},
		];
		const pageTitle = HEADER_TITLE[active];
		const headerAttributes = {
			icon: HeaderIcon,
			moduleTitle: 'MAKE A PAYMENT',
			pageTitle,
			progressAttributes,
		};
		return (
			<div className='online-payment-page'>
				<Modal
					isOpen={showModal}
					toggleOpen={this.toggleErrorModal}
					customTitle={error ? 'Submission Error' : 'Email Confirmation'}
					customImage={error ? '' : checkMark}
					customBody={errorBody}
				/>
				<Wizard
					headerAttributes={headerAttributes}
					steps={steps}
					active={active}
					resetWizard={this.resetWizard}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		companyInfo: state.company_info,
	};
}

export default connect(
	mapStateToProps,
	{ updatePage },
)(OnlinePayment);

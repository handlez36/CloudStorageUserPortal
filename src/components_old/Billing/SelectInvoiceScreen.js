import React, { Component } from 'react';
import InvoicePaymentItem from '../Billing/InvoicePaymentItem';
import TotalAmountDue from '../Billing/TotalAmount';
import InputField from '../Forms/BloxTextInput';
import { ICON_TYPES, ICONS } from '../../containers/Billing2.0/BillingConstants';
import { INPUT_TYPES, currencyMask } from '../Common/CommonConstants';
import Button from '../../components/Common/BloxButton';

class SelectInvoiceScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
		};
	}

	componentDidMount() {
		const { editParams } = this.props;
		const { data: { invoices } = {} } = this.props;
		if (editParams) {
			this.setState({ editParams, invoices, value: editParams });
		} else {
			if (invoices) {
				this.setInitialInvoiceList();
			}
		}
	}

	componentDidUpdate() {
		this.setInitialInvoiceList();
	}

	setInitialInvoiceList = () => {
		const { value: existingInvoices } = this.state;
		const { data: { invoices: incomingInvoices } = {} } = this.props;

		if (existingInvoices.length < 1 && incomingInvoices && incomingInvoices.length > 0) {
			const value = incomingInvoices.map(invoice => {
				return {
					invoiceIdNumber: invoice.invoiceId,
					invoiceId: invoice.invoiceNumber,
					amount: invoice.amountDue,
					due: invoice.dueDate,
					amountDue: invoice.amountDue,
					sent: invoice.billcycle,
				};
			});
			this.setState({ value }, () => this.updateProgress());
		}
	};

	sendParams = () => {
		const { value } = this.state;
		const { nextStep, name } = this.props;

		const data = {
			component: name,
			data: {
				paymentAllocations: value,
				total: this.getTotal(),
			},
		};

		nextStep(data);
	};

	formatAmount = amount => {
		amount = amount.replace('$', '');
		amount = amount.replace(',', '');
		amount = parseFloat(amount);
		if (isNaN(amount)) {
			return 0;
		}

		return amount;
	};

	getTotal = () => {
		const { value } = this.state;
		const total = value.reduce((sum, invoice) => (sum += this.formatAmount(invoice.amount)), 0);
		return total;
	};

	onChange = event => {
		const { value } = this.state;
		const fieldname = event.target.name;
		const fieldValue = event.target.value;

		for (let i = 0; i <= value.length; i++) {
			if (value[i]) {
				if (value[i].invoiceId === fieldname) {
					this.setState(state => (state.value[i].amount = fieldValue), () => this.updateProgress());
				}
			}
		}
	};

	updateProgress = () => {
		const { id, updateProgress } = this.props;
		const { value } = this.state;
		const total = this.getTotal();

		if (value.length > 0 && total > 0) {
			updateProgress(id, 1);
		} else {
			updateProgress(id, 0);
		}
	};

	focusInput = id => {
		const input = document.querySelector(`input[name="${id}"]`);
		if (input) {
			setTimeout(() => {
				input.focus();
			}, 0);
		}
	};

	onSelect = invoice => {
		const { value } = this.state;
		const updatedValue = [...value];
		const indexInSelectedList = this.getIndexOfSelectedInvoice(invoice.invoiceNumber);
		if (indexInSelectedList === null) {
			updatedValue.push({
				invoiceIdNumber: invoice.invoiceId,
				invoiceId: invoice.invoiceNumber,
				amount: invoice.amountDue,
				due: invoice.dueDate,
				amountDue: invoice.amountDue,
				sent: invoice.billcycle,
			});
			this.setState({ value: updatedValue }, () => {
				this.updateProgress();
				this.focusInput(invoice.invoiceNumber);
			});
		} else {
			updatedValue.splice(indexInSelectedList, 1);
			this.setState({ value: updatedValue }, this.updateProgress);
		}
	};
	onClick = event => {
		event.stopPropagation();
	};

	getIndexOfSelectedInvoice = invoiceId => {
		const { value } = this.state;
		let index = null;

		value.forEach((existingInvoice, i) => {
			if (existingInvoice.invoiceId === invoiceId) {
				index = i;
			}
		});

		return index;
	};

	massageData = invoice => {
		return [
			{ header: 'Invoice #', value: invoice.invoiceNumber },
			{ header: 'Date Due', value: invoice.dueDate, alert: true },
			{ header: 'Amount Due', value: invoice.amountDue, alertIcon: true, alert: true },
			{
				header: 'Amount to Pay',
				value: '$0.00',
				custom: true,
				component: this.getAmountPaidField(invoice),
			},
		];
	};

	getAmountPaidField = invoice => {
		const { value } = this.state;
		const amountDue = invoice.amountDue.replace(',', '');
		const indexInSelectedList = this.getIndexOfSelectedInvoice(invoice.invoiceNumber);

		const amountToPay =
			indexInSelectedList !== null ? value[indexInSelectedList].amount.replace(',', '') : amountDue;
		if (indexInSelectedList || indexInSelectedList === 0) {
			return (
				<InputField
					type={INPUT_TYPES.INPUT}
					label=''
					name={invoice.invoiceNumber}
					id={invoice.invoiceNumber}
					mask={currencyMask}
					value={amountToPay}
					validations={[]}
					disabled={false}
					onChange={this.onChange}
					onClick={this.onClick}
					markComplete={this.markComplete}
					active={true}
					hideCheckmark
				/>
			);
		} else {
			return (
				<InputField
					type={INPUT_TYPES.INPUT}
					label=''
					name={invoice.invoiceNumber}
					id={invoice.invoiceNumber}
					mask={currencyMask}
					value={amountToPay}
					validations={[]}
					disabled={true}
					onChange={this.onChange}
					onClick={this.onClick}
					markComplete={this.markComplete}
					active={true}
					hideCheckmark
				/>
			);
		}
	};

	render() {
		const { data: { invoices } = {} } = this.props;

		return (
			<div className='select-invoice-wrapper'>
				<div className='section-title'>SELECT Invoices</div>

				{invoices &&
					invoices.map(invoice => (
						<div key={invoice.invoiceId} className='invoice-container'>
							<InvoicePaymentItem
								data={this.massageData(invoice)}
								icon={ICONS[ICON_TYPES.DUE]}
								onSelect={() => this.onSelect(invoice)}
								selected={this.getIndexOfSelectedInvoice(invoice.invoiceNumber) !== null}
							/>
							<br />
						</div>
					))}
				<div className='total-amount-container'>
					<TotalAmountDue amount={this.getTotal()} />
				</div>
				<Button
					title='NEXT'
					enabled={this.getTotal() > 0}
					customClass='blox-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default SelectInvoiceScreen;

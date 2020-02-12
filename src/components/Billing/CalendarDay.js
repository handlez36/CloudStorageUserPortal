import React, { Component } from 'react';
import moment from 'moment';
import { BillingApi } from '../../services/billing';
import Zero from './CountDownSVGs/Zero';
import PastDue from './CountDownSVGs/PastDue';
import DueToday from './CountDownSVGs/DueToday';
export default class CalendarDay extends Component {
	constructor() {
		super();

		this.state = {
			days: null,
			daysLeft: null,
			dueDate: null,
			screenSize: null,
		};

		this.billingApi = new BillingApi();
	}
	importAll = r => {
		const images = {};
		r.keys().map(item => {
			images[item.replace('./', '')] = r(item);
		});
		return images;
	};

	daysLeft = () => {
		let daysLeft = null;
		const due = [];
		let dueDate = null;
		moment.locale();
		this.billingApi.getAll().then(response => {
			const invoices = response.data.invoices;
			invoices.map(invoice => {
				if (
					invoice.amountDue !== '0.00' &&
					(invoice.status === 'Due' || invoice.status === 'Overdue')
				) {
					dueDate = moment(invoice.dueDate);
					due.push(dueDate);
				}
			});
			const today = moment();
			due.sort(function(left, right) {
				const dateA = moment(left);
				const dateB = moment(right);

				if (dateA.isBefore(dateB)) {
					return -1;
				} else if (dateA.isAfter(dateB)) {
					return 1;
				} else {
					return 0;
				}
			});
			dueDate = due[0];
			if (dueDate !== undefined && dueDate !== null) {
				daysLeft = dueDate.diff(today, 'days');
			}
			this.setState({
				daysLeft,
				dueDate,
			});
		});
	};

	daysLeftCounter = () => {
		const today = moment().startOf('day');
		const { dueDate } = this.state;

		if (dueDate === undefined || dueDate === null) {
			this.setState({ days: `PAID` });
			return;
		}

		const daysLeft = dueDate.startOf('day').diff(today, 'days');

		if (today.isBefore(dueDate)) {
			const daysLeft = dueDate.diff(today, 'days');
			if (daysLeft <= 31) {
				if (daysLeft > 1) {
					this.setState({ days: `${daysLeft} DAYS` });
				} else if (daysLeft === 1) {
					this.setState({ days: `${daysLeft} DAY` });
				} else {
					this.setState({ days: `${daysLeft} DAYS` });
				}
			} else {
				this.setState({ days: '' });
			}
		} else if (today.isAfter(dueDate)) {
			if (daysLeft === -1) {
				this.setState({ days: `${-daysLeft} DAY` });
			} else {
				this.setState({ days: `${-daysLeft} DAYS` });
			}
		} else if (today.isSame(dueDate)) {
			this.setState({ days: `${daysLeft} DAYS` });
		}
	};

	displayNumber = days => {
		moment.locale();
		const { dueDate } = this.state;
		const today = moment().startOf('day');

		if (dueDate === null || dueDate === undefined) {
			return <Zero text='PAID' />;
		} else {
			dueDate.startOf('day');
		}

		if (today.isBefore(dueDate)) {
			let daysLeft = dueDate.diff(today, 'days');

			if (daysLeft <= 31) {
				daysLeft = daysLeft - 1;
				return BillingApi.getCountDownNumber(daysLeft);
			} else {
				return <span />;
			}
		} else if (today.isAfter(dueDate)) {
			return <PastDue text={days} />;
		} else {
			return <DueToday />;
		}
	};

	componentDidMount() {
		this.daysLeft();
	}

	componentDidUpdate(state, props) {
		const { dueDate } = this.state;
		if (dueDate !== props.dueDate) {
			this.daysLeftCounter();
		}
	}

	render() {
		const { days } = this.state;
		return (
			<div className='calendar'>
				<div className='calendar-container'>
					{this.displayNumber(days)}
					<div className='days-left-container'>{/* <div className='days-left'>{days}</div> */}</div>
				</div>
			</div>
		);
	}
}

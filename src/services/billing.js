import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';

import CountDown1 from '../components/Billing/CountDownSVGs/CountDown1';
import CountDown2 from '../components/Billing/CountDownSVGs/CountDown2';
import CountDown3 from '../components/Billing/CountDownSVGs/CountDown3';
import CountDown4 from '../components/Billing/CountDownSVGs/CountDown4';
import CountDown5 from '../components/Billing/CountDownSVGs/CountDown5';
import CountDown6 from '../components/Billing/CountDownSVGs/CountDown6';
import CountDown7 from '../components/Billing/CountDownSVGs/CountDown7';
import CountDown8 from '../components/Billing/CountDownSVGs/CountDown8';
import CountDown9 from '../components/Billing/CountDownSVGs/CountDown9';
import CountDown10 from '../components/Billing/CountDownSVGs/CountDown10';
import CountDown11 from '../components/Billing/CountDownSVGs/CountDown11';
import CountDown12 from '../components/Billing/CountDownSVGs/CountDown12';
import CountDown13 from '../components/Billing/CountDownSVGs/CountDown13';
import CountDown14 from '../components/Billing/CountDownSVGs/CountDown14';
import CountDown15 from '../components/Billing/CountDownSVGs/CountDown15';
import CountDown16 from '../components/Billing/CountDownSVGs/CountDown16';
import CountDown17 from '../components/Billing/CountDownSVGs/CountDown17';
import CountDown18 from '../components/Billing/CountDownSVGs/CountDown18';
import CountDown19 from '../components/Billing/CountDownSVGs/CountDown19';
import CountDown20 from '../components/Billing/CountDownSVGs/CountDown20';
import CountDown21 from '../components/Billing/CountDownSVGs/CountDown21';
import CountDown22 from '../components/Billing/CountDownSVGs/CountDown22';
import CountDown23 from '../components/Billing/CountDownSVGs/CountDown23';
import CountDown24 from '../components/Billing/CountDownSVGs/CountDown24';
import CountDown25 from '../components/Billing/CountDownSVGs/CountDown25';
import CountDown26 from '../components/Billing/CountDownSVGs/CountDown26';
import CountDown27 from '../components/Billing/CountDownSVGs/CountDown27';
import CountDown28 from '../components/Billing/CountDownSVGs/CountDown28';
import CountDown29 from '../components/Billing/CountDownSVGs/CountDown29';
import CountDown30 from '../components/Billing/CountDownSVGs/CountDown30';
import CountDown31 from '../components/Billing/CountDownSVGs/CountDown31';
import { Utils } from '../services/utils';
import { Sorting } from '../services/sorting';
import {
	INVOICE_SUMMARY_HEADERS,
	INVOICE_DETAIL_HEADERS,
	INVOICE_ICONS,
	INVOICE_STATUS,
} from '../containers/Billing2.0/BillingConstants';

export const FILTERS = {
	ALL: 'All Invoices',
	CURRENT: Sorting.getMonth(new Date()),
	LAST3: Sorting.getPrev3Months(new Date()),
	PAID: 'Paid',
	UNPAID: 'Unpaid',
};

export const SORT_OPTIONS = {
	INVOICE_DATE_DESC: 'Invoice Date (Des)',
	INVOICE_DATE_ASC: 'Invoice Date (Asc)',
	DUE_DATE_DESC: 'Due Date (Des)',
	DUE_DATE_ASC: 'Due Date (Asc)',
	INVOICE_NUM_DESC: 'Invoice # (Des)',
	INVOICE_NUM_ASC: 'Invoice # (Asc)',
};

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/billing`;
const config = {
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
};

const billingNumbers = [
	<CountDown1 />,
	<CountDown2 />,
	<CountDown3 />,
	<CountDown4 />,
	<CountDown5 />,
	<CountDown6 />,
	<CountDown7 />,
	<CountDown8 />,
	<CountDown9 />,
	<CountDown10 />,
	<CountDown11 />,
	<CountDown12 />,
	<CountDown13 />,
	<CountDown14 />,
	<CountDown15 />,
	<CountDown16 />,
	<CountDown17 />,
	<CountDown18 />,
	<CountDown19 />,
	<CountDown20 />,
	<CountDown21 />,
	<CountDown22 />,
	<CountDown23 />,
	<CountDown24 />,
	<CountDown25 />,
	<CountDown26 />,
	<CountDown27 />,
	<CountDown28 />,
	<CountDown29 />,
	<CountDown30 />,
	<CountDown31 />,
];

export class BillingApi {
	static getCountDownNumber(number) {
		return billingNumbers[number];
	}
	retrieveIPParams() {
		const url = 'https://api.ipify.org';
		return axios.get(url);
	}

	static submitPayment = params => {
		const url = `${BASE_URL.replace('/billing', '')}/payment/`;

		return axios.post(url, params, config);
	};

	getAll(params) {
		const url = `${BASE_URL}/invoices`;
		if (!params) {
			params = '';
		}
		return axios.post(url, params, config).then(response => {
			return this.filterAll(response);
		});
	}

	filterAll(response) {
		const invoices = response.data.invoices;
		for (const invoice of invoices) {
			const filteredTransactions = [];
			for (const transaction of invoice.transactions) {
				if (
					transaction.transactionType === 'Payment' ||
					transaction.transactionType === 'Full refund' ||
					transaction.transactionType === 'Partial refund' ||
					transaction.transactionType === 'Reverse charge' ||
					transaction.transactionType === 'Disputed' ||
					transaction.transactionType === 'Credit' ||
					transaction.transactionType === 'Credit Card'
				) {
					transaction.amount = this.formatCurrency('' + transaction.amount);
					transaction.outstandingBalance = this.formatCurrency('' + transaction.outstandingBalance);
					transaction.invoiceTotal = this.formatCurrency('' + transaction.invoiceTotal);
					filteredTransactions.push(transaction);
				}
			}
			invoice.transactions = filteredTransactions;
		}

		invoices.sort(function(left, right) {
			const dateA = moment(left.dueDate);
			const dateB = moment(right.dueDate);

			if (dateA.isBefore(dateB)) {
				return 1;
			} else if (dateA.isAfter(dateB)) {
				return -1;
			} else {
				return 0;
			}
		});
		return response;
	}

	get(id) {
		const url = `${BASE_URL}/invoice/`;

		return axios.post(url, `${id}`, config);
	}

	getSummary() {
		const url = `${BASE_URL}/summary`;
		return axios.get(url, config);
	}

	getPayments(numberOfPayments) {
		const url = `${BASE_URL}/payments/${numberOfPayments !== undefined ? numberOfPayments : ''}`;
		return axios.get(url, config);
	}

	viewPdfInPanel(pdf) {
		const blob = this.getPdfBlob(pdf);
		const fileUrl = URL.createObjectURL(blob);

		return fileUrl;
	}

	downloadPdf(pdf, invoiceId) {
		// Set filename
		const filename = `Invoice-${invoiceId}.pdf`;
		const blob = this.getPdfBlob(pdf);

		// Create temporary element to simulate clicking a download link
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	getPdfBlob(pdf) {
		// Set filename
		// let filename = "invoice.pdf";

		// Convert Base64 PDF to ArrayBuffer
		const binary = atob(pdf.replace(/\s/g, ''));
		const length = binary.length;
		const buffer = new ArrayBuffer(length);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < length; i++) {
			view[i] = binary.charCodeAt(i);
		}

		// Create Blob from ArrayBuffer
		const blob = new Blob([view], { type: 'application/pdf' });

		return blob;
	}

	formatDate(date) {
		let formattedDate = ' - ';

		if (date) {
			/* Match YYYY-MM-DD date format */
			const incomingDateFormat = /([\d]{4})-([\d]{2})-([\d]{2})/;
			const dateMatch = incomingDateFormat.exec(date);

			if (dateMatch) {
				/* Only represent two digit year */
				const year = dateMatch[1].substr(2);
				formattedDate = `${dateMatch[2]}.${dateMatch[3]}.${year}`;
			}
		}
		return formattedDate;
	}
	formatCurrency(amount) {
		if (amount && amount === 'PAID') {
			return amount;
		} else if (amount) {
			let amountWithoutCommas = amount;
			if (typeof amountWithoutCommas === 'string') {
				amountWithoutCommas = amountWithoutCommas.replace(',', '');
			}

			return Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amountWithoutCommas);
		}
	}
}

export class BillingUtils {
	static massageData = (data, headers) => {
		return data.map(invoice => {
			const formattedTransactions = invoice.transactions.map(txn => ({
				...txn,
				effectiveDate: Utils.formatInvoiceDate(txn.effectiveDate),
			}));

			const newObj = { transactions: formattedTransactions };

			Object.keys(headers).forEach(
				header => (newObj[header] = BillingUtils.formatting(header, invoice[header])),
			);

			if (invoice['status'] === 'Overdue') {
				newObj['hasAlert'] = true;
			}

			const amountDue = parseInt(invoice['amountDue']);

			if (amountDue === 0.0) {
				newObj['amountDue'] = 'PAID';
			}

			newObj['status'] = invoice.status;
			newObj['invoiceId'] = invoice.invoiceId;
			newObj['billCycle'] = invoice.billCycle;
			newObj['theme'] = BillingUtils.getInvoiceTheme(invoice);
			newObj['summaryHeaders'] = BillingUtils.getHeaders(newObj);
			newObj['detailHeaders'] = INVOICE_DETAIL_HEADERS;

			return newObj;
		});
	};

	static getHeaders = record => {
		if (record.hasAlert) {
			const customHeaders = { ...INVOICE_SUMMARY_HEADERS };
			customHeaders['amountDue'] = 'Due Today';
			// customHeaders['amountDue'] = 'Amount Due Today';

			return customHeaders;
		} else {
			return INVOICE_SUMMARY_HEADERS;
		}
	};

	static formatting(type, data) {
		switch (type) {
			case 'billcycle':
				return Utils.formatInvoiceDate(data);
			case 'dueDate':
				return Utils.formatInvoiceDate(data);
			case 'effectiveDate':
				return Utils.formatInvoiceDate(data);
			case 'amountDue':
				return new BillingApi().formatCurrency(data);
			case 'invoiceAmount':
				return new BillingApi().formatCurrency(data);
			case 'invoiceNumber':
				return `#${data}`;
			default:
				return data;
		}
	}

	static getInvoiceTheme(invoice) {
		switch (invoice.status) {
			case INVOICE_STATUS.PAID:
				return { icon: INVOICE_ICONS[INVOICE_STATUS.PAID], bannerColor: 'purple' };
			case INVOICE_STATUS.DUE:
				return { icon: INVOICE_ICONS[INVOICE_STATUS.DUE], bannerColor: 'blue' };
			case INVOICE_STATUS.PAST_DUE:
				return { icon: INVOICE_ICONS[INVOICE_STATUS.PAST_DUE], bannerColor: 'orange' };
			default:
				return { icon: INVOICE_ICONS[INVOICE_STATUS.DUE], bannerColor: 'blue' };
		}
	}

	static getLastThreeInvoices(invoices) {
		const tempInvoices = [...invoices];
		const sortedInvoices = BillingUtils.sort(tempInvoices);

		return sortedInvoices.slice(0, 3);
	}

	static sort(invoices) {
		return invoices.sort((a, b) => {
			const a_date = moment(a.billcycle, 'MM.DD.YY');
			const b_date = moment(b.billcycle, 'MM.DD.YY');

			if (moment(a_date) < moment(b_date)) {
				return 1;
			}

			if (moment(a_date) > moment(b_date)) {
				return -1;
			}

			return 0;
		});
	}

	static sortDueDate(data) {
		return data.sort((a, b) => {
			const a_date = moment(a.dueDate, 'MM.DD.YY');
			const b_date = moment(b.dueDate, 'MM.DD.YY');

			if (moment(a_date) < moment(b_date)) {
				return 1;
			}

			if (moment(a_date) > moment(b_date)) {
				return -1;
			}

			return 0;
		});
	}

	static sortByDate = sortField => (a, b) => {
		const a_date = moment(a[sortField], 'MM.DD.YY');
		const b_date = moment(b[sortField], 'MM.DD.YY');

		if (b_date.isBefore(a_date)) {
			return 1;
		} else if (a_date.isBefore(b_date)) {
			return -1;
		}

		return 0;
	};

	static sortByNum = field => (a, b) => {
		const leftNum = a[field].replace(/#/, '');
		const rightNum = b[field].replace(/#/, '');

		if (leftNum > rightNum) {
			return 1;
		} else if (rightNum > leftNum) {
			return -1;
		}

		return 0;
	};

	static filterList2(data, filter = 'All Invoices') {
		if (!data) {
			return [];
		}

		const currMonth = moment().month();
		switch (filter) {
			case FILTERS.ALL:
				return data;
			case FILTERS.CURRENT:
				return data.filter(invoice => moment(invoice.billcycle).month() === currMonth);
			case FILTERS.LAST3:
				const lastThreeMonths = [
					currMonth - 2 < 0 ? 12 + (currMonth - 2) : currMonth - 2,
					currMonth - 1 < 0 ? 12 + (currMonth - 1) : currMonth - 1,
					currMonth,
				];
				return data.filter(invoice => {
					const invoiceMonth = moment(invoice.billcycle).month();
					return lastThreeMonths.includes(invoiceMonth);
				});
			case FILTERS.PAID:
				return data.filter(invoice => invoice.status === 'Paid');
			case FILTERS.UNPAID:
				return data.filter(invoice => invoice.status === 'Overdue' || invoice.status === 'Due');
			default:
				return data;
		}
	}

	static filterList(selected, data, currentMonth, prev3Months, latestFilteredData) {
		if (selected && data.length) {
			const filterVoid = data.filter(invoice => invoice.status !== 'Void');
			let filteredList;
			data = filterVoid;
			switch (selected) {
				case 'All Invoices':
					if (data.length > 0) {
						filteredList = BillingUtils.billingSort(selected, data, latestFilteredData);
					} else {
						filteredList = data;
					}
					break;
				case currentMonth:
					const monthIndex = Sorting.getMonthIndex(new Date()) + 1;
					const oneMonthInvoices = data.filter(invoice => {
						let currentYear = new Date().getFullYear();
						currentYear = currentYear.toString().split('20')[1];
						const year = invoice.billcycle.split('.')[2];
						let month = '';
						if (year === currentYear) {
							month = invoice.billcycle.split('.')[0];
						}
						return monthIndex === +month;
					});

					if (oneMonthInvoices.length > 0) {
						filteredList = BillingUtils.billingSort(selected, oneMonthInvoices);
					} else {
						filteredList = oneMonthInvoices;
					}

					break;
				case prev3Months:
					const monthIndex2 = Sorting.getMonthIndex(new Date());
					const threeMonths = Sorting.getPreviousThreeMonths(monthIndex2, data);

					if (threeMonths.length > 0) {
						filteredList = BillingUtils.billingSort(selected, threeMonths);
					} else {
						filteredList = threeMonths;
					}

					break;
				case 'Paid':
					const paid = data.filter(invoice => invoice.status === 'Paid');

					if (paid.length > 0) {
						filteredList = BillingUtils.billingSort(selected, paid);
					} else {
						filteredList = paid;
					}

					break;
				case 'Unpaid':
					const unpaid = data.filter(
						invoice => invoice.status === 'Overdue' || invoice.status === 'Due',
					);

					if (unpaid.length > 0) {
						filteredList = BillingUtils.billingSort(selected, unpaid);
					} else {
						filteredList = unpaid;
					}
					break;
				default:
					filteredList = data;
					break;
			}

			return filteredList;
		}
	}

	static billingSort2(data, sortParam) {
		if (!data) {
			return [];
		}

		let field;
		if (sortParam === SORT_OPTIONS.INVOICE_NUM_ASC || sortParam === SORT_OPTIONS.INVOICE_NUM_DESC) {
			field = 'invoiceNumber';
		} else if (
			sortParam === SORT_OPTIONS.INVOICE_DATE_ASC ||
			sortParam === SORT_OPTIONS.INVOICE_DATE_DESC
		) {
			field = 'billcycle';
		} else {
			field = 'dueDate';
		}

		switch (sortParam) {
			case SORT_OPTIONS.INVOICE_DATE_ASC:
			case SORT_OPTIONS.DUE_DATE_ASC:
				return data.sort(BillingUtils.sortByDate(field));
			case SORT_OPTIONS.INVOICE_DATE_DESC:
			case SORT_OPTIONS.DUE_DATE_DESC:
				return data.sort(BillingUtils.sortByDate(field)).reverse();
			case SORT_OPTIONS.INVOICE_NUM_ASC:
				return data.sort(BillingUtils.sortByNum(field));
			case SORT_OPTIONS.INVOICE_NUM_DESC:
				return data.sort(BillingUtils.sortByNum(field)).reverse();
			default:
				return data.sort(BillingUtils.sortByNum(field));
		}
	}

	static billingSort(selected, data, latestFilteredData) {
		let sortedArray;
		if (latestFilteredData) {
			data = latestFilteredData;
		}

		if (selected && data && data.length) {
			switch (selected) {
				case 'Invoice Date (Asc)':
					sortedArray = BillingUtils.sort(data).reverse();
					break;
				case 'Invoice Date (Des)':
					sortedArray = BillingUtils.sort(data);

					break;
				case 'Due Date (Asc)':
					sortedArray = BillingUtils.sortDueDate(data).reverse();

					break;
				case 'Due Date (Des)':
					sortedArray = BillingUtils.sortDueDate(data);

					break;
				case 'Invoice # (Asc)':
					sortedArray = data.sort((a, b) => {
						return a.invoiceNumber.split('#')[1] - b.invoiceNumber.split('#')[1];
					});
					break;
				case 'Invoice # (Des)':
					sortedArray = data
						.sort((a, b) => {
							return a.invoiceNumber.split('#')[1] - b.invoiceNumber.split('#')[1];
						})
						.reverse();

					break;
				default:
					sortedArray = data;
					break;
			}
			return sortedArray;
		}
	}
}

export const sampleMemberships = [
	{
		organization_id: '12345',
		organization_name: 'DC Blox',
		organization_icon: '',
		role: 'member',
		services: [
			{
				service_id: '10',
				name: 'support',
				ref: '10-00-0000',
				route: '/portal/support',
				attributes: {
					theme: 'DCBLOX_purple',
				},
				location: {
					'1024': ['20', '20'],
					'1440': ['20', '20'],
					'2560': ['20', '24'],
				},
				pages: [
					{
						name: 'Overview',
						id: '10',
						status: 'active',
						route: '/portal/support/overview',
						ref: '10-10-0000',
						order: 1,
					},
					{
						name: 'Ticket History',
						id: '10',
						status: 'active',
						route: '/portal/support/history',
						ref: '10-20-0000',
						order: 1,
					},
				],
			},
			{
				service_id: '20',
				name: 'profile',
				ref: '20-00-0000',
				route: '/portal/profile',
				attributes: {
					theme: 'DCBLOX_blue',
				},
				location: {
					'1024': ['20', '20'],
					'1440': ['20', '20'],
					'2560': ['20', '24'],
				},
			},
			{
				service_id: '30',
				name: 'billing',
				ref: '30-00-0000',
				route: '/portal/billing',
				attributes: {
					theme: 'DCBLOX_green',
				},
				location: {
					'1024': ['20', '20'],
					'1440': ['20', '20'],
					'2560': ['20', '24'],
				},
			},
			{
				service_id: '40',
				name: 'storage',
				ref: '40-00-0000',
				route: '/portal/storage',
				attributes: {
					theme: 'DCBLOX_blue',
				},
				location: {
					'1024': ['20', '20'],
					'1440': ['20', '20'],
					'2560': ['20', '24'],
				},
			},
			{
				service_id: '40',
				name: 'online_payments',
				ref: '40-00-0000',
				route: '/portal/storage',
				attributes: {
					theme: 'DCBLOX_blue',
				},
				location: {
					'1024': ['20', '20'],
					'1440': ['20', '20'],
					'2560': ['20', '24'],
				},
			},
		],
	},
];

export class Sorting {
	static getMonth = date => {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const monthIndex = date.getMonth();

		return monthNames[monthIndex];
	};

	static getMonthIndex = date => {
		const monthIndex = date.getMonth();
		return monthIndex;
	};

	static getPrev3Months = date => {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const monthIndex = date.getMonth();
		let dates = '';

		if (monthIndex > 3) {
			dates = monthNames[monthIndex - 3] + ' - ' + monthNames[monthIndex - 1];
		} else if (monthIndex === 0) {
			dates = 'Oct -  Dec';
		} else if (monthIndex === 1) {
			dates = 'Nov - Jan';
		} else if (monthIndex === 2) {
			dates = 'Dec - Feb';
		} else {
			dates = 'Jan - Mar';
		}

		return dates;
	};

	static getPreviousThreeMonths = (monthIndex, data) => {
		let currentYear = new Date().getFullYear();
		let previousYear = currentYear - 1;
		currentYear = currentYear.toString().split('20')[1];
		previousYear = previousYear.toString().split('20')[1];

		if (monthIndex === 1) {
			// nov dec jan
			const one = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex === +month;
				}
			});

			const two = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === previousYear) {
					return 11 === +month;
				}
			});

			const three = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === previousYear) {
					return 12 === +month;
				}
			});

			const previous3Months = one.concat(two, three);
			return previous3Months;
		} else if (monthIndex >= 3) {
			const one = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex === +month;
				}
			});

			const two = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex - 1 === +month;
				}
			});

			const three = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex - 2 === +month;
				}
			});

			const previous3Months = one.concat(two, three);
			return previous3Months;
		} else if (monthIndex === 2) {
			const one = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex === +month;
				}
			});

			const two = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === currentYear) {
					return monthIndex - 1 === +month;
				}
			});

			const three = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === previousYear) {
					return 12 === +month;
				}
			});

			const previous3Months = one.concat(two, three);
			return previous3Months;
		} else if (monthIndex === 0) {
			const one = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('-')[2];
				if (year === previousYear) {
					return 12 === +month;
				}
			});

			const two = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === previousYear) {
					return 11 === +month;
				}
			});

			const three = data.filter(invoice => {
				const month = invoice.billcycle.split('.')[0];
				const year = invoice.billcycle.split('.')[2];
				if (year === previousYear) {
					return 10 === +month;
				}
			});

			const previous3Months = one.concat(two, three);
			return previous3Months;
		}
	};
}

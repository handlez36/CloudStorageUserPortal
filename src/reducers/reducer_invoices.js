const initState = {
	customerid: null,
};

export default function getInvoices(state = initState, action) {
	switch (action.type) {
		case 'FETCH_INVOICES':
			Object.assign({}, state, {
				invoices: action.invoices,
			});
	}
}

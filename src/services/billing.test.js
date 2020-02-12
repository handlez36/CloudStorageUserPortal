import { BillingApi } from './billing';

describe('billing services component', () => {
    let invoices;
    let billing;
    const AMOUNT_TO_RETURN = 4;

    beforeAll( () => {
        billing = new BillingApi();
        invoices = 
        [
            { invoice: 0, amt_due: 500.00 },
            { invoice: 1, amt_due: 500.00 },
            { invoice: 2, amt_due: 500.00 },
            { invoice: 3, amt_due: 500.00 },
            { invoice: 4, amt_due: 500.00 }
        ]
        
    })
    
    /**
     * Test getNextInvoices method
     */
    describe('#getNextFour', () => {

        it('returns ids of next 3 invoices starting at invoice 1 ', () => {
            const expected = [ 1, 2, 3, 4 ];
            const returned = billing.getNextFour(invoices, 0, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns ids of next 3 invoices starting at invoice 2 ', () => {
            const expected = [ 2, 3, 4, 0 ];
            const returned = billing.getNextFour(invoices, 1, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns invoices starting with ids from the beginning when exceeding invoice length', () => {
            const expected = [ 4, 0, 1, 2 ];
            const returned = billing.getNextFour(invoices, 3, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns 2 invoices instead of 4 if only 2 invoices exist', () => {
            const coupleOfInvoices  = invoices.slice(0, 2);
            const expected          = [1, 0];
            const returned          = billing.getNextFour(coupleOfInvoices, 0, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });
    });

    /**
     * Test getPrevInvoices method
     */
    describe('#getPrevFour', () => {

        it('returns ids of previous 4 invoices starting at invoice 4', () => {
            const expected = [ 3, 4, 0, 1 ];
            const returned = billing.getPrevFour(invoices, 4, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns ids of next 3 invoices starting at invoice 2 ', () => {
            const expected = [ 2, 3, 4, 0 ];
            const returned = billing.getPrevFour(invoices, 3, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns invoices starting with ids from the end when moving past the first invoice', () => {
            const expected = [ 1, 2, 3, 4 ];
            const returned = billing.getPrevFour(invoices, 2, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });

        it('returns 2 invoices instead of 4 if only 2 invoices exist', () => {
            const coupleOfInvoices  = invoices.slice(0, 2);
            const expected          = [0, 1];
            const returned          = billing.getPrevFour(coupleOfInvoices, 1, AMOUNT_TO_RETURN);

            expect(returned).toEqual(expected);
        });
    });
});
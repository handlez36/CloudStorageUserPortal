import { Utils } from './utils';

describe('getNextRowFromList', () => {
    const AMOUNT_TO_RETURN  = 3;
    let list;

    beforeAll( () => {
        list = 
        [
            { id: 0 },
            { id: 1 },
            { id: 2 },

            { id: 3 },
            { id: 4 },
            { id: 5 },

            { id: 6 },
            { id: 7 }
        ]
        
    })

    describe('cycling forward', () => {
      it('returns ids of next 3 invoices starting at invoice 3 ', () => {
        const expected = [ [ {id: 3}, {id: 4}, {id: 5} ], [ {id: 6}, {id: 7} ] ];
        const returned = Utils.getNextRowFromList(list, 0, AMOUNT_TO_RETURN, false, 3);

        expect(returned).toEqual(expected);
      });

      it('returns ids of next 3 invoices starting at invoice 6 ', () => {
          const expected = [ [ {id: 6}, {id: 7} ], [ {id: 0}, {id: 1}, {id: 2} ] ];
          const returned = Utils.getNextRowFromList(list, 3, AMOUNT_TO_RETURN, false, 3);

          expect(returned).toEqual(expected);
      });

      it('returns ids of next 3 invoices starting at invoice 0 ', () => {
          const expected = [ [ {id: 0}, {id: 1}, {id: 2} ], [ {id: 3}, {id: 4}, {id: 5} ] ];
          const returned = Utils.getNextRowFromList(list, 6, AMOUNT_TO_RETURN, false, 3);

          expect(returned).toEqual(expected);
      });
    });

    describe('cycling backward', () => {
      it('returns ids of next 3 invoices starting at invoice 3 ', () => {
        const expected = [ [ {id: 6}, {id: 7} ], [ {id: 0}, {id: 1}, {id: 2} ] ];
        const returned = Utils.getNextRowFromList(list, 0, AMOUNT_TO_RETURN, false, 3, 'prev');

        expect(returned).toEqual(expected);
      });

      it('returns ids of next 3 invoices starting at invoice 3 ', () => {
        const expected = [ [ {id: 0}, {id: 1}, {id: 2} ], [ {id: 3}, {id: 4}, {id: 5} ] ];
        const returned = Utils.getNextRowFromList(list, 3, AMOUNT_TO_RETURN, false, 3, 'prev');

        expect(returned).toEqual(expected);
      });

      it('returns ids of next 3 invoices starting at invoice 3 ', () => {
        const expected = [ [ {id: 3}, {id: 4}, {id: 5} ], [ {id: 6}, {id: 7} ] ];
        const returned = Utils.getNextRowFromList(list, 6, AMOUNT_TO_RETURN, false, 3, 'prev');

        expect(returned).toEqual(expected);
      });


    });
});
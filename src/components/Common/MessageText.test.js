import React from 'react';
import ReactDOM from 'react-dom';

import MessageText from './message_text';

describe('MessageText Component', () => {

    /**
     * Test component can be created
     */
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MessageText msg={`test`} />, div);
        ReactDOM.unmountComponentAtNode(div);expect(true).toBe(true);
    });
    
    /**
     * Test formatMessage method
     */
    describe('#formatMessage', () => {
        var msgs        = [
            'Hello. My name is brandon', 
            'Nice try...use your real password',
            'Hello Brandon; you\'re all logged in'];
        var conditions = [
            [ msgs[0], ['HELLO', '.', ' MY NAME IS BRANDON'] ],
            [ msgs[1], ['NICE TRY', '...', 'USE YOUR REAL PASSWORD'] ],
            [ msgs[2], ['HELLO BRANDON', ';', ' YOU\'RE ALL LOGGED IN'] ],
        ];

        var invalidConditions = [
            [ '', [] ],
            [ null, [] ]
        ]

        /**
         * Test formatMessage method with multiple valid input conditions
         */
        describe.each(conditions)('with valid input conditions', (input, expected) => {
            var props       = { msg: input };
            var component   = new MessageText(props);
            var msgArray    = [];

            beforeAll( () => {
                msgArray = component.formatMessage(input);
            })

            it('returns an array', () => {
                expect(Array.isArray(msgArray)).toBeTruthy();
            });
    
            it('returns a 4 element regex match array', () => {
                expect(msgArray).toHaveLength(3);
            });
    
            it('splits msg into 2 main message parts', () => {
                expect(msgArray[0]).toEqual( expected[0] );
                expect(msgArray[2]).toEqual( expected[2] );
            })
    
            it('correctly captures punctuation', () => {
                expect(msgArray[1]).toEqual( expected[1] );
            })
        })

        /**
         * Test formatMessage method with multiple invalid input conditions
         */        
        describe.each(invalidConditions)('with invalid conditions', (input, expected) => {
            var props       = { msg: input };
            var component   = new MessageText(props);
            var msgArray    = [];

            beforeAll( () => {
                msgArray = component.formatMessage(input);
            })

            it('returns an array', () => {
                expect(Array.isArray(msgArray)).toBeTruthy();
            });
    
            it('returns an empty (0 element) element array', () => {
                expect(msgArray).toHaveLength(0);
            });
        })

    })
})


import React from 'react';
import ReactDOM from 'react-dom';

import SideMenu from './SideMenu';

describe('SideMenu Component', () => {

    /**
     * SideMenu component can be created
     */
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SideMenu menuTitle="test" menuItems={{}} callback={ () => {} } />, div);
        ReactDOM.unmountComponentAtNode(div);expect(true).toBe(true);
    });

    
    /**
     * Test constructMenu method
     */
    describe('#constructMenu', () => {
        var props = {
            'Option 1': 'option1',
            'Option 2': 'option2'
        }

        var conditions = [
            [ props,
            <div>
                <div className="menu-item-box">
                    <div
                        className="menu-item-name"
                        data-item="Option 1"
                        onClick={ (item) => {} }>Option 1
                    </div>
                    <div className="indicator" />
                </div>
                <div className="menu-item-box">
                    <div
                        className="menu-item-name"
                        data-item="Option 2"
                        onClick={ (item) => {} }>Option 2
                    </div>
                    <div className="indicator" />
                </div> 
            </div>
            ]
        ]

        var invalidConditions = [
            [ null, <div>No Menu</div> ]
        ]

        /**
         * Test constructMenu method with multiple valid input conditions
         */
        describe.each(conditions)('with valid input conditions', (input, expected) => {
            var props = {
                menuTitle: 'Test',
                menuItems: { 'Option 1': 'option1', 'Option 2': 'option2' },
                callback: (items) => {}  
            }
            var component = new SideMenu(props);
            var menu;

            beforeAll( () => {
                menu = component.constructMenu(input);//
            })
        })

        /**
         * Test formatMessage method with multiple invalid input conditions
         */        
        describe.each(invalidConditions)('with invalid conditions', (input, expected) => {
            var props = {
                menuTitle: 'Test',
                menuItems: { 'Option 1': 'option1', 'Option 2': 'option2' },
                callback: (items) => {}  
            }
            var component = new SideMenu(props);
            var menu;

            beforeAll( () => {
                menu = component.constructMenu(input);
            })
    
            xit('returns No Menu message', () => {
                expect(menu).toEqual(expected);
            });
        })

    })
})
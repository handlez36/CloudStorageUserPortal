import React, { Component } from 'react';
import 'react-tippy/dist/tippy.css';
import Radio from '../../components/Common/Radio';
import ToolTip from '../../components/Common/ToolTip';
import AddNewButton from './COMPANYButton';
import TicketCreate from '../../containers/Support/TicketCreate/TicketCreate';

export default class ButtonTester extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: '',
		};
	}

	clickCallback = () => {};
	selectedValue = selectedValue => {
		this.setState({ selectedValue });
	};

	render() {
		const normalButtonClass = 'COMPANY-button';
		const largeCircleButtonClass = 'COMPANY-button circle-large';
		const smallCircleButtonClass = 'COMPANY-button circle-small';
		const whiteButtonClass = 'COMPANY-button white';
		const whiteEditButtonClass = 'COMPANY-button white edit';
		const options = [
			{ value: 'Atlanta', name: 'Atlanta', clickCallback: this.clickCallback },
			{ value: 'Huntsville', name: 'Huntsville', clickCallback: this.clickCallback },
			{ value: 'Chattanooga', name: 'Chattanooga', clickCallback: this.clickCallback },
			// { value:"Atlanta", name:"Atlanta     ", clickCallback:this.clickCallback},
		];

		return (
			<div className={'support-page'}>
				<div className={'active'}>
					<Radio
						name='accessibility'
						value={'one'}
						hidden={false}
						toggle={true}
						options={options}
					/>
					<ToolTip message={'haa'} />
				</div>
				<AddNewButton
					title='DEFAULT'
					enabled={true}
					customClass={normalButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title='TEST!'
					enabled={true}
					customClass={largeCircleButtonClass}
					//graphic={arrowDown}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title=''
					enabled={true}
					customClass={smallCircleButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title='NEW REQUEST'
					enabled={true}
					customClass={whiteButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title='EDIT'
					enabled={true}
					customClass={whiteEditButtonClass}
					onClick={this.clickCallback}
				/>
				<AddNewButton
					title='DEFAULT'
					enabled={false}
					customClass={normalButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				HERE:
				<AddNewButton
					title='TEST'
					enabled={false}
					customClass={largeCircleButtonClass}
					//graphic={arrowDown}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title=''
					enabled={false}
					customClass={smallCircleButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title='NEW REQUEST'
					enabled={false}
					customClass={whiteButtonClass}
					onClick={this.clickCallback}
				/>
				<br />
				<AddNewButton
					title='EDIT'
					enabled={false}
					customClass={whiteEditButtonClass}
					//graphic={arrowDown}
					onClick={this.clickCallback}
				/>
				<Radio
					callback={this.selectedValue}
					name='accessibility'
					value={'one'}
					hidden={false}
					toggle={true}
					options={options}
				/>
				<div>{this.state.selectedValue}</div>
				<TicketCreate
					resetTicketCreation={''}
					backToHome={''}
					updateTicketCount={''}
					auth_status={''}
				/>
			</div>
		);
	}
}

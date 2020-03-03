import React, { Component, Fragment } from 'react';
import { Netmask } from 'netmask';

// import { Responsive, WidthProvider } from 'react-grid-layout';
// import BloxGrid from './Layout/BloxGrid';
// import CrossGrid from './Layout/CrossGrid';
// import SandboxGrid from './SandboxGrid';
// import MicroGrid from './Layoutv3/BloxMicroGrid';
// import SampleGridContent from './SampleGridContent';
// import TestComponent from './../components/Layout/TestContent';
import PortalLayout from './../../sub_components/Layout/PortalLayout';
import AccountsComponent from './../../sub_components/Layout/Header/AccountsComponent';
// import { Utils, SIDES } from './../../services/utils';
// import ColumnSide from './Navigationv3/ColumnSide';
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import WhiteListContainer from '../containers/Storage/Components/WhiteListContainer';
// import UploadSection from '../components/Common/UploadSection';

const TestInnerContent = props => {
	// return <div key='card-inner-content' className='card-inner-content' />;
	// return <div key='card1' className='sample-card-1' />;
	return <div className='test-inner-content'>HI</div>;
};

export default class Sandbox extends Component {
	state = {
		wrapperScrollHeight: 0,
		wrapperClientHeight: 0,
		input: '',
		testinput: '',
		textarea1: '',
		filter: '',
		radio: 'Atlanta',
		on: true,
		selected: 'DAY',
	};

	sortArrow = option => {
		if (option === true) {
			this.setState({ filter: 'Ascending' });
		} else if (option === false) {
			this.setState({ filter: 'Descending' });
		}
	};
	getPackage = type => {
		let totalCommitment;
		const packages = data.packages;
		if (packages.length) {
			totalCommitment = packages.filter(storagePackage => storagePackage.storageType === type);

			return totalCommitment[0];
		}
	};

	callback = (entry, wrapper) => {
		this.setState({ wrapperScrollHeight: wrapper.scrollHeight });
		this.setState({ wrapperClientHeight: wrapper.clientHeight });
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	clickhandler = () => {
		console.log('hello');
	};

	onRadioButtonChange = radio => {
		this.setState({ radio });
	};

	onChange3 = location => {
		console.log(location);
	};

	testNetworkJSPackage = () => {
		const block = new Netmask('10.10.10.195/26');
		const block2 = new Netmask('192.10.1.0/24');
		console.log('**** NETMASK TEST ****');
		// console.log(
		// 	`10.10.10.195/26 --> ${block.forEach((ip, long, index) => {
		// 		console.log(`IP: ${ip}`);
		// 		console.log(`Long: ${long}`);
		// 		console.log(`Index: ${index}`);
		//   })}`,
		// );
		console.log(`Working with ${block2}`);
		console.log(`Base: ${block2.base}`);
		console.log(`Valid network id: ${block2.base === block2.toString().replace(/\/\d+/, '')}`);
		console.log('**********************');
	};

	// componentDidMount() {
	// 	const { gradientLine, percentage } = Utils.calculateGradientPath(
	// 		'top-diamond',
	// 		'bottom-diamond',
	// 		SIDES.RIGHT,
	// 	);
	// 	console.log('Gradient Line: ', gradientLine);
	// 	console.log('Percentage: ', percentage);
	// }

	drawFirst48 = () => {
		const divs = [];
		for (let i = 0; i < 48; i++) {
			divs.push(<div key={`col${i + 1}`} className='vertical-column' />);
		}

		return divs;
	};

	drawSecond48 = () => {
		const divs = [];
		for (let i = 0; i < 48; i++) {
			divs.push(<div key={`bcol${i + 1}`} className='vertical-column' />);
		}

		return divs;
	};

	drawFirstRows = () => {
		const rows = [];
		for (let i = 0; i < 10; i++) {
			// for (let i = 0; i < 1; i++) {
			rows.push(<div key={`row${i + 1}`} className='horizontal-column' />);
		}

		return rows;
	};

	render() {
		const nofunc = () => {};
		const content =
			"Lorem Ipsum has been the industry's standard dummy text ever" +
			'since the 1500s, when an unknown printer took a galley of type' +
			' and scrambled it to make a type specimen book. It has survived not ' +
			'only five centuries, but also the leap into electronic typesetting, ' +
			'remaining essentially unchanged. It was popularised in the 1960s with ' +
			'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			'recently with desktop publishing software like Aldus PageMaker including ' +
			'versions of Lorem Ipsum.' +
			'remaining essentially unchanged. It was popularised in the 1960s with ' +
			'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			'recently with desktop publishing software like Aldus PageMaker including ' +
			'versions of Lorem Ipsum.' +
			// 'remaining essentially unchanged. It was popularised in the 1960s with ' +
			// 'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			// 'recently with desktop publishing software like Aldus PageMaker including ' +
			// 'versions of Lorem Ipsum.' +
			// 'remaining essentially unchanged. It was popularised in the 1960s with ' +
			// 'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			// 'recently with desktop publishing software like Aldus PageMaker including ' +
			// 'versions of Lorem Ipsum.' +
			'remaining essentially unchanged. It was popularised in the 1960s with ' +
			'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			'recently with desktop publishing software like Aldus PageMaker including ' +
			'versions of Lorem Ipsum.' +
			'remaining essentially unchanged. It was popularised in the 1960s with ' +
			'the release of Letraset sheets containing Lorem Ipsum passages, and more ' +
			'recently with desktop publishing software like Aldus PageMaker including ' +
			'versions of Lorem Ipsum.';

		const grid = [
			{ i: 'card1', x: 5, y: 5, w: 10, h: 10, static: true },
			{ i: 'card-inner-content', x: 5, y: 5, w: 2, h: 2, static: true },
		];

		return (
			<div id='sandbox'>
				{/* <ColumnSide navHeight={500} width={100} percentage={75} side='left' /> */}

				{/* <div className='menu-gradient-testing'>
					<div className='top-diamond' />
					<div className='sides'>
						<div className='left-side' />
						<div className='right-side' />
					</div>
					<div className='bottom-diamond' />
				</div> */}
			</div>
		);
	}
}

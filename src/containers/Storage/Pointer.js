import React, { Component } from 'react';

class Pointer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: 'true',
		};
	}

	getBackgroundColor = () => {
		let color;

		const { location, id } = this.props;

		switch (location) {
			case 'ATL':
				color = '#008388';
				break;
			case 'CHA':
				color = '#8060a9';
				break;
			case 'HUN':
				color = '#416ba9';
				break;
			case 'BIR':
				color = '#a8ad00';
				break;
			default:
				color = '#008388';
		}

		let pointer = document.getElementById(`${location}${id}fill`);
		console.log(pointer);
		if (pointer) {
			pointer.style.background = color;
		}
	};
	componentDidMount() {
		this.getBackgroundColor();
	}

	render() {
		const { size, location, id } = this.props;

		return (
			<div className='pointer'>
				<span className='size'>{`${size}TB`}</span>
				<div className='fill-level' id={`${location}${id}fill`} />
			</div>
		);
	}
}
export default Pointer;

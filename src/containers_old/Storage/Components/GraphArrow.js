import React, { Component } from 'react';

class GraphArrow extends Component {
	state = {
		hover: false,
	};

	onMouseEnter = () => {
		this.setState({ hover: true });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	render() {
		const { hover } = this.state;
		return (
			<div className='arrow-button'>
				<div className={`wrapper ${hover ? 'hover' : ''}`} />
				<img
					src={LeftArrow}
					onClick={() => this.updateCurrMinAndMax(DIRECTION.PREV)}
					className={`left-arrow ${leftDisabled ? 'disabled' : ''}`}
				/>
			</div>
		);
	}
}

export default GraphArrow;

import React, { Component } from 'react';

class LowResolutionoPopUp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { screenWidth, screenHeight } = this.props;
		return (
			<div className='low-res-container'>
				<div className='text header20'>
					{`We're sorry, but this site cannot be displayed at at your current screen resolution.  A minimum resolution of  930 x 400 is required to use this site. 
                 Your current screen resolution is ${screenWidth} x ${screenHeight}.`}
				</div>
			</div>
		);
	}
}
export default LowResolutionoPopUp;

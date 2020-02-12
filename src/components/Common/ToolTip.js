import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const icon = `${CDN_URL}common/Common_Tool_Tip_Icon.svg`;

class ToolTip extends React.Component {
	constructor(props) {
		super(props);
		// initial gender state set from props
		this.state = {};
	}

	render() {
		const { message } = this.props;
		return (
			<div className='tool-tip'>
				<img src={icon} />
				<span className='tooltiptext'>{message}</span>
			</div>
		);
	}
}

export default ToolTip;

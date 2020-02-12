import React, { Component } from 'react';

export default class IconInputComponent extends Component {
	render() {
		const { icon, classes, children } = this.props;

		return (
			<div className={`icon-input-component ${classes}`}>
				<div className='icon-section'>{icon && <img src={icon} alt='icon' />}</div>
				<div className='details-section'>{children}</div>
			</div>
		);
	}
}

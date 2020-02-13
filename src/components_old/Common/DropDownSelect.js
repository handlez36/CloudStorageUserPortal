import React, { Component } from 'react';

export default class DropDownSelect extends Component {
	render() {
		let { options, className } = this.props;

		return (
			<select className={className}>
				<option key={`dd-${'none'}`}> - </option>
				{options.map(option => (
					<option key={`dd-${option.value}`} value={option.value}>
						{option.displayValue || option.value}
					</option>
				))}
			</select>
		);
	}
}

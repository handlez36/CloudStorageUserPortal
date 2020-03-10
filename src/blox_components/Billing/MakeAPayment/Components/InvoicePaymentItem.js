import React, { Component } from 'react';
import { string, array } from 'prop-types';

import Field from 'components_old/Common/AccordianField';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const SelectedIcon = `${CDN_URL}billing/forms-checkbox-filled.svg`;
const UnselectedIcon = `${CDN_URL}billing/forms-checkbox-empty.svg`;

class InvoicePaymentItem extends Component {
	onClick = event => {
		event.stopPropagation();
		this.props.onSelect();
	};
	render() {
		const { data, icon, selected } = this.props;

		return (
			<div className={`invoice-payment-item ${selected ? 'selected' : 'unselected'}`}>
				<div className='icon'>
					<div className={`selected-checkbox ${selected ? 'selected' : 'unselected'}`}>
						<img src={selected ? SelectedIcon : UnselectedIcon} />
					</div>
					<img src={icon} />
				</div>
				<div className='details' onClick={this.onClick}>
					{data &&
						data.map(item => (
							<Field
								key={`${item.header}-${item.value}`}
								header={item.header}
								value={item.value}
								alert={item.alert}
								alertIcon={item.alertIcon}
								custom={item.custom}
								component={item.component}
							/>
						))}
				</div>
			</div>
		);
	}
}

InvoicePaymentItem.propTypes = {
	// data: shape({
	// 	header: string,
	// 	value: string,
	// }),
	data: array,
	icon: string,
};

InvoicePaymentItem.defaultProps = {
	icon: '',
};

export default InvoicePaymentItem;

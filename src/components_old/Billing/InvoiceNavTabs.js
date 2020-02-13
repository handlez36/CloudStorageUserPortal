import React from 'react';
import PropTypes from 'prop-types';

const InvoiceNavTabs = ({ tabs, active, switchInvoiceType }) => {
	return (
		<div className='nav nav-tabs'>
			{tabs.map(tab => {
				return (
					<div
						key={tab}
						onClick={() => switchInvoiceType(tab)}
						className={`tab ${tab === active ? 'active' : ''}`}
					>
						{tab}
					</div>
				);
			})}
		</div>
	);
};

InvoiceNavTabs.propTypes = {
	tabs: PropTypes.array.isRequired,
	switchInvoiceType: PropTypes.func.isRequired,
	active: PropTypes.string,
};

export default InvoiceNavTabs;

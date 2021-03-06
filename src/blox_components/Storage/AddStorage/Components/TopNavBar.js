import React from 'react';

import Button from 'sub_components/Common/COMPANYButton';

const TopNavBar = ({ gotoOverview, resetWizard }) => {
	return (
		<div className='top-nav-bar'>
			<div className='to-overview' onClick={gotoOverview}>
				<span>{'<'}</span>
			</div>
			<div className='cancel-button'>
				<Button
					title='CANCEL'
					onClick={resetWizard}
					enabled
					customClass='COMPANY-button gray-gradient'
				/>
			</div>
		</div>
	);
};

export default TopNavBar;

import React, { Fragment } from 'react';

import COMPANYGrid from 'components_old/Layout/COMPANYGrid';
import TopSection from './TopSection';
import TopRightSection from './TopRightSection';

const StorageAddConfirmation = ({ data }) => {
	// const testData = {
	// 	name: 'BMac',
	// 	primary: 'Birmingham',
	// 	public: false,
	// 	redundant: true,
	// 	secondary: 'Atlanta',
	// 	type: 'object',
	// 	whitelist: ['10.1.10.1/32'],
	// };

	return (
		<Fragment>
			<COMPANYGrid
				namespace='storage-add-confirmation'
				layoutClassname={`layout storage-add-layout confirmation`}
			>
				<div
					key='confirmation-message'
					className='confirmation-message'
					data-grid={{ x: 4, y: 4, w: 4, h: 4, static: true }}
				>
					<div className='message'>
						<div className='heading-ticket-modal'>CONGRATULATIONS!</div>
						<div className='bottom-message'>
							<div className='share-name'>{data.name}</div>
							<div className='heading-ticket-modal'>is added!</div>
						</div>
					</div>
				</div>
				<div
					key='left-confirmation-card'
					className='left-confirmation-card'
					data-grid={{ x: 4, y: 12, w: 2, h: 11, static: true }}
				>
					<TopSection screen='CONFIRMATION' phase='CONFIRMATION' params={data} />
				</div>
				<div
					key='right-confirmation-card'
					className='right-confirmation-card'
					data-grid={{ x: 6, y: 12, w: 2, h: 11, static: true }}
				>
					<TopRightSection screen='CONFIRMATION' phase='CONFIRMATION' params={data} />
				</div>
			</COMPANYGrid>
			<div className='image-shadow' />
		</Fragment>
	);
};

export default StorageAddConfirmation;

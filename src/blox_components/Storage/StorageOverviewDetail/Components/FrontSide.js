import React, { Fragment } from 'react';

import ScrollView from 'sub_components/Common/COMPANYScrollViewNew';
import Button from 'sub_components/Common/COMPANYButton';
import SmallCard from './SmallShareCard';
// import ScrollView from '../../../components/Common/COMPANYScrollViewNew';
// import SmallCard from './SmallShareCard';
// import Button from '../../../components/Common/COMPANYButton';

function renderShares(onClickFunc, shares = [1, 1, 1, 1, 1]) {
	return shares.map((share, index) => (
		<SmallCard
			key={`share-card-${share.ml_id}`}
			id={`share-card-${index}`}
			index={index + 1}
			share={share}
			onClick={() => onClickFunc(share.ml_id)}
		/>
	));
}

const FrontSide = ({
	shares,
	onFlip,
	selectMenuItem,
	onScroll,
	scrollTo,
	scrollTop,
	goToManageStorage,
}) => {
	return (
		<Fragment>
			{shares && (
				<Fragment>
					<ScrollView scrollTop={scrollTop} onScrollStop={onScroll}>
						<div className='share-card-wrapper'>
							<div className='shares-section'>{renderShares(onFlip, shares)}</div>
						</div>
					</ScrollView>
					<div className='shares-details'>
						<div className='count body-copy-small-regular'>Active Shares: {shares.length}</div>
						<div className='manage'>
							<Button
								title='MANAGE SHARES'
								enabled={true}
								customClass='COMPANY-button gradient'
								onClick={goToManageStorage}
							/>
						</div>
					</div>
				</Fragment>
			)}
			{!shares && <div className='shares-details loading'>Loading shares data...</div>}
		</Fragment>
	);
};

export default FrontSide;

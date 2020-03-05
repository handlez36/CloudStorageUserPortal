import React from 'react';
import { string, any } from 'prop-types';

import PageStatus from './PageStatus';
import Button from '../../components/Common/BloxButton';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const DefaultIcon = `${CDN_URL}support/icon-remote-hands-small.svg`;

const PageHeader = ({
	page,
	icon,
	pageTitle,
	moduleTitle,
	progressAttributes,
	onClick,
	ticketStatus,
}) => {
	let id;
	moduleTitle === 'GUEST ACCESS' ? (id = 'guest') : (id = 'remote');

	return (
		<div className={`page-header ${page}`}>
			<div className='wrapper'>
				<div className='icon'>
					<img src={icon} alt='' />
				</div>
				<div className='title'>
					<div className='page-title'>{pageTitle}</div>
					<div className='module-title'>{moduleTitle}</div>
				</div>
				<div className='status'>
					{progressAttributes && <PageStatus pageTitle={id} attributes={progressAttributes} />}
					{onClick && ticketStatus !== 'Solved' && (
						<Button
							title='CANCEL REQUEST'
							enabled={true}
							customClass='blox-button'
							onClick={onClick}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

PageHeader.propTypes = {
	page: string,
	icon: any,
	pageTitle: string,
	moduleTitle: string,
	progressAttributes: any,
};

PageHeader.defaultProps = {
	icon: DefaultIcon,
};

export default PageHeader;

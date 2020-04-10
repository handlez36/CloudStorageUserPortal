import React from 'react';
import { Link } from 'react-router-dom';

// import blockWhite from './img/COMPANYModules_Single_Blank_TemporaryLighterVersion.svg';
import blockWhite from './../../assets/COMPANYModules_Single_Blank_TemporaryLighterVersion.svg';

const Block = props => {
	const hasAccess = props.hasAccess || props.hasAccess === undefined;

	if (!hasAccess) {
		return (
			<div className='block'>
				<img src={blockWhite} className='COMPANY' alt='COMPANY' />
			</div>
		);
	} else if (!props.type === 'clickable' || !props.type) {
		return (
			<div className='block'>
				<img src={props.src || blockWhite} className='COMPANY' alt='COMPANY' />
			</div>
		);
	} else {
		return (
			<div className='block COMPANY-clickable'>
				<Link to={props.url}>
					<img src={props.src} className='COMPANY' alt='COMPANY' />
				</Link>
			</div>
		);
	}
};
export default Block;

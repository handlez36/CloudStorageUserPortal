import React from 'react';
import { Link } from 'react-router-dom';

// import blockWhite from './img/BLOXModules_Single_Blank_TemporaryLighterVersion.svg';
import blockWhite from './../../assets/BLOXModules_Single_Blank_TemporaryLighterVersion.svg';

const Block = props => {
	const hasAccess = props.hasAccess || props.hasAccess === undefined;

	if (!hasAccess) {
		return (
			<div className='block'>
				<img src={blockWhite} className='blox' alt='blox' />
			</div>
		);
	} else if (!props.type === 'clickable' || !props.type) {
		return (
			<div className='block'>
				<img src={props.src || blockWhite} className='blox' alt='blox' />
			</div>
		);
	} else {
		return (
			<div className='block blox-clickable'>
				<Link to={props.url}>
					<img src={props.src} className='blox' alt='blox' />
				</Link>
			</div>
		);
	}
};
export default Block;

import React from 'react';
import PropTypes from 'prop-types';

import { TICKET_LIST_CYCLE_DIRECTION } from 'utils/TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const DefaultDownArrow = `${CDN_URL}common/Common_Gray_DownArrow.svg`;
const DefaultUpArrow = `${CDN_URL}common/Common_Gray_UpArrow.svg`;

const DIRECTION = {
	UP: 'UP',
	DOWN: 'DOWN',
	BOTH: 'BOTH',
};

const NavArrows = ({ items, params, onClick, arrows, direction = DIRECTION.BOTH, customClass }) => {
	const upArrow = (arrows && arrows.up) || DefaultUpArrow;
	const downArrow = (arrows && arrows.down) || DefaultDownArrow;
	let canClick = true;

	const clickWrapper = (items, params, direction) => {
		if (canClick) {
			onClick(items, params, direction);
			canClick = false;
			setTimeout(() => {
				canClick = true;
			}, 1000);
		}
	};

	if (direction === DIRECTION.BOTH) {
		return (
			<div className='table-nav'>
				<div
					className={customClass ? customClass : 'arrow'}
					// onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.PREV)}
				>
					<img
						src={upArrow}
						alt='previous'
						onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.PREV)}
					/>
				</div>
				<div
					className={customClass ? customClass : 'arrow'}
					// onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.NEXT)}
				>
					<img
						src={downArrow}
						alt='next'
						onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.NEXT)}
					/>
				</div>
			</div>
		);
	} else if (direction === DIRECTION.UP) {
		return (
			<div
				className={customClass ? customClass : 'arrow'}
				// onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.PREV)}
			>
				<img
					id={customClass}
					src={upArrow}
					alt='previous'
					onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.PREV)}
				/>
			</div>
		);
	} else {
		return (
			<div
				className={customClass ? customClass : 'arrow'}
				// onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.NEXT)}
			>
				<img
					src={downArrow}
					alt='next'
					id={customClass}
					onClick={() => clickWrapper({ items }, params, TICKET_LIST_CYCLE_DIRECTION.NEXT)}
				/>
			</div>
		);
	}
};

NavArrows.propTypes = {
	items: PropTypes.array,
	params: PropTypes.object,
	onClick: PropTypes.func,
	arrows: PropTypes.object,
};

export default NavArrows;

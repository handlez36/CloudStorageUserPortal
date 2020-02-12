import React from 'react';
import PropTypes from 'prop-types';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const DefaultDownArrow = `${CDN_URL}common/Common_Gray_DownArrow.svg`;
const DefaultUpArrow = `${CDN_URL}common/Common_Gray_UpArrow.svg`;

const DIRECTION = {
	PREV: 'PREV',
	NEXT: 'NEXT',
	BOTH: 'BOTH',
};

const NavArrows = ({ items, params, onClick, arrows, direction = DIRECTION.BOTH }) => {
	const upArrow = (arrows && arrows.up) || DefaultUpArrow;
	const downArrow = (arrows && arrows.down) || DefaultDownArrow;

	if (direction === DIRECTION.BOTH) {
		return (
			<div className='table-nav'>
				<div className='arrow' onClick={() => onClick({ items }, params, DIRECTION.PREV)}>
					<img src={upArrow} alt='previous' />
				</div>
				<div className='arrow' onClick={() => onClick({ items }, params, DIRECTION.NEXT)}>
					<img src={downArrow} alt='next' />
				</div>
			</div>
		);
	} else if (direction === DIRECTION.PREV) {
		return (
			<div className='arrow up' onClick={() => onClick({ items }, params, DIRECTION.PREV)}>
				<img src={upArrow} alt='previous' />
			</div>
		);
	} else {
		return (
			<div className='arrow down' onClick={() => onClick({ items }, params, DIRECTION.NEXT)}>
				<img src={downArrow} alt='next' />
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

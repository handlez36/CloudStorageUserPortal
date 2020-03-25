import React from 'react';
import { string, bool, func } from 'prop-types';

const AvatarGrid = ({ selected, onSelect, onUpdate, phase }) => {
	let currentRow = [];

	return (
		<div className='avatar-grid container'>
			{['a', 'b', 'c', 'd', 'e', 'f'].map(col => {
				currentRow = [1, 2, 3, 4, 5, 6, 7].map(row => {
					const callback =
						phase === 'POPULATE'
							? () => onSelect('avatar', { data: `${col}${row}` }, true)
							: () => onUpdate('avatar', `${col}${row}`);
					return (
						<div
							className={`cell cell-${col}${row} ${selected === `${col}${row}` ? 'selected' : ''}`}
							onClick={callback}
						>
							<img src={`https://www.mydcblox.com/cdn/library/storage/${col}${row}.svg`} />
						</div>
					);
				});
				return <div className={`avatar-grid-row row-${col}`}>{currentRow}</div>;
			})}
		</div>
	);
};

AvatarGrid.propTypes = {
	selected: bool,
	onSelect: func.isRequired,
	phase: string,
};

AvatarGrid.defaultProps = {
	phase: 'POPULATE',
};

export default AvatarGrid;

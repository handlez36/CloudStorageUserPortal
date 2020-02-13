import React, { useEffect } from 'react';
import { boolean, number, func } from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';

const applyIEWorkaround = () => {
	setTimeout(() => {
		const wrapperEl = document.querySelector('.trackYVisible');
		const contentEl = document.querySelector('.ScrollbarsCustom-Content');
		const scrollbarEl = document.querySelector('.ScrollbarsCustom-TrackY');

		// Is contentEl scrollheight passed clientHeight ??
		if (scrollbarEl) {
			if (wrapperEl && contentEl && contentEl.scrollHeight <= wrapperEl.clientHeight) {
				// console.log('Add hide class');
				if (!scrollbarEl.classList.contains('hide')) {
					scrollbarEl.classList.add('hide');
				}
			} else {
				// console.log('Remove hide class');
				scrollbarEl.classList.remove('hide');
			}
		}
	}, 100);
};

const BloxScrollViewNew = ({ purple, scrollTop, onScrollStop, children, height }) => {
	const scrollBarClass = purple ? ' purple' : '';

	useEffect(applyIEWorkaround);
	return (
		<Scrollbar
			thumbYProps={{
				renderer: props => {
					const { elementRef, ...restProps } = props;
					return (
						<div
							{...restProps}
							ref={elementRef}
							className={`ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbY${scrollBarClass}`}
						/>
					);
				},
			}}
			scrollTop={scrollTop}
			onScrollStop={({ scrollTop }) => onScrollStop && onScrollStop(scrollTop)}
			disableTracksWidthCompensation
			noScrollX
			height={height}
			// style={{ height }}
		>
			{children}
		</Scrollbar>
	);
};

/**
 * purple: Default is False and will result in a grey scroller.
 * True will result in a purple scroller.
 */
BloxScrollViewNew.propTypes = {
	purple: boolean,
	scrollTop: number,
	onScrollStop: func,
};

BloxScrollViewNew.defaultProps = {
	purple: false,
	scrollTop: undefined,
};

export default BloxScrollViewNew;

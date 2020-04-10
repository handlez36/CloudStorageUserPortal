import React, { Component } from 'react';
import COMPANYButton from '../../components/Common/COMPANYButton';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Arrow = `${CDN_URL}storage/left-arrow.svg`;
class Header extends Component {
	render() {
		const { onClick, button, buttonText, onClickArrow, customButtonClass } = this.props;
		return (
			<div className='header-wrapper'>
				<div className='header'>
					<div className='back-arrow' onClick={onClickArrow}>
						<img src={Arrow} />
					</div>
				</div>

				{button && (
					<div className='header-button'>
						<COMPANYButton
							title={buttonText}
							enabled={true}
							customClass={`COMPANY-button ${customButtonClass}`}
							onClick={onClick}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default Header;

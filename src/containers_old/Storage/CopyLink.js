import React, { Component } from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CopyButton = `${CDN_URL}storage/icon-copy.svg`;

class CopyLink extends Component {
	copyText = () => {
		const copyText = document.getElementById('copy');
		copyText.select();
		document.execCommand('copy');
	};
	truncate = path => {
		if (path.length >= 35) {
			return path.slice(0, 35) + '...';
		} else {
			return path;
		}
	};
	render() {
		const { link } = this.props;

		return (
			<div className='copy-link-container'>
				<input className='link-container' id='copy' value={link ? link : ''} />
				<input className='link-container-overlay' value={link ? this.truncate(link) : ''} />
				<div className='copy-button' onClick={this.copyText}>
					<img src={CopyButton} />
				</div>
			</div>
		);
	}
}

export default CopyLink;

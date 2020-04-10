import React, { Component } from 'react';
import CookieConsent from 'react-cookie-consent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// import { EulaComponent } from '../Common/EulaComponent';     DELETED
// import ReleaseNotesModal from '../../containers/Release/ReleaseNotesModal';    DELETED
import { EulaComponent } from './../Misc/EulaComponent';
import ReleaseNotesModal from './../Misc/Release/ReleaseNotesModal';

const CDN_URL = process.env.REACT_APP_CDN_URL;

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
		};
	}

	toggleNotes = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	closeReleaseNotesModal = () => {
		this.setState({ showModal: false });
	};

	render() {
		const { showModal } = this.state;
		return (
			<footer className='footerContainer v3'>
				<CookieConsent location='top' buttonText='X' style={{ background: '#2B373B' }}>
					We use cookies to give you the best possible experience on our website. If you continue
					without changing your settings, you are consenting to the use of cookies on our site.
				</CookieConsent>
				<div className='footer-logo'>
					<a href='hidden' target='_blank' rel='noreferrer noopener'>
						<img src={`hidden_logo.svg`} height='63%' />
					</a>
				</div>
				<div className='wrapper-footer'>
					<ul className='footer-links'>
						<li>
							<a href='hidden' target='_blank' rel='noreferrer noopener'>
								Terms of Use
							</a>
						</li>
						<li>
							<a href='hidden' target='_blank' rel='noreferrer noopener'>
								Acceptable Use
							</a>
						</li>
						<li>
							<a href='hidden' target='_blank' rel='noreferrer noopener'>
								Shared Responsibility
							</a>
						</li>
						<li>
							<a href='hidden' target='_blank' rel='noreferrer noopener'>
								Privacy Policy
							</a>
						</li>
						<li>
							<EulaComponent />
						</li>
						<li>
							{/* <Link to='/portal/release' onClick={this.toggleNotes}> */}
							<Link to='#' onClick={this.toggleNotes}>
								Release Notes
							</Link>
						</li>
						<ReleaseNotesModal isOpen={showModal} close={this.closeReleaseNotesModal} />
						{/* <div className='release-notes-modal'>
							<ReleaseModal
								isOpen={showModal}
								toggleOpen={this.toggleNotes}
								customBody={<ReleaseNotes />}
								customTitle='RELEASE Notes'
								headerMessage='Want to read more? , View all releases'
							/>
						</div> */}
					</ul>
				</div>
				<div className='phone-area'>
					<div className='phone-icon'>
						<FontAwesomeIcon icon={faPhoneSquare} />
					</div>
					<div className='phone-number'>
						<a href='hidden' target='_blank' rel='noreferrer noopener'>
							877.590.1684
						</a>
					</div>
				</div>
			</footer>
		);
	}
}
export default Footer;

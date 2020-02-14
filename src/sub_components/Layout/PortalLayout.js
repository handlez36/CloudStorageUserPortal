import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// import NavSection from '../Navigationv3/BloxNavigationSection';
// import ContentSection from './ContentSection';
// import HeaderSection from './HeaderSection';
// import FooterSection from './../../components/Layoutv3/Footer';
// import StorageOverview from './../../containers/Storagev3/OverviewPage2';
// import { RESOLUTIONS } from './../../services/config';
// import { SITE_MAP, SITE_PAGES } from './../Common/CommonConstants';

/** v3 imports */
import NavSection from './Navigation/BloxNavigationSection';
import ContentSection from './ContentSection';
import HeaderSection from './HeaderSection';
import FooterSection from './Footer';
import StorageOverview from './../../pages/Storage/OverviewPage';
import { RESOLUTIONS } from './../../services/config';
// import { SITE_MAP, SITE_PAGES } from './../Common/CommonConstants';

class PortalLayout extends Component {
	constructor(props) {
		super(props);

		this.screenObserver = null;
		this.state = {
			currentModule: null,
			currentPage: null,
			breakpoint: 1440,
		};
	}

	/**
	 * For v3 URL driven portal requirements
	 */
	parseUrlParams = () => {
		const urlRegex = /^\/(.*)\/?(.*)$/;
		const pathname = '/sandbox';
		const matches = pathname.match(urlRegex);

		if (matches) {
			const [url, siteModule, sitePage] = matches;
			return { siteModule, sitePage };
		}

		return { siteModule: 'HOME', sitePage: 'OVERVIEW' };
	};

	updateScreenBreakpoint = screenWidth => {
		let breakpoint = RESOLUTIONS.MED;

		if (screenWidth > RESOLUTIONS.LOW && screenWidth <= RESOLUTIONS.MED) {
			breakpoint = RESOLUTIONS.LOW;
		} else if (screenWidth > RESOLUTIONS.MED && screenWidth <= RESOLUTIONS.HIGH) {
			breakpoint = RESOLUTIONS.MED;
		} else if (screenWidth > RESOLUTIONS.HIGH) {
			breakpoint = RESOLUTIONS.HIGH;
		}

		this.setState({ breakpoint });
	};

	componentDidMount() {
		this.screenObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const screenWidth = entry.contentRect.width;
				this.updateScreenBreakpoint(screenWidth);
			});
		});

		const htmlEl = document.querySelector('html');
		this.screenObserver.observe(htmlEl);
	}

	render() {
		const { breakpoint } = this.state;
		const { module, content } = this.props;

		return (
			<div className='portal-layout v3'>
				<div className='portal-header'>
					<HeaderSection />
				</div>
				<div className='portal-main'>
					<div className='main-nav'>
						<NavSection module={module} />
					</div>
					<div className='main-content'>
						<ContentSection content={content} breakpoint={breakpoint} />
					</div>
				</div>
				<div className='portal-footer'>
					<FooterSection />
				</div>
			</div>
		);
	}
}

export default PortalLayout;

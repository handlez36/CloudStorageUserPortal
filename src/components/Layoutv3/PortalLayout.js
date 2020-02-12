import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import NavSection from '../Navigationv3/BloxNavigationSection';
import ContentSection from './ContentSection';
import HeaderSection from './HeaderSection';
import FooterSection from './../../components/Layoutv3/Footer';

// import SamplePage from './SamplePage';
// import SamplePage2 from './SamplePage2';
// import SampleBillingOverviewPage from './SampleBillingOverviewPage';
// import BillingOverview from './../../containers/Billingv3/OverviewPage';
import StorageOverview from './../../containers/Storagev3/OverviewPage2';
// import StorageOverview from './../../containers/Storagev3/OverviewPage';
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
		// let breakpoint = 1440;
		let breakpoint = RESOLUTIONS.MED;

		if (screenWidth > RESOLUTIONS.LOW && screenWidth <= RESOLUTIONS.MED) {
			breakpoint = RESOLUTIONS.LOW;
		} else if (screenWidth > RESOLUTIONS.MED && screenWidth <= RESOLUTIONS.HIGH) {
			breakpoint = RESOLUTIONS.MED;
		} else if (screenWidth > RESOLUTIONS.HIGH) {
			breakpoint = RESOLUTIONS.HIGH;
		}
		// if (screenWidth <= 1024) {
		// 	breakpoint = 1024;
		// } else if (screenWidth > 1024 && screenWidth <= 1440) {
		// 	breakpoint = 1440;
		// } else if (screenWidth > 1440) {
		// 	breakpoint = 2560;
		// }

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
		// const { content } = this.props;

		return (
			<div className='portal-layout v3'>
				<div className='portal-header'>
					<HeaderSection />
				</div>
				<div className='portal-main'>
					<div className='main-nav'>
						<NavSection />
					</div>
					<div className='main-content'>
						<ContentSection content={StorageOverview} breakpoint={breakpoint} />
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

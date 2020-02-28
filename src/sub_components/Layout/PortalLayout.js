import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import capitalize from 'lodash/capitalize';
import { RESOLUTIONS } from 'services/config';
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

// import { SITE_MAP, SITE_PAGES } from './../Common/CommonConstants';

const PAGES = {
	Support: {
		Overview: 'OverviewPage',
	},
	Storage: {
		Overview: 'OverviewPage',
	},
	Profile: {
		Overview: 'OverviewPage',
		Password_change: 'PasswordChangePage',
	},
	Billing: {
		Overview: 'OverviewPage',
	},
};

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
		const { location: { pathname = '' } = {} } = this.props;
		// const urlRegex = /^\/(.*)\/?(.*)$/;
		const urlRegex = /^\/portal\/?(\w*)\/?(\w*)\/?.*$/;
		const matches = pathname.match(urlRegex);

		if (matches) {
			const [, siteModule, sitePage] = matches;
			console.log('Site Module: ', siteModule);
			console.log('Site Module: ', sitePage);
			this.loadPage(siteModule, sitePage);
			return { siteModule, sitePage };
		}

		return { siteModule: 'HOME', sitePage: 'OVERVIEW' };
	};

	loadPage = (bloxModule, bloxPage = 'OVERVIEW') => {
		const mod = capitalize(bloxModule);
		const page = capitalize(bloxPage);
		const pageName = PAGES[mod][page];

		const Component = require(`../../pages/${mod}/${pageName}`).default;
		this.setState({ PageComponent: Component, currentModule: mod.toLowerCase() });
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
		// Parse URL to determine module to load...
		this.parseUrlParams();

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
		const { breakpoint, PageComponent, currentModule } = this.state;
		console.log('CURRENT MODULE', currentModule);
		return (
			<div className='portal-layout v3'>
				<div className='portal-header'>
					<HeaderSection />
				</div>
				<div className='portal-main'>
					<div className='main-nav'>
						<NavSection module={currentModule} />
					</div>
					<div className='main-content'>
						{PageComponent && <ContentSection content={PageComponent} breakpoint={breakpoint} />}
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

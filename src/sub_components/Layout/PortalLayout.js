import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import capitalize from 'lodash/capitalize';
import { RESOLUTIONS } from 'services/config';

/** v3 imports */
import NavSection from './Navigation/BloxNavigationSection';
import ContentSection from './ContentSection';
import HeaderSection from './Header/HeaderSection';
import FooterSection from './Footer';
// import { SITE_MAP, SITE_PAGES } from './../Common/CommonConstants';

const PAGES = {
	Support: {
		Overview: 'OverviewPage',
		Ticket_history: 'TicketHistoryPage',
	},
	Storage: {
		Overview: 'OverviewPage',
	},
	Profile: {
		Overview: 'OverviewPage',
		User_management: 'UserMgmtPage',
		Change_password: 'PasswordChangePage',
		Avatar: 'AvatarChangePage',
		Contact_info: 'UserInfoPage',
	},
	Billing: {
		Overview: 'OverviewPage',
		Current_invoices: 'CurrentInvoicesPage',
		Invoice_history: 'InvoiceHistoryPage',
		Make_a_payment: 'MakeAPaymentPage',
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
		const matches = pathname.split('/');

		if (matches) {
			const [, , siteModule, sitePage] = matches;
			const parsedSitePage =
				!sitePage || sitePage === undefined || sitePage === '0' ? 'OVERVIEW' : sitePage;

			this.loadPage(siteModule, parsedSitePage);
			return { siteModule, parsedSitePage };
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
		console.log('PortalLayout Did Mount');
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
	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			this.parseUrlParams();
		}
	}

	render() {
		const { breakpoint, PageComponent, currentModule } = this.state;

		return (
			<div className='portal-layout v3'>
				<div className='portal-header'>
					<HeaderSection
						breakpoint={breakpoint}
						module={currentModule}
						history={this.props.history}
					/>
				</div>
				<div className='portal-main'>
					<div className='main-nav'>
						<NavSection history={this.props.history} module={currentModule} />
					</div>
					<div className='main-content'>
						{PageComponent && (
							<ContentSection
								content={PageComponent}
								breakpoint={breakpoint}
								match={this.props.match}
								history={this.props.history}
							/>
						)}
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

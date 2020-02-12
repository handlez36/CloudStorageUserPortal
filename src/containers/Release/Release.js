import React, { Component } from 'react';
import { MENU, RELEASE_MESSAGE_TEXT } from './ReleaseConstants';
import PortalLayout from '../Layout/PortalLayout';
import { ReleaseApi } from '../../services/release';
import DisplayRelease from '../../components/Release/DisplayRelease';
import PortalMessage from '../../components/Common/PortalMessage';
import SupportSection from '../../components/Common/SupportSection';

export default class Release extends Component {
	constructor(props) {
		super(props);
		this.releaseApi = new ReleaseApi();

		this.menuItems = {
			[MENU.RELEASES]: 1,
		};

		this.state = {
			active: MENU.RELEASES,
			releases: [],
			supportParams: {
				releaseKey: '',
				pdfFile: '',
			},
		};
	}
	selectMenuItem = () => {
		this.setState({ active: MENU.RELEASES });
	};

	componentDidMount() {
		this.requestReleases()
			.then(() => {
				this.showPdf(this.state.releases[0].fileName);
				this.loadSupportColumn(DisplayRelease, this.state.supportParams);
			})
			.catch(error => this.setState({ error }));
	}

	loadSupportColumn = (component, params) => {
		this.setState({
			supportSectionComponent: component,
			supportParams: params,
		});
	};

	requestReleases = () => {
		return this.releaseApi
			.getAll()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					this.setState({ error: response.data.error });
				} else {
					this.setState({ releases: response.data.releases });
				}
			})
			.catch(error => this.setState({ error }));
	};

	showPdf = releaseKey => {
		this.releaseApi
			.get(releaseKey)
			.then(response => {
				const pdf = this.releaseApi.viewPdfInPanel(response.data.file, releaseKey);
				this.setState({ pdfFile: pdf });
				this.setState({ supportParams: { releaseKey, pdfFile: pdf } });
			})
			.catch(error => this.setState({ error }));
	};

	render() {
		const { active } = this.state;
		return (
			<PortalLayout
				page='release'
				sideMenu={this.menuItems}
				callback={this.selectMenuItem}
				activePage={this.menuItems[active]}
				history={this.props.history}
			>
				<div className='main release'>
					<div className='portal-header'>
						<div className='menu-selection'>{MENU.RELEASES}</div>
					</div>

					<div className='release-page outer-wrapper'>
						<PortalMessage
							start={RELEASE_MESSAGE_TEXT.START}
							content={RELEASE_MESSAGE_TEXT.CONTENT}
						/>
						<div className='release-list'>
							{this.state.releases.map(row => {
								return (
									<div onClick={() => this.showPdf(row.fileName)}>
										<span>
											{row.releaseName} - {row.date}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<SupportSection
					content={DisplayRelease}
					auth_status={this.props.auth_status}
					showPdf={this.showPdf}
					pdf={this.state.pdfFile}
					supportParams={this.state.supportParams}
					loadSupportColumn={this.loadSupportColumn}
				/>
				<div className='supporting-content release'>
					<div className='portal-header' />
					<div className='content' />
				</div>
			</PortalLayout>
		);
	}
}

import React, { Component, Fragment } from 'react';
import moment from 'moment';
import map from 'lodash/map';

import ScrollView from './../../../Common/BloxScrollViewNew';
import { ReleaseApi } from './../../../../services/release';
import { TicketApi } from './../../../../services/ticket';
import { Utils } from './../../../../services/utils';
import { SCREENS } from './../../../../utils/Misc/ReleaseConstants';

class ReleaseList extends Component {
	constructor(props) {
		super(props);

		this.releaseApi = new ReleaseApi();
		this.state = {
			overflow: false,
			releases: null,
		};
	}

	componentDidMount() {
		this.requestReleases();
	}

	getSortedDateKeys = data => {
		return Object.keys(data)
			.sort()
			.reverse();
	};

	formatReleaseData = ({ data }) => {
		const sortedReleases = {};
		map(data, (releases, year) => {
			sortedReleases[year] = releases.sort(
				(a, b) => moment(b.date).valueOf() - moment(a.date).valueOf(),
			);
		});

		return sortedReleases;
	};

	requestReleases = () => {
		return this.releaseApi
			.getAllNew()
			.then(response => {
				if (!Utils.isValidResponse(response)) {
					this.setState({ error: response.data.error });
				} else {
					const releases = this.formatReleaseData(response);
					this.setState({ releases });
				}
			})
			.catch(error => this.setState({ error }));
	};

	onResize = () => {
		this.displayContent('', false);
	};

	displayContent = (content, expanded = false) => {
		const wrapperElement = document.querySelector('release-list-wrapper');
		const contentElement = document.querySelector('content');

		// Check to see if content does not overflow first
		contentElement.innerHTML = content;
		if (expanded || wrapperElement.scrollHeight <= wrapperElement.clientHeight) {
			return;
		}

		// Since content overflows, iteratively assemble content until the overflow point is reached
		contentElement.innerHTML = '';
		let end = 1;
		let truncatedContent = '';
		while (wrapperElement.scrollHeight <= wrapperElement.clientHeight) {
			truncatedContent = this.truncate(content, end++);
			contentElement.innerHTML = truncatedContent;
		}

		contentElement.innerHTML = this.truncate(content, end - 2);
		if (!this.state.overflow) {
			this.setState({ overflow: true });
		}
	};

	render() {
		const { updateScreen } = this.props;
		const { releases } = this.state;

		return (
			<div className='release'>
				<div className='release-list-wrapper'>
					<div className='content'>
						<ScrollView purple>
							{releases &&
								this.getSortedDateKeys(releases).map(year => {
									return (
										<Fragment key={year}>
											<div className='year'>{year}</div>
											{releases[year].map(releaseInfo => {
												return (
													<div
														className='sprint'
														key={releaseInfo.name}
														onClick={() =>
															updateScreen(SCREENS.DETAIL, {
																name: releaseInfo.name,
																date: releaseInfo.date,
															})
														}
													>
														{`${TicketApi.getFormattedMonthDayYear(releaseInfo.date)}  |  ${
															releaseInfo.name
														}`}
													</div>
												);
											})}
										</Fragment>
									);
								})}
						</ScrollView>
					</div>
				</div>
			</div>
		);
	}
}

export default ReleaseList;

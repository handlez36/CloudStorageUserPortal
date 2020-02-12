import React, { Component, Fragment } from 'react';

import { ReleaseApi } from '../../services/release';
import { TicketApi } from '../../services/ticket';

class ReleaseList extends Component {
	constructor(props) {
		super(props);
		this.releaseApi = new ReleaseApi();
		this.state = { overflow: false, releases: null };
	}
	componentDidMount() {
		this.requestReleases();
	}
	requestReleases = () => {
		return this.releaseApi
			.getAllNew()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					this.setState({ error: response.data.error });
				} else {
					response.data[2019]
						.sort((a, b) => {
							return new Date(a.date) - new Date(b.date);
						})
						.reverse();
					response.data[2018]
						.sort((a, b) => {
							return new Date(a.date) - new Date(b.date);
						})
						.reverse();

					let data = [
						{ name: 2019, releases: response.data[2019] },
						{ name: 2018, releases: response.data[2018] },
					];
					this.setState({ releases: data });
				}
			})
			.catch(error => this.setState({ error }));
	};

	onResize = () => {
		this.displayContent('', false);
	};

	displayContent(content, expanded = false) {
		const { name } = this.props;
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
	}
	showRelease = link => {};

	getDate = () => {};

	render() {
		const { releases } = this.state;

		return (
			<div className='release'>
				{/* <ScrollView
					name={'release-list'}
					wrapper={'release-list-wrapper'}
					content={'release-content'}
					expanded
					setOverflow
				> */}
				<div className='release-list-wrapper'>
					<div className='release-content'>
						{!releases &&
							releases.map(release => {
								return (
									<Fragment>
										<div className='year'>{release.name}</div>
										{release.releases.map(release => {
											return (
												<Fragment>
													<div className='sprint'>{`${TicketApi.getFormattedMonth(
														release.date,
													)}  |  ${release.name}`}</div>
												</Fragment>
											);
										})}
									</Fragment>
								);
							})}
					</div>
				</div>
				{/* </ScrollView> */}
			</div>
		);
	}
}

export default ReleaseList;

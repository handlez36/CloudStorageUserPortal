import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import ScrollView from './../../../Common/COMPANYScrollViewNew';
import Button from './../../../Common/COMPANYButton';
import { ReleaseNotesApi } from './../../../../services/releaseNotes';
import { Utils } from './../../../../services/utils';
import { SCREENS } from './../../../../utils/Misc/ReleaseConstants';

class DetailView extends Component {
	state = {
		content: null,
		error: null,
	};

	formatVersionLogistics = () => {
		const { version, date } = this.state;
		return version && date ? `${date} | ${version}` : '';
	};

	getReleaseNotes = async (version, date) => {
		try {
			const response = await ReleaseNotesApi.getReleaseNotes(version);
			Utils.isValidResponse(response)
				? this.setState({ content: response.data, version, date })
				: this.setState({ error: 'Error retrieving content' });
		} catch (e) {
			this.setState({ error: 'Network error retrieving content' });
		}
	};

	componentDidMount() {
		const { params: { name: version, date } = {} } = this.props;

		if (version && date) {
			this.getReleaseNotes(`${version}.html`, date);
		}
	}

	render() {
		const { content } = this.state;
		const { updateScreen } = this.props;

		return (
			<div className='detail-view'>
				{content && (
					<div className='wrapper'>
						<div className='version-logistics'>{this.formatVersionLogistics()}</div>
						<ScrollView purple>
							<div className='version-content body-copy'>{ReactHtmlParser(content)}</div>
							<div className='all-release-list-button'>
								<Button
									title='VIEW ALL RELEASES'
									onClick={() => updateScreen(SCREENS.LIST, null)}
									customClass='COMPANY-button'
									enabled
								/>
							</div>
						</ScrollView>
					</div>
				)}
				{!content && (
					<div className='wrapper'>
						<div className='invalid-version'>
							Sorry, no release information available for that date
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default DetailView;

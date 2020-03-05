import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserApi } from 'services/user';
import { updatePage } from 'actions/siteTracking';

import { CompanyProfileApi } from 'services/companyProfile';
import RosterUserOverviewBlock from './Components/RosterUserOverviewBlock';

class RosterUserOverview extends Component {
	constructor(props) {
		super(props);
		this.companyApi = new CompanyProfileApi();
		const locations = [
			{ name: 'Atlanta', locationId: 3 },
			{ name: 'Huntsville', locationId: 4 },
			{ name: 'Chattanooga', locationId: 1 },
			{ name: 'Birmingham', locationId: 2 },
		];
		this.state = {
			locations,
			activeRosterCount: 0,
		};
	}

	componentDidMount() {
		this.getCompanyProfile();
	}

	getCompanyProfile = () => {
		this.companyApi
			.get()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					console.log(JSON.stringify(response.data.customer.id));
					UserApi.getRosterSummary(response.data.customer.id)
						.then(response => {
							this.sortRoster(response.data.locationsSummary);
							this.setState({ activeRosterCount: response.data.activeRosterCount });
							this.props.callBack(this.state.activeRosterCount);
						})
						.catch(error => this.setState({ error }));
				} else {
					this.setState({ error: 'Error pulling company details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	goToRosterUsers = () => {
		this.props.goToRosterUsers('USER MANAGEMENT', true);
	};

	sortRoster(locationSummaries) {
		const updatedLocations = this.state.locations;
		for (const location of updatedLocations) {
			for (const locationSummary of locationSummaries) {
				if (location.locationId === locationSummary.datacenterId) {
					location.rosterUserCount = locationSummary.rosterUserCount;
				}
			}
		}
		this.setState({ locations: updatedLocations });
	}

	render() {
		return (
			<div className='roster-user-overview'>
				<div className='sub-title-wrapper'>
					<div className='sub-title heading70'>{`( ${this.state.activeRosterCount} Active )`}</div>
				</div>

				<div className={'overview-user-wrapper'}>
					<div className={'locations'}>
						<div className={'row-wrapper'}>
							<div className={'row-1'}>
								{this.state.locations &&
									this.state.locations.map((location, index) => {
										return <RosterUserOverviewBlock key={index} location={location} />;
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		companyInfo: state.company_info,
	};
}

export default connect(mapStateToProps, { updatePage })(RosterUserOverview);

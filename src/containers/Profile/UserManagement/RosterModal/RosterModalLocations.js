import React, { Component } from 'react';
import { string } from 'prop-types';
import { TicketApi } from '../../../../services/ticket';
import Circle from '../../../../components/Common/Circle';

class RosterModalLocations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fill: '',
			active: '',
		};
	}
	onChange = event => {
		const { onChange, id, markComplete, locations } = this.props;
		onChange(id, event, locations, 'locations');
		if (locations.length) {
			markComplete('locations', true);
		} else {
			markComplete('locations', false);
		}
	};

	componentDidMount() {
		const { locations } = this.props;
		if (locations) {
			if (locations.includes('Atlanta')) {
				const activeLocation = document.getElementById('one');
				activeLocation.classList.add('active');
			}
			if (locations.includes('Birmingham')) {
				const activeLocation = document.getElementById('four');
				activeLocation.classList.add('active');
			}
			if (locations.includes('Chattanooga')) {
				const activeLocation = document.getElementById('two');
				activeLocation.classList.add('active');
			}
			if (locations.includes('Huntsville')) {
				const activeLocation = document.getElementById('three');
				activeLocation.classList.add('active');
			}
		}
	}

	onClick = (location, index) => {
		const { locations } = this.props;
		const activeLocation = document.getElementById(index);

		if (locations.length) {
			if (locations.includes(location)) {
				activeLocation.classList.remove('active');
				for (let i = 0; i < locations.length; i++) {
					if (locations[i] === location) {
						locations.splice(i, 1);
					}
				}
			} else {
				activeLocation.classList.add('active');
				locations.push(location);
			}
		} else {
			activeLocation.classList.add('active');
			locations.push(location);
		}
		this.onChange();
	};

	render() {
		const locations = [
			{ location: 'Atlanta', key: 'one' },
			{ location: 'Chattanooga', key: 'two' },
			{ location: 'Huntsville', key: 'three' },
			{ location: 'Birmingham', key: 'four' },
		];
		return (
			<div className='roster-screen-locations'>
				<div className='title'>Add a New Person to Your Roster </div>
				<div className='sub-title'>What locations do they need to access ? </div>
				<div className='locations'>
					<div className='top'>
						{locations.map(location => (
							<div
								id={location.key}
								className={location.key}
								onClick={() => this.onClick(location.location, location.key)}
							>
								<Circle location={location.location} />
								<img src={TicketApi.getSmallBuildingIcons(location.location)} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

RosterModalLocations.propTypes = {
	lastname: string,
};

RosterModalLocations.defaultProps = {
	lastname: '',
};

export default RosterModalLocations;

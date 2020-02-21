import React, { useState } from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const BackgroundImg = `${CDN_URL}profile/services-background-fill.svg`;
const Icon = `${CDN_URL}profile/Profile_Default_Service_Icon.svg`;
const VIEW = {
	SUMMARY: 'SUMMARY',
	DETAIL: 'DETAIL',
};
const LOCATIONS = { Atlanta: 3, Birmingham: 2, Chattanooga: 1, Huntsville: 4 };

const locationHasService = (services, datacenterId) => {
	const servicesForLocation = services.filter(service => service.datacenterId === datacenterId);
	return servicesForLocation.length > 0;
};

const ServiceIcon = ({ service, companyServices }) => {
	const [view, setView] = useState(VIEW.SUMMARY);

	const serviceIconClass = view === VIEW.SUMMARY ? ' summary' : ' detail';
	const filteredCompanyServices = companyServices.filter(
		coService => coService.service === service,
	);

	return (
		<div className='service-icon'>
			<div
				className={`service-content${serviceIconClass}`}
				onMouseEnter={() => setView(VIEW.DETAIL)}
				onMouseLeave={() => setView(VIEW.SUMMARY)}
			>
				<div className='icon'>
					<img src={Icon} />
				</div>
				<div className='label heading70'>{service}</div>
				<div className='details'>
					{Object.keys(LOCATIONS).map(location => {
						const datacenterId = LOCATIONS[location];
						const enabled = locationHasService(filteredCompanyServices, datacenterId);
						return (
							<div className={`location${enabled ? '' : ' disabled'} heading90`}>{location}</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ServiceIcon;

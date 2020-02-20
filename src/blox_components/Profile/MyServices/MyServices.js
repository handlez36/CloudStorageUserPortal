import React, { useState, useEffect } from 'react';

import { UserProfileApi } from 'services/userProfile';
import ServiceIcon from './Components/ServiceIcon';

const AVAILABLE_SERVICES = ['Colocation', 'Storage', 'Network Services'];

const MyServices = props => {
	const [companyServices, setCompanyServices] = useState(null);
	const [error, setError] = useState(null);

	/** getCompanyServices Api call */
	useEffect(() => {
		const getServices = async () => {
			const { companyServices, error } = await new UserProfileApi().getCompanyServices();
			setCompanyServices(companyServices);
			setError(error);
		};
		if (!companyServices && !error) {
			getServices();
		}
	}, [companyServices]);

	return (
		<div className='my-services'>
			{AVAILABLE_SERVICES.map(service => {
				return <ServiceIcon service={service} companyServices={companyServices || []} />;
			})}
		</div>
	);
};

export default MyServices;

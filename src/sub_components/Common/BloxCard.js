import React, { useState, useEffect } from 'react';

import Button from 'sub_components/Common/COMPANYButton';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const upIcon = `${CDN_URL}common/icons-arrow-circle@3x.png`;
const downIcon = `${CDN_URL}common/buttons-arrow-circle-small@3x.png`;

const onSetExpanded = (type, expanded, setExpanded, expandCardCallback) => {
	setExpanded(!expanded);
	expandCardCallback(type);
};

const COMPANYCard = ({ type, image, summary, detail, isExpanded, expandCardCallback, history }) => {
	const [expanded, setExpanded] = useState(isExpanded);

	useEffect(() => {
		if (isExpanded !== expanded) {
			setExpanded(isExpanded);
		}
	}, [isExpanded]);

	return (
		<div className={`COMPANY-card${isExpanded ? ' expanded' : ''}`}>
			<div className='card-top-section'>
				<img src={image} />
			</div>
			<div
				className='card-bottom-section'
				onClick={() => onSetExpanded(type, expanded, setExpanded, expandCardCallback)}
			>
				<div className='summary-row'>
					{summary}
					<img src={expanded ? upIcon : downIcon} alt='expand' />
				</div>
				{expanded && (
					<div className='expanded-section'>
						{detail}
						<Button
							title='EDIT CONTACT INFO'
							onClick={() => {
								history.push('/portal/profile/contact_info');
							}}
							customClass='COMPANY-button gradient'
							enabled
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default COMPANYCard;

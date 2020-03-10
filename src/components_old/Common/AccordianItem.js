import React from 'react';
import map from 'lodash/map';

import IconInputComponent from 'sub_components/Common/IconInputComponent';
import AccordianField from './AccordianField';
import AccordianItemDetails from './AccordianItemDetails';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const ExpandIcon = `${CDN_URL}common/Accordian_Expand_Icon.svg`;
const CollapseIcon = `${CDN_URL}common/Accordian_Collapse_Icon.svg`;

function formatFields(headers, data) {
	return map(headers, (header, param) => {
		const alert = data.hasAlert && (param === 'amountDue' || param === 'dueDate');
		const alertIcon = data.hasAlert && param === 'amountDue';

		return (
			<AccordianField
				key={`${param}-${data[param]}`}
				alert={alert}
				alertIcon={alertIcon}
				header={header}
				value={data[param]}
			/>
		);
	});
}

const AccordianItem = ({
	data,
	onClick,
	headers,
	expanded,
	detailHeaders,
	loadSupportColumn,
	downloadPdf,
	id,
}) => {
	return (
		<IconInputComponent
			icon={data.theme.icon}
			classes={`invoice-row accordian-item ${expanded ? 'expanded' : ''}`}
		>
			{data && (
				<div id={id} className={`summary ${expanded ? 'expanded' : ''}`}>
					{formatFields(headers, data)}
					<img
						className={`expand-button`}
						src={expanded ? CollapseIcon : ExpandIcon}
						onClick={() => onClick(data.invoiceNumber)}
						alt='expand'
					/>
				</div>
			)}

			<AccordianItemDetails
				theme={data.theme}
				expanded={expanded}
				headers={detailHeaders}
				summary={data}
				details={data.transactions}
				loadSupportColumn={loadSupportColumn}
				downloadPdf={downloadPdf}
				button1={true}
				button2={true}
			/>
		</IconInputComponent>
	);
};

export default AccordianItem;

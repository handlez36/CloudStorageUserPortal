import React, { Fragment } from 'react';

import DisplayBill from '../Billing/DisplayBill';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const binoculars = `${CDN_URL}billing/Billing_Invoices_Table_VIEWInv_Icon_102x30.png`;
const download = `${CDN_URL}billing/Billing_Invoices_Table_DOWNLOADInv_Icon_102x30.png`;

function onClick(loadSupportColumn, data) {
	console.log('NIamh LOAD SUPPORT COLUMN', data);
	loadSupportColumn(DisplayBill, data);
}

const AccordianItemDetails = ({
	headers,
	summary,
	details,
	theme,
	expanded,
	button1,
	button2,
	loadSupportColumn,
	downloadPdf,
}) => {
	const pdfLoadDetails = {
		invoiceId: summary.invoiceId,
		invoiceNumber: summary.invoiceNumber,
		downloadPdf,
	};

	return (
		<div className={`accordian-item-details ${expanded ? 'expanded' : ''}`}>
			{expanded && (
				<Fragment>
					<div className={`header ${theme.bannerColor}`}>
						{Object.values(headers).map(header => (
							<div className={`accordian-item-detail-header`}>{header}</div>
						))}
					</div>
					<div className='details-grid'>
						{details &&
							details.map(dataSet => {
								return (
									<div className='data-row'>
										{Object.keys(headers).map(header => (
											<div className={`accordian-detail-data-field`}>{dataSet[header]}</div>
										))}
									</div>
								);
							})}
					</div>
					<div className='buttons'>
						{button1 && (
							<img
								className='button1'
								src={binoculars}
								alt='view'
								onClick={() => onClick(loadSupportColumn, pdfLoadDetails)}
							/>
						)}
						{button2 && (
							<img
								className='button2'
								src={download}
								alt='download'
								onClick={() => downloadPdf(summary.invoiceId)}
							/>
						)}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default AccordianItemDetails;

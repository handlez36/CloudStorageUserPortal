import React from 'react';
import Plus from '../Common/Plus';
import Minus from '../Common/Minus';
import FullScreen from '../Common/Fullscreen';
import Print from '../Common/Print';
import Download from '../Common/Download';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const plus = `${CDN_URL}billing/Billing_INV_Enlarge.svg`;
const minus = `${CDN_URL}billing/Billing_INV_Reduce.svg`;

const InvoiceControls = ({
	pdfZoom,
	zoom,
	goFull,
	invoice,
	supportParams,
	numPages,
	nextPage,
	pageNumber,
	previousPage,
}) => {
	// Internet Explorer 6-11
	const isIE = /*@cc_on!@*/ false || !!document.documentMode;
	// Edge 20+
	const isEdge = !isIE && !!window.StyleMedia;
	const windows = isIE || isEdge;

	return (
		<div className='invoice-controls'>
			<div className='invoice-controls-layout'>
				<Plus width={20} pdfZoom={pdfZoom} />
				<div className='zoom'>{zoom}%</div>
				<Minus width={20} pdfZoom={pdfZoom} />
				<FullScreen width={20} goFull={goFull} />
				{windows === false && (
					<Print width={20} invoice={invoice} invoiceId={supportParams.invoiceId} />
				)}
				<Download
					width={20}
					downloadPdf={supportParams.downloadPdf}
					invoiceId={supportParams.invoiceId}
				/>
			</div>
			{pageNumber === numPages ? (
				<div className='changePage'>
					<span id='previousPage'>
						{pageNumber === 1 && <img src={minus} />}
						{pageNumber !== 1 && <img onClick={() => previousPage()} src={minus} />}
					</span>
					{pageNumber} / {numPages}
					<span id='nextPage'>
						<img src={plus} />
					</span>
				</div>
			) : (
				<div className='changePage'>
					<span id='previousPage'>
						{pageNumber === 1 && <img src={minus} />}
						{pageNumber !== 1 && <img onClick={() => previousPage()} src={minus} />}
					</span>
					{pageNumber} / {numPages}
					<span id='nextPage'>
						<img onClick={() => nextPage()} src={plus} />
					</span>
				</div>
			)}
		</div>
	);
};

export default InvoiceControls;

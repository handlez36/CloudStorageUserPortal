import React, { Component } from 'react';

import { BillingApi } from '../../services/billing';
import InvoicePdf from './InvoicePdf';
import InvoiceControls from './InvoiceControls';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const invoice_tab_current = `${CDN_URL}billing/Billing_Invoices_Current_Tab_90x82.svg`;
const pdfClearButtonActive = `${CDN_URL}billing/ModelXButton-Active.png`;
const pdfClearButtonDefault = `${CDN_URL}billing/ModelXButton-Default.png`;

class DisplayBill extends Component {
	constructor(props) {
		super(props);

		this.billingApi = new BillingApi();
		this.state = {
			invoice: null,
			zoom: 100,
			active: false,
			xOffset: null,
			yOffset: null,
			currentX: 0,
			currentY: 0,
			mouseX: null,
			mouseY: null,
			currZoom: 1,
			pageNumber: 1,
			numPages: null,
		};
	}

	goFull = () => {
		const pdf = document.querySelector('canvas');
		if (pdf) {
			if (document.documentElement.requestFullscreen) {
				pdf.requestFullscreen();
			} else if (document.documentElement.mozRequestFullscreen) {
				pdf.mozRequestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				pdf.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				pdf.msRequestFullscreen();
			}
		}
	};

	showPdf = invoiceId => {
		this.billingApi
			.get(invoiceId)
			.then(response => {
				this.viewPdfInPanel(response.data.file, invoiceId);
			})
			.catch(error => this.setState({ error }));
	};

	viewPdfInPanel(pdf) {
		const blob = this.billingApi.getPdfBlob(pdf);
		const fileUrl = URL.createObjectURL(blob);

		this.setState({ invoice: fileUrl });
	}

	dragStart = e => {
		const { xOffset, yOffset } = this.state;
		if (e.type === 'mousedown') {
			this.setState({
				initialX: e.clientX - xOffset,
				initialY: e.clientY - yOffset,
				active: true,
			});
		}
	};

	dragEnd = () => {
		const { currentX, currentY } = this.state;
		this.setState({
			initialX: currentX,
			initialY: currentY,
			active: false,
		});
	};

	drag = e => {
		const dragItem = document.querySelector('.canvas-holder');
		if (dragItem.transformOrigin === 'top left') {
			this.setState({
				currentX: 0,
				currentY: 0,
			});
		}
		const { active } = this.state;
		if (active) {
			const { initialX, initialY, currentX, currentY } = this.state;
			e.preventDefault();
			if (e.type === 'mousemove') {
				this.setState({
					currentX: e.clientX - initialX,
					currentY: e.clientY - initialY,
				});
			}
			this.setState({
				xOffset: currentX,
				yOffset: currentY,
			});
			this.setTranslate(currentX, currentY, dragItem);
		}
	};

	setTranslate(xPos, yPos, el) {
		const { zoom } = this.state;
		const zoomState = zoom / 100;
		const element = el;
		element.style.transform = `scale(${zoomState}) translate3d(${xPos}px, ${yPos}px, 0)`;
	}

	componentDidMount = () => {
		const { invoiceId } = this.props.supportParams;
		this.showPdf(invoiceId);
	};

	componentDidUpdate = (prevState, prevProps) => {
		const { zoom } = this.state;
		const { invoiceId } = this.props.supportParams;
		const canvas = document.querySelector('.canvas-holder');
		if (invoiceId !== prevState.supportParams.invoiceId) {
			this.showPdf(invoiceId);
		}
		if (canvas !== null) {
			if (zoom && zoom !== prevProps.zoom) {
				this.scalePDF(zoom);
			}
		}
	};
	onMouseOver = () => {
		document.getElementById('pdf-x-button').src = pdfClearButtonDefault;
	};
	onMouseOut = () => {
		document.getElementById('pdf-x-button').src = pdfClearButtonActive;
	};

	scalePDF = zoom => {
		const canvas = document.querySelector('.canvas-holder');
		const percent = zoom / 100;

		if (zoom === 100) {
			canvas.style.transform = `scale(1,1)`;
		} else {
			canvas.style.transform = `scale(${percent})`;
		}
	};

	pdfChangePage = () => {
		this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
		console.log('right ');
	};
	pdfPreviousPage = () => {
		this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));
		console.log('left ');
	};
	numPagesCallback = numPages => {
		this.setState({ numPages });
	};

	pdfZoom = data => {
		const { zoom } = this.state;
		if (data === 'subtract') {
			this.setState({ zoom: zoom - 10 });
		} else if (data === 'add') {
			this.setState({ zoom: zoom + 10 });
		}
		this.setState({
			currentX: 0,
			currentY: 0,
			initialX: 0,
			initialY: 0,
			xOffset: 0,
			yOffset: 0,
		});
	};

	zoomDoc = event => {
		const { currZoom } = this.state;
		const x = event.clientX;
		const y = event.clientY;
		const myCanvas = document.querySelector('canvas');

		const midpointX =
			(myCanvas.getBoundingClientRect().left +
				myCanvas.getBoundingClientRect().width +
				myCanvas.getBoundingClientRect().left) /
			2;
		const midpointY =
			(myCanvas.getBoundingClientRect().top +
				myCanvas.getBoundingClientRect().height +
				myCanvas.getBoundingClientRect().top) /
			2;
		let dx;
		let dy;
		let zoom;

		if (currZoom > 1) {
			dx = 0;
			dy = 0;
			zoom = 1;
		} else {
			dx = midpointX - x;
			dy = midpointY - y;
			zoom = 2.5;
		}

		myCanvas.setAttribute(
			`style`,
			`
        transform: scale(${zoom}) translateY(${dy}px) translateX(${dx}px)
      `,
		);

		this.setState({ currZoom: zoom });
	};

	render() {
		const { supportParams: { invoiceNumber = '' } = {} } = this.props;

		return (
			<div className='bill-wrapper'>
				<img
					id='pdf-x-button'
					src={pdfClearButtonActive}
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					onClick={() => this.props.unloadSupportColumn()}
				/>
				<div className='bill-container'>
					<div className='invoice-tab'>
						<img className='tab-img' src={invoice_tab_current} />
						<span className='current-invoice'>{invoiceNumber}</span>
					</div>
					<div
						className='display-bill'
						onMouseDown={this.dragStart}
						onMouseUp={this.dragEnd}
						onMouseMove={this.drag}
						onDoubleClick={this.zoomDoc}
					>
						<InvoicePdf
							invoice={this.state.invoice}
							numPages={this.numPagesCallback}
							pageNumber={this.state.pageNumber}
						/>
					</div>
					<InvoiceControls
						pdfZoom={this.pdfZoom}
						nextPage={this.pdfChangePage}
						previousPage={this.pdfPreviousPage}
						pageNumber={this.state.pageNumber}
						zoom={this.state.zoom}
						goFull={this.goFull}
						invoice={this.state.invoice}
						supportParams={this.props.supportParams}
						numPages={this.state.numPages}
					/>
				</div>
			</div>
		);
	}
}

export default DisplayBill;

import React, { Component } from 'react';
import { ReleaseApi } from '../../services/release';
import Plus from '../Common/Plus';
import Minus from '../Common/Minus';
import FullScreen from '../Common/Fullscreen';
import Print from '../Common/Print';
import PdfViewer from '../Billing/InvoicePdf';
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
	pageNumber,
	nextPage,
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

class DisplayRelease extends Component {
	constructor(props) {
		super(props);

		this.releaseApi = new ReleaseApi();
		this.state = {
			pdfFile: null,
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
		if (document.documentElement.requestFullscreen) {
			pdf.requestFullscreen();
		} else if (document.documentElement.mozRequestFullscreen) {
			pdf.mozRequestFullscreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			pdf.webkitRequestFullscreen();
		}
		setTimeout(() => {
			pdf.style.width = '50vw';
		}, 250);
		document.addEventListener('fullscreenchange', this.exitFull);
	};

	exitFull() {
		const pdf = document.querySelector('canvas');
		pdf.style.width = '100%';
	}

	showPdf = releaseKey => {
		this.releaseApi
			.get(releaseKey)
			.then(response => {
				this.viewPdfInPanel(response.data.file, releaseKey);
			})
			.catch(error => this.setState({ error }));
	};

	viewPdfInPanel(pdf) {
		const blob = this.getPdfBlob(pdf);
		const fileUrl = URL.createObjectURL(blob);

		this.setState({ pdfFile: fileUrl });
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
		el.style.transform = `scale(${zoomState}) translate3d(${xPos}px, ${yPos}px, 0)`;
	}

	getPdfBlob(pdf) {
		const binary = atob(pdf.replace(/\s/g, ''));
		const length = binary.length;
		const buffer = new ArrayBuffer(length);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < length; i++) {
			view[i] = binary.charCodeAt(i);
		}

		// Create Blob from ArrayBuffer
		const blob = new Blob([view], { type: 'application/pdf' });

		return blob;
	}

	removeDiv = () => {
		const span = document.querySelector('.current-invoice');
		span.remove();
	};

	componentDidMount = () => {
		const { releaseKey } = this.props.supportParams;
		this.showPdf(releaseKey);
	};

	componentDidUpdate = (prevState, prevProps) => {
		const { zoom } = this.state;
		const { invoiceId } = this.props.supportParams;
		const canvas = document.querySelector('.canvas-holder');
		if (invoiceId !== prevState.supportParams.invoiceId) {
			this.showPdf(invoiceId);
			this.removeDiv();
			this.updateInvoiceNumber();
		}
		if (canvas !== null) {
			if (zoom !== prevProps.zoom) {
				this.scalePDF(zoom);
			}
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

	scalePDF = zoom => {
		const canvas = document.querySelector('.canvas-holder');
		const percent = zoom / 100;
		if (zoom === 100) {
			canvas.style.transform = `scale(1,1)`;
			canvas.style.transformOrigin = `top left`;
		} else if (zoom < 100) {
			canvas.style.transform = `scale(${percent})`;
			canvas.style.transformOrigin = `top left`;
		} else if (zoom > 100) {
			canvas.style.transform = `scale(${percent})`;
			canvas.style.transformOrigin = `top left`;
		}
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
		return (
			<div className='bill-wrapper'>
				<div className='bill-container'>
					<div
						className='display-bill'
						onMouseDown={this.dragStart}
						onMouseUp={this.dragEnd}
						onMouseMove={this.drag}
						onDoubleClick={this.zoomDoc}
					>
						<PdfViewer
							pageNumber={this.state.pageNumber}
							numPages={this.numPagesCallback}
							invoice={this.props.supportParams.pdfFile}
						/>
					</div>
					<InvoiceControls
						pdfZoom={this.pdfZoom}
						zoom={this.state.zoom}
						nextPage={this.pdfChangePage}
						previousPage={this.pdfPreviousPage}
						pageNumber={this.state.pageNumber}
						goFull={this.goFull}
						invoice={this.props.supportParams.pdfFile}
						supportParams={this.props.supportParams}
						numPages={this.state.numPages}
					/>
				</div>
			</div>
		);
	}
}

export default DisplayRelease;

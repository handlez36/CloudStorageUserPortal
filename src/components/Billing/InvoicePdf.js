import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class InvoicePdf extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: null,
		};
	}

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
		this.props.numPages(numPages);
	};

	render() {
		return (
			<div className='canvas-holder'>
				{this.props.invoice && (
					<Document file={this.props.invoice} onLoadSuccess={this.onDocumentLoadSuccess}>
						<Page pageNumber={this.props.pageNumber} scale={2} />
					</Document>
				)}
			</div>
		);
	}
}

export default InvoicePdf;

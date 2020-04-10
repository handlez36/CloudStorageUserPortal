import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Progress } from 'react-sweet-progress';
import SubmitButton from '../../../../components/Common/COMPANYButton';
import { AttachmentApi } from '../../../../services/attachment';
import { TICKET_ATTACHMENT_PHASE as PHASE } from '../../TicketConstants';

import BrowseButton from '../../../../components/Common/BrowseButton';

import 'react-sweet-progress/lib/style.css';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const IconDownloadPDF = `${CDN_URL}support/icon-download-pdf.svg`;
const ExitIcon = `${CDN_URL}support/icons-close-small.svg`;

class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.phase = null;
		this.state = {
			attachments: [],
			error: null,
			scannedAttachmentIds: [],
			erroredAttachmentIds: [],
			attachmentsComplete: false,
			percentage: null,
		};
	}

	resetState = () => {
		this.setState({
			attachments: [],
			scannedAttachmentIds: [],
			erroredAttachmentIds: [],
			attachmentsComplete: false,
			percentage: null,
		});
	};

	onDrop = acceptedFiles => {
		this.setState({ error: null });

		acceptedFiles.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				const fileAsArrayBuffer = reader.result;
				const attachment = {
					filename: file.name,
					size: file.size,
					file: fileAsArrayBuffer,
					type: file.type,
				};
				if (AttachmentApi.isValidAttachmentType(attachment)) {
					this.setState(state => state.attachments.push(attachment));
				} else {
					this.setState(
						state => (state.error = `Sorry, we do not support uploads of type ${attachment.type}`),
					);
				}
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');

			reader.readAsArrayBuffer(file);
		});
	};

	onAttach = async () => {
		const { attachments } = this.state;
		const scannedAttachmentIds = [];
		const errorAttachmentIds = [];

		if (attachments.length < 1) {
			this.setState({ error: 'No new tickets uploaded yet!' });
			return;
		}

		attachments.forEach(async (attachment, index) => {
			const { file, type } = attachment;
			const intervals = {};
			let retrieveResponse;
			console.log('about to upload file #' + index);
			const scanResponse = await AttachmentApi.scanFile(file, type);
			const { data: { data_id } = {} } = scanResponse;

			this.setState({ percentage: scanResponse.percentCompleted });

			if (scanResponse.status === 200 && data_id) {
				percentage = 50;
				intervals[index] = setInterval(async () => {
					retrieveResponse = await AttachmentApi.getScannedFile(data_id);

					if (retrieveResponse.status === 200) {
						if (retrieveResponse.data.scan_results.progress_percentage === 100) {
							if (
								retrieveResponse.data.scan_results.scan_all_result_a === 'No threat detected' &&
								retrieveResponse.data.sanitized &&
								retrieveResponse.data.sanitized.file_path
							) {
								percentage = 100;

								clearInterval(intervals[index]);
								intervals[index] = false;
								const { data: { data_id } = {} } = retrieveResponse;

								scannedAttachmentIds.push({ ...attachment, file: null, data_id, success: true });
								this.checkFileAttachmentCompletion(
									scannedAttachmentIds,
									errorAttachmentIds,
									attachments,
								);
							} else {
								errorAttachmentIds.push({
									...attachment,
									file: null,
									error: `Threats detected or could not sanitize`,
								});
								clearInterval(intervals[index]);
								intervals[index] = false;
								this.checkFileAttachmentCompletion(
									scannedAttachmentIds,
									errorAttachmentIds,
									attachments,
								);
							}
						}
					} else {
						errorAttachmentIds.push({ ...attachment, file: null, error: `Failure scanning file` });
						this.checkFileAttachmentCompletion(
							scannedAttachmentIds,
							errorAttachmentIds,
							attachments,
						);
					}
				}, 2000);

				setTimeout(() => {
					if (intervals[index]) {
						errorAttachmentIds.push({ ...attachment, file: null, error: `Scan timeout` });
						clearInterval(intervals[index]);
						intervals[index] = false;
						this.checkFileAttachmentCompletion(
							scannedAttachmentIds,
							errorAttachmentIds,
							attachments,
						);
					}
				}, 30000);
			} else {
				errorAttachmentIds.push({ ...attachment, file: null, error: `Scan Id retrieval error` });
				this.checkFileAttachmentCompletion(scannedAttachmentIds, errorAttachmentIds, attachments);
			}
		});
	};

	checkFileAttachmentCompletion = (successes, errors, attachments) => {
		const { saveAttachments } = this.props;
		const { scannedAttachmentIds: existingAttachments } = this.state;

		if (successes.length + errors.length === attachments.length) {
			if (successes.length === 0 && errors.length > 0) {
				let err = '';

				errors.map(error => {
					return (err += `\n${error.filename} - ${error.error}`);
				});
				this.setState({ error: `Ticket upload failed.${err}` });
			} else if (successes.length > 0 || errors.length > 0) {
				setTimeout(() => {
					saveAttachments(successes, errors);
					this.setState({
						attachments: [],
						scannedAttachmentIds: existingAttachments.concat(successes),
						errorAttachmentIds: errors,
					});
				}, 2000);
			}
		}
	};

	toggleOpen = () => {
		const { toggle } = this.props;
		this.setState({ attachments: [], error: null }, toggle());
	};

	renderBrowseButton = () => {
		return (
			<Dropzone onDrop={this.onDrop} disableClick>
				{({ getRootProps, getInputProps, open }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<BrowseButton title='' enabled={true} onClick={() => open()} />
					</div>
				)}
			</Dropzone>
		);
	};

	renderAttachments = () => {
		const { attachments: newAttachments, scannedAttachmentIds: existingAttachments } = this.state;
		const attachments = newAttachments.concat(existingAttachments);

		return attachments.map((attachment, index) => {
			let status = 'default';
			let percentage = '0';
			if (attachment.success) {
				status = 'success';
				percentage = '100';
			} else if (attachment.error) {
				status = 'error';
				percentage = '100';
			}

			const ProgressBar = () => {
				return (
					<Progress
						theme={{
							error: {
								trailColor: 'pink',
								color: 'red',
							},
							default: {},
							active: {
								trailColor: 'lightblue',
								color: 'blue',
							},
							success: {
								trailColor: 'lime',
								color: 'green',
							},
						}}
					/>
				);
			};

			return (
				<div key={`${attachment.filename}-${index}`} className={`attachment-row ${status}`}>
					<div className='middle-container'>
						<div className='middle-left-container'>
							<img className='icon-download-pdf' src={IconDownloadPDF} alt='download' />
						</div>
						<div className='middle-middle-container'>
							<div className='first-item'>
								<div className='text-block'>{attachment.filename}</div>
							</div>
							<ProgressBar />
							<div className='third-item'>
								<div className='percentage'>{percentage}%</div>
								<div className='download-speed' />
							</div>
						</div>
						<div className='middle-right-container'>
							<img className='icons-close-small' src={ExitIcon} alt='Exit' />
						</div>
					</div>
				</div>
			);
		});
	};

	isStatePopulated = () => {
		const {
			attachments,
			scannedAttachmentIds,
			erroredAttachmentIds,
			attachmentsComplete,
		} = this.state;

		return (
			attachments.length > 0 ||
			scannedAttachmentIds.length > 0 ||
			erroredAttachmentIds.length > 0 ||
			attachmentsComplete
		);
	};

	UNSAFE_componentWillUpdate = () => {
		const { phase } = this.props;
		const statePopulated = this.isStatePopulated();

		if (
			(phase === PHASE.TICKET_SUBMITTED && statePopulated) ||
			(phase === PHASE.NOT_STARTED && this.phase !== PHASE.NOT_STARTED)
		) {
			this.phase = phase;
			this.resetState();
		} else {
			this.phase = phase;
		}
	};

	componentDidMount = () => {
		const { attachments } = this.props;

		if (attachments) {
			this.setState({ attachments });
		}
	};

	render() {
		const { attachments, scannedAttachmentIds } = this.state;
		const existingAttachments = scannedAttachmentIds.concat(attachments);

		return (
			<div className='upload-component'>
				<div className='top-container'>
					<div className='left-column'>
						<div className='browse-container'>{this.renderBrowseButton()}</div>
						<div className='submit-button-container'>
							<SubmitButton
								title='SUBMIT'
								enabled={existingAttachments.length > 0}
								onClick={this.onAttach}
							/>
						</div>
					</div>
					<div className='middle-column'>
						<PerfectScrollbar>
							{existingAttachments.length > 0 && this.renderAttachments()}
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		);
	}
}

export default FileUpload;

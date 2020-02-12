import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Modal from '../../../../components/Common/PortalModal';
import BrowseButton from '../../../../components/Common/BloxButton';
import AttachButton from '../../../../components/Common/BloxButton';
import { ExitButton } from '../../../../components/Common/ExitButton';
import { AttachmentApi } from '../../../../services/attachment';
import { TICKET_ATTACHMENT_PHASE as PHASE } from '../../TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const PurpleProgressCircle = `${CDN_URL}support/Support_DownloadProgressIcons_Support_Circle-PurpleBase.svg`;
const SingleAttachmentStatusImage = `${CDN_URL}support/Support_CheckCircle_Icon_Green.svg`;

class AttachmentModal extends Component {
	constructor(props) {
		super(props);

		this.phase = null;
		this.state = {
			attachments: [],
			error: null,
			scannedAttachmentIds: [],
			erroredAttachmentIds: [],
			attachmentsComplete: false,
		};
	}

	resetState = () => {
		this.setState({
			attachments: [],
			scannedAttachmentIds: [],
			erroredAttachmentIds: [],
			attachmentsComplete: false,
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

			const scanResponse = await AttachmentApi.scanFile(file, type);
			const { data: { data_id } = {} } = scanResponse;

			const el = document.querySelector(`.indicator-${index}`);
			const statusElement = document.querySelector(`.status-${index}`);
			const percentage = document.querySelector(`.percentage-${index}`);

			if (scanResponse.status === 200 && data_id) {
				el.setAttribute('style', 'stroke-dashoffset: 110;');
				percentage.textContent = '50%';
				intervals[index] = setInterval(async () => {
					retrieveResponse = await AttachmentApi.getScannedFile(data_id);

					if (retrieveResponse.status === 200) {
						if (retrieveResponse.data.scan_results.progress_percentage === 100) {
							if (retrieveResponse.data.scan_results.scan_all_result_i === 0) {
								el.setAttribute('style', 'stroke-dashoffset: 0;');
								statusElement.setAttribute('style', 'opacity: 1;');
								percentage.textContent = '100%';

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
						<BrowseButton title='BROWSE' enabled={true} onClick={() => open()} />
					</div>
				)}
			</Dropzone>
		);
	};

	renderAttachments = () => {
		const { attachments: newAttachments, scannedAttachmentIds: existingAttachments } = this.state;
		const attachments = newAttachments.concat(existingAttachments);

		return attachments.map((attachment, index) => {
			let status = '';
			let percentage = 0;
			if (attachment.success) {
				status = 'scanned-successfully';
				percentage = 100;
			} else if (attachment.error) {
				status = 'scanned-with-errors';
				percentage = 100;
			}

			const GreenCircle = () => {
				return (
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80.99 80.99'>
						<circle
							className={`indicator indicator-${index}`}
							cx='50%'
							cy='50%'
							r='35'
							stroke='#BBD053'
							fill='transparent'
							stroke-width='10'
						/>
						<text
							className={`percentage percentage-${index}`}
							x='50%'
							y='50%'
							text-anchor='middle'
							stroke='white'
							stroke-width='2px'
							dy='.3em'
						>
							{percentage}%
						</text>
					</svg>
				);
			};

			return (
				<div key={`${attachment.filename}-${index}`} className={`attachment-row ${status}`}>
					<div className='progress-icon'>
						<GreenCircle />
						<img
							className='progress-background'
							src={PurpleProgressCircle}
							alt='attachment-progress'
						/>
					</div>
					<div className='file-name'>{attachment.filename}</div>
					<div className={`status status-${index}`}>
						<img src={SingleAttachmentStatusImage} alt='status' />
						<div className='file-size'>{attachment.size}</div>
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
		const { isOpen } = this.props;
		const { attachments, scannedAttachmentIds, error } = this.state;
		const existingAttachments = scannedAttachmentIds.concat(attachments);

		return (
			<Modal
				additionalClass='attachment-modal'
				header='UPLOAD FILES'
				footer=''
				buttonText={'ATTACH'}
				isOpen={isOpen}
				toggleOpen={this.toggleOpen}
				onSubmit={() => {}}
				submitEnabled={true}
			>
				<div className='wrapper'>
					<div className='exit-button-section'>
						<ExitButton redirectTo={this.toggleOpen} />
					</div>
					{error && <div className='error'>Error: {error}</div>}
					<div className='attachment-options-section'>
						{this.renderBrowseButton()}
						<AttachButton title='ATTACH TO COMMENT' enabled={true} onClick={this.onAttach} />
					</div>
					<div className='attachment-display-section'>
						{existingAttachments.length > 0 && this.renderAttachments()}
					</div>
				</div>
			</Modal>
		);
	}
}

export default AttachmentModal;

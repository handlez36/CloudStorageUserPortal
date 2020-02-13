import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { string } from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import FileUpload from '../Common/FileUpload';
import { AttachmentApi } from '../../services/attachment';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const UploadImage = `${CDN_URL}support/button-upload-file-hover.svg`;

class UploadSection extends Component {
	state = {
		open: false,
		attachments: null,
		error: null,
		scannedAttachmentIds: [],
		erroredAttachmentIds: [],
		attachmentsComplete: false,
	};

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
					id: `${file.lastModified}`,
					filename: file.name,
					size: file.size,
					file: fileAsArrayBuffer,
					type: file.type,
					percentComplete: 0,
					speed: '0 kb / sec',
				};
				if (AttachmentApi.isValidAttachmentType(attachment)) {
					this.setState(state => {
						state.attachments = state.attachments || [];
						state.attachments.push(attachment);
						return state;
					}, this.onAttach);
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

	updateFileProgressDisplay = id => {
		const uploadEl = document.querySelector(`.file-upload-${id} .file-upload-progress`);
		const fileRemoveEl = document.querySelector(`.file-upload-${id} .delete-file-link`);
		const percentCompleteEl = document.querySelector(`.file-upload-${id} .percent-complete`);
		const speedEl = document.querySelector(`.file-upload-${id} .speed`);
		const sizeEl = document.querySelector(`.file-upload-${id} .file-size`);

		if (percentComplete >= 100 && uploadEl && fileRemoveEl) {
			setTimeout(() => {
				uploadEl.setAttribute('style', 'display: none');
				fileRemoveEl.setAttribute('style', 'display: flex');

				percentCompleteEl.setAttribute('style', 'display: none');
				speedEl.setAttribute('style', 'display: none');
				sizeEl.setAttribute('style', 'display: block');
			}, 1000);
		}
	};

	updateFileUploadProgress = () => (file, percentComplete, speed) => {
		const { attachments } = this.state;
		const matchingAttachmentIndex = attachments.indexOf(file);
		const percentageCap = 1;

		if (matchingAttachmentIndex !== -1) {
			attachments[matchingAttachmentIndex] = {
				...attachments[matchingAttachmentIndex],
				percentComplete: Math.min(percentComplete * percentageCap, 99),
				speed,
			};
			this.setState({ attachments });
		}
	};

	onRemove = id => {
		const { attachments } = this.state;
		const attachmentMatches = attachments.filter(att => att.id === id);

		if (attachmentMatches && attachmentMatches.length === 1) {
			const index = attachments.indexOf(attachmentMatches[0]);
			const updatedAttachments = [...attachments];
			updatedAttachments.splice(index, 1);

			this.checkFileAttachmentCompletion(updatedAttachments, [], updatedAttachments);
			this.setState({ attachments: updatedAttachments });
		}
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
			const { type } = attachment;
			if (!attachment.data_id) {
				const scanResponse = await AttachmentApi.scanFile(
					attachment,
					type,
					this.updateFileUploadProgress(attachment.id),
				);
				const { data: { data_id } = {} } = scanResponse;

				if (scanResponse.status === 200 && data_id) {
					scannedAttachmentIds.push({
						...attachment,
						percentComplete: 99,
						data_id,
						success: true,
					});
					this.setState(state => {
						state.attachments[index] = { ...state.attachments[index], data_id };
						return state;
					});
					setTimeout(() => {
						this.setState(
							state => {
								state.attachments[index] = { ...state.attachments[index], percentComplete: 100 };
								return state;
							},
							() =>
								this.checkFileAttachmentCompletion(
									this.state.attachments,
									errorAttachmentIds,
									attachments,
								),
						);
					}, 1000);
				} else {
					errorAttachmentIds.push({ ...attachment, file: null, error: `Failure uploading file` });
				}
			} else {
				scannedAttachmentIds.push({ ...attachment });
				this.checkFileAttachmentCompletion(scannedAttachmentIds, errorAttachmentIds, attachments);
			}
		});
	};

	checkFileAttachmentCompletion = (successes, errors, attachments) => {
		const { onUpdate } = this.props;

		if (successes.length + errors.length === attachments.length) {
			if (successes.length === 0 && errors.length > 0) {
				let err = '';

				errors.map(error => {
					return (err += `\n${error.filename} - ${error.error}`);
				});
				this.setState({ error: `Ticket upload failed.${err}` });
			} else if (successes.length >= 0 || errors.length > 0) {
				setTimeout(() => {
					if (onUpdate) {
						onUpdate(successes);
					}
				}, 200);
			}
		}
	};

	renderBrowseButton = () => {
		return (
			<Dropzone onDrop={this.onDrop} disableClick>
				{({ getRootProps, getInputProps, open }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<div className='icon'>
							<img
								src={UploadImage}
								alt='upload'
								onClick={() => {
									this.setState({ open: true });
									open();
								}}
							/>
						</div>
					</div>
				)}
			</Dropzone>
		);
	};

	renderAttachments = () => {
		const { attachments: newAttachments, scannedAttachmentIds: existingAttachments } = this.state;
		const attachments =
			newAttachments && existingAttachments ? newAttachments.concat(existingAttachments) : [];

		return attachments.reverse().map(attachment => {
			const fileDetails = {
				title: attachment.filename,
				percentComplete: attachment.percentComplete || 0,
				speed: attachment.speed,
				size: attachment.size,
			};

			return (
				<FileUpload
					key={attachment.id}
					id={attachment.id}
					file={attachment}
					fileDetails={fileDetails}
					remove={this.onRemove}
				/>
			);
		});
	};

	getUploadCount = () => {
		const { attachments } = this.state;
		if (!attachments) return 'No files attached';

		const completedAttachments = attachments.filter(
			attachment => attachment.percentComplete >= 100,
		);

		return attachments.length > 0
			? `Uploaded ${completedAttachments.length}/${attachments.length} files`
			: 'No files attached';
	};

	initalizeState = attachments => {
		this.setState({ attachments, open: true });
	};

	componentDidUpdate() {
		const { attachments } = this.props;
		const { attachments: existingAttachments } = this.state;
		if (attachments && attachments.length > 0 && !existingAttachments) {
			this.initalizeState(attachments);
		}
	}

	componentDidMount() {
		const { attachments } = this.props;
		if (attachments && attachments.length > 0) {
			this.initalizeState(attachments);
		}
	}

	render() {
		const { title } = this.props;
		const { open } = this.state;

		return (
			<div className='upload-section'>
				<div className='top-upload-section'>
					<div className='title body-copy-small-regular'>{title}</div>
					<div className='status body-copy-small-regular'>{this.getUploadCount()}</div>
				</div>
				<div className='bottom-upload-section'>
					{this.renderBrowseButton()}
					<div className={`upload-wrapper ${open ? 'open' : 'closed'}`}>
						<div className='upload-content'>
							<Scrollbar disableTracksWidthCompensation noScrollX>
								{this.renderAttachments()}
							</Scrollbar>
						</div>
						<div className='filter' />
					</div>
				</div>
			</div>
		);
	}
}

UploadSection.propTypes = {
	title: string,
};

UploadSection.defaultProps = {
	title: 'Upload Supporting Documentation',
};

export default UploadSection;

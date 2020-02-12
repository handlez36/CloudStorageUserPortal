import React from 'react';
import { string, shape, number } from 'prop-types';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import { AttachmentApi } from '../../services/attachment';

function getStatusClass(fileDetails) {
	return fileDetails.percentComplete === 100 ? 'complete' : 'in-progress';
}

const FileUpload = ({ id, fileDetails, remove }) => {
	return (
		<div className={`file-upload file-upload-${id} ${getStatusClass(fileDetails)}`}>
			{/** Upload icon */}
			<div className='file-upload-icon'>
				<img src={AttachmentApi.getFileTypeIcon(fileDetails.title)} alt='upload' />
			</div>

			{/** File upload details */}
			<div className={`file-upload-details`}>
				<div className='file-upload-title body-copy-small-regular'>{fileDetails.title}</div>
				<div className='file-upload-progress'>
					<Progress percent={fileDetails.percentComplete} />
				</div>
				<div className='progress-details'>
					<div className='file-size body-copy-small-regular'>
						{AttachmentApi.formatBytes(fileDetails.size)}
					</div>
					<div className='percent-complete body-copy-small-regular'>
						{fileDetails.percentComplete} %
					</div>
					<div className='speed body-copy-small-regular'>{fileDetails.speed}</div>
				</div>
			</div>

			{/** File delete icon */}
			<div className={`delete-file-link body-copy-small-regular`} onClick={() => remove(id)}>
				X
			</div>
		</div>
	);
};

FileUpload.propTypes = {
	fileDetails: shape({
		title: string,
		percentComplete: number,
		speed: string,
	}),
};

FileUpload.defaultProps = {
	fileDetails: {
		title: 'test_document_upload',
		percentComplete: 0,
		speed: '96kb / sec',
	},
};

export default FileUpload;

import React from 'react';

// import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import { RIEInput } from 'riek';

export const InfoTableNew = props => {
	return props.profile.map(row => {
		const isDisabled = row.isDisabled || props.isDisabled;
		const isMultiple = !!row.multiple;
		return (
			<tr key={row.propName}>
				<td className='field-name'>{row.name}</td>
				{isMultiple && (
					<td className='field-value' key={row.value}>
						{row.fields.map(field => {
							return (
								<div id={field.propName} key={field.value}>
									<RIEInput
										isDisabled={isDisabled}
										className={`${isDisabled ? 'non-' : ''}editable-field`}
										value={field.value}
										propName={field.propName}
										change={props.onChange}
									/>

									<br />
								</div>
							);
						})}
					</td>
				)}
				{!isMultiple && (
					<td className='field-value' key={row.value}>
						<RIEInput
							isDisabled={isDisabled}
							className={`${isDisabled ? 'non-' : ''}editable-field`}
							value={row.value}
							propName={row.propName}
							change={props.onChange}
						/>
					</td>
				)}
			</tr>
		);
	});
};

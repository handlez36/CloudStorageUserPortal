import React, { Component } from 'react';

import AddNewButton from '../../../components/Common/COMPANYButton';

class WhiteListForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			entries: null,
		};
	}

	onChange = event => {
		const { name, value } = event.target;
		const num = name.match(/\d+/)[0];

		const { entries } = this.state;
		const entryToUpdate = entries[num];

		console.log('Name: ', name);
		console.log('Value: ', value);
		console.log('Num: ', num);

		entryToUpdate['ipAddress'] = value;
		entries[num] = entryToUpdate;

		this.setState({ entries });
	};

	componentDidMount() {
		console.log('In Component Did Mount');
		const { entries } = this.props;

		let stateEntries = entries.map((entry, index) => entry);

		this.setState({ entries: stateEntries });
	}

	render() {
		console.log('In Render');
		const { onChange, onClickAdd, entries } = this.props;

		console.log('Rendering form with state: ', this.state);
		return (
			<div className='white-list'>
				{entries &&
					entries.map((entry, index) => {
						return [
							<input
								name={`whitelist-input-${index}`}
								className='whitelist-entry'
								onChange={onChange}
								value={entry.ipAddress}
							/>,
							<br />,
						];
					})}
				<AddNewButton title='Add Another IP +' enabled={true} onClick={onClickAdd} />
			</div>
		);
	}
}

export default WhiteListForm;

import React from 'react';

class Radio extends React.Component {
	constructor(props) {
		super(props);
		// initial gender state set from props
		this.state = {
			selectedValue: this.props.selected || null,
		};
	}

	handleOptionChange = event => {
		this.setState(
			{
				selectedValue: event.target.value,
			},
			() => {
				this.selectedValue();
			},
		);
	};

	selectedValue = () => {
		if (this.props.callback) {
			this.props.callback(this.state.selectedValue);
		}
	};

	setInitialValue = selectedValue => {
		this.setState({ selectedValue });
	};

	componentDidMount() {
		const { value } = this.props;

		if (value) {
			this.setInitialValue(value);
		}
	}

	componentDidUpdate() {
		const { value: incomingValue } = this.props;
		const { selectedValue: currentValue } = this.state;

		if (currentValue !== incomingValue) {
			this.setInitialValue(incomingValue);
		}
	}

	render() {
		const { name, hidden, toggle, options, label } = this.props;
		return (
			<div className={`radio-wrapper ${name}`}>
				{!hidden && toggle && (
					<form className='options'>
						{label && <div className='label'>{label}</div>}
						{options.map(row => {
							return (
								<span key={row.value}>
									<label>
										<input
											type='radio'
											value={row.value}
											name={row.name}
											onClickCapture={row.clickCallback}
											checked={this.state.selectedValue === row.value}
											onChange={this.handleOptionChange}
										/>
										<div className={'check'} />
										<span className='detail-wrapper'>
											<div className={'radio-label'}>{row.name}</div>
											<span className='radio-label-details'>{row.details}</span>
										</span>
									</label>
								</span>
							);
						})}
					</form>
				)}
			</div>
		);
	}
}

export default Radio;

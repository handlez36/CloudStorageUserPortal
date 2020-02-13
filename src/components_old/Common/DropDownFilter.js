import React, { Component, Fragment } from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const buttonSortArrow = `${CDN_URL}common/buttons-sort-arrow@3x.png`;

class DropDownFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOpen: false,
			headerTitle: '',
			sortArrow: false,
		};
	}

	dropDownMenu = options => {
		return (
			<ul className='dd-list-ul'>
				{options.map(option => (
					<li
						className='list-item'
						onClick={() => this.selected(option.value)}
						key={`dd-${option.value}`}
						value={option.value}
					>
						{option.displayValue || option.value}
					</li>
				))}
			</ul>
		);
	};

	selected = option => {
		const { id } = this.props;
		if (this.props.callback) {
			this.props.callback(option);
		}
		if (this.props.changeIcon) {
			this.props.changeIcon(id);
		}
		this.setState({ headerTitle: option });
	};

	toggleList = () => {
		const { customDropdownOpen, customDropdownClose, id, options } = this.props;
		const { listOpen: currentOpenState } = this.state;

		if (!currentOpenState && customDropdownOpen) {
			setTimeout(() => {
				customDropdownOpen(id, this.refs['drop-down-menu']);
			}, 100);
		} else if (currentOpenState && customDropdownClose) {
			// closeDropdown(this.refs['drop-down-menu']);
			customDropdownClose();
		}

		this.setState(prevState => ({
			listOpen: !prevState.listOpen,
		}));
	};

	sortArrow = () => {
		if (this.props.sortArrowSelected) {
			this.setState(
				{
					sortArrow: !this.state.sortArrow,
				},
				() => {
					this.props.sortArrowSelected(this.state.sortArrow);
				},
			);
		}
	};

	focusOut = () => {
		console.log('Onblur');
		const { icon, id } = this.props;
		if (icon && id) {
			document.getElementById(id).src = icon;
		}
	};

	componentDidUpdate() {
		const { headerTitle: existingHeaderTitle } = this.state;
		const { title: incomingHeaderTitle } = this.props;

		if (existingHeaderTitle !== incomingHeaderTitle) {
			this.setState({ headerTitle: incomingHeaderTitle });
		}
	}

	componentDidMount() {
		const { title: incomingHeaderTitle } = this.props;
		if (incomingHeaderTitle) {
			this.setState({ headerTitle: incomingHeaderTitle });
		}
	}

	render() {
		const {
			options,
			className,
			description,
			label,
			customWrapper,
			icon,
			id,
			iconStyle,
			customDropdownOpen,
		} = this.props;

		return (
			<Fragment>
				<div
					className={customWrapper ? customWrapper : 'default-filter-wrapper'}
					onClick={() => this.toggleList()}
				>
					<div className={className ? className : 'default-filter'}>
						{description && <span className='description'>{description}</span>}
						<span className='label'>{label}</span>
						{icon && <img className={iconStyle} id={id} src={icon} />}
						<span className='dd-title'> {this.state.headerTitle}</span>
						{(this.state.listOpen || customDropdownOpen) && (
							<ul ref='drop-down-menu' className='dd-list-ul'>
								{options.map(option => (
									<li
										className='list-item'
										onClick={() => this.selected(option.value)}
										key={`dd-${option.value}`}
										value={option.value}
									>
										{option.displayValue || option.value}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				{this.props.sortButton && (
					<img onClick={this.sortArrow} className='sort-arrow' src={buttonSortArrow} />
				)}
			</Fragment>
		);
	}
}

export default DropDownFilter;

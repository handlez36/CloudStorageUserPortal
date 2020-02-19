import React, { Component, Fragment } from 'react';
import { string, element } from 'prop-types';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const upIcon = `${CDN_URL}common/icons-arrow-circle@3x.png`;
const downIcon = `${CDN_URL}common/buttons-arrow-circle-small@3x.png`;

class LargeCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
		};
	}

	onClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		const { description, button, title, customClass, image } = this.props;
		const { expanded } = this.state;

		return (
			<div onClick={this.onClick} className={`large-card ${expanded ? 'expanded' : ''}`}>
				<div className={`image ${customClass ? customClass : ''}`}>
					<img src={image} />
				</div>
				<div className={`label ${expanded ? 'expanded' : ''}`}>
					<span>{title}</span>
					<img src={expanded ? upIcon : downIcon} alt='expand' />
				</div>
				{expanded && (
					<div className='expanded-description'>
						<div className='description'>{description}</div>
						<div className='button'>{button}</div>
					</div>
				)}
			</div>
		);
	}
}

LargeCard.propTypes = {
	description: string,
	button: element,
	title: string,
	image: string,
	customClass: string,
};

export default LargeCard;

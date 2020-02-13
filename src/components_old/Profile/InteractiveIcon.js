import React, { Component } from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const BackgroundImg = `${CDN_URL}profile/services-background-fill.svg`;
const DefaultIcon = `${CDN_URL}profile/Profile_Default_Service_Icon.svg`;

class InteractiveIcon extends Component {
	state = {
		showFront: true,
	};

	toggleIcon = () => {
		this.setState(state => ({ showFront: !state.showFront }));
	};

	showFront = () => {
		this.setState({ showFront: true });
	};

	showBack = () => {
		this.setState({ showFront: false });
	};

	displayLocations = () => {
		const { hoverContent, title } = this.props;
		let services = [];
		if (title === 'Storage' || title === 'Colocation') {
			services = [
				{ serviceName: 'Atlanta', active: false },
				{ serviceName: 'Birmingham', active: false },
				{ serviceName: 'Chattanooga', active: false },
				{ serviceName: 'Huntsville', active: false },
			];
		} else {
			services = [
				{ serviceName: 'Dedicated Ethernet Services', active: false },
				{ serviceName: 'Ethernet Services Cloud Ramp', active: false },
			];
		}
		for (const content of hoverContent) {
			for (const service of services) {
				if (service.serviceName === content.subService) {
					service.active = true;
				}
			}
		}

		this.setState({ services });
	};

	render() {
		const { title, hoverContent } = this.props;
		const { showFront } = this.state;

		return (
			<div className='interactive-icon'>
				{/* <img className='shadow-new' src={Shadow} /> */}
				<img className='background' src={BackgroundImg} />
				<div
					className={`content ${showFront ? 'front' : 'back'}`}
					onMouseOver={this.showBack}
					onMouseLeave={this.showFront}
				>
					<img className='icon' src={DefaultIcon} />
					<div className={`title`} id={title}>
						{title}
					</div>
					<div className={`back-content`}>
						{hoverContent &&
							hoverContent.map((content, index) => {
								return [
									<div key={index} className={content.active ? 'active' : 'inactive'}>
										{content.serviceName}
									</div>,
								];
							})}
						<br />
					</div>
				</div>
				{/* {(showFront || !hoverContent) && (
					<div className='icon-front'>
						<img
							className='icon'
							src={DefaultIcon}
							onMouseOver={this.showBack}
							onMouseLeave={this.showFront}
						/>
						<div className='title'>{title}</div>
					</div>
				)}
				{!showFront && hoverContent && (
					<div className='icon-back'>
						<div onMouseOver={this.showBack} onMouseLeave={this.showFront}>
							<img
								className='icon'
								src={DefaultIcon}
								onMouseOver={this.showBack}
								onMouseLeave={this.showFront}
							/>
							{hoverContent}
						</div>
					</div>
				)} */}
			</div>
		);
	}
}

export default InteractiveIcon;

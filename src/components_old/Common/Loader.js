import React, { PureComponent } from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Tumblr = `${CDN_URL}common/tumblr_540.gif`;

const ANIMATION_MINIMUM_PLAY_TIME = 2000;

class Loader extends PureComponent {
	constructor(props) {
		super(props);

		this.isLoaded = false;
		this.whenLoaded = null;
		this.timer = null;
	}

	startAnimation = visible => {
		if (visible) {
			if (!this.isLoaded) {
				const interval = ANIMATION_MINIMUM_PLAY_TIME * (1 + Math.random());

				this.isLoaded = true;
				this.whenLoaded = Date.now();
				this.timer = setInterval(() => this.allowAnimationToStop(), interval);
			}
		}
	};

	allowAnimationToStop = () => {
		const { onAnimationMinRunTimeComplete } = this.props;

		clearInterval(this.timer);
		onAnimationMinRunTimeComplete();
	};

	render() {
		const { visible, customloadingAnimation } = this.props;

		this.startAnimation(visible);

		let loadingAnimation = customloadingAnimation ? customloadingAnimation : Tumblr;

		return (
			<div className={`loader ${visible ? 'visible' : 'invisible'}`}>
				<img src={loadingAnimation} alt='loading' />
			</div>
		);
	}
}

export default Loader;

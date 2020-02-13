import React, { Component } from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const QuestionMark = `${CDN_URL}common/question_mark.svg`;
const ExclamationMark = `${CDN_URL}common/exclamation_mark.svg`;

const ICONS_AT_A_TIME = 5;
const ICON_REFRESH_INTERVAL = 1500;

class AnimatedIcon extends Component {
	constructor(props) {
		super(props);

		this.imageElements = [];
		this.interval = null;
		this.cleanUpInterval = null;
		this.icon = null;
		this.state = {
			enabled: false,
			animating: false,
		};
	}

	generateIcons = currStep => {
		const container = this.refs.particles;
		const step = currStep + 1;

		for (let i = 0; i < ICONS_AT_A_TIME; i++) {
			const questionMark = document.createElement('img');
			questionMark.className = `question-mark question_mark-${step}-${i}`;
			questionMark.src = this.props.icon === 'question' ? QuestionMark : ExclamationMark;
			questionMark.setAttribute('style', `position: absolute; opacity: 0`);
			container.appendChild(questionMark);
			this.imageElements.push(questionMark);
		}

		setTimeout(() => {
			for (let j = 0; j < ICONS_AT_A_TIME; j++) {
				const X = Math.random() * 500 + 100;
				const Y = -1 * (Math.random() * 400 + 100);
				const delay = 1 + (j * 2) / ICONS_AT_A_TIME;
				// const delay = Math.random() * 2;
				const scale = Math.random() * 1 + 1;
				const mark = document.querySelector(`.question_mark-${step}-${j}`);
				if (mark) {
					mark.setAttribute(
						'style',
						`position: absolute; 
               transition: transform 10s ease, opacity 10s ease; 
               transform: translateX(${X}px) translateY(${Y}px) scale(${scale}); 
               transition-delay: ${delay}s`,
					);
				}
			}
		}, 100);
	};

	startAnimation = () => {
		clearInterval(this.interval);
		clearInterval(this.cleanUpInterval);

		let step = -1;
		this.setState({ animating: true });
		this.generateIcons(step);
		this.interval = setInterval(() => {
			step += 1;
			this.generateIcons(step);
		}, ICON_REFRESH_INTERVAL);

		const container = this.refs.particles;
		const imageElements = this.imageElements;
		this.cleanUpInterval = setInterval(() => {
			const elementsToRemove = imageElements.splice(0, ICONS_AT_A_TIME);
			elementsToRemove.forEach(el => {
				if (el.parentNode === container) {
					container.removeChild(el);
				}
			});
		}, 10000);
	};

	stopAnimation = (icon = null) => {
		this.setState({ animating: false });
		clearInterval(this.interval);
		let marks = document.querySelectorAll(`.${icon}-mark`);
		marks = Array.from(marks);

		if (marks) {
			marks.forEach(mark => {
				mark.attributes['transition-duration'] = '1s';
				mark.attributes['opacity'] = '0';
			});

			const container = this.refs.particles;
			for (let i = 0; i < marks.length; i++) {
				container.removeChild(marks[i]);
			}
		}
	};

	clearAnimation = () => {
		this.imageElements = [];
		this.stopAnimation('question');
		this.stopAnimation('exclamation');
		clearInterval(this.interval);
		clearInterval(this.cleanUpInterval);
	};

	componentDidUpdate() {
		const { enabled: incomingEnabled, icon: incomingIcon } = this.props;
		const { animating } = this.state;

		if (!incomingEnabled && animating) {
			// this.stopAnimation(this.icon);
			// this.imageElements = [];
			this.clearAnimation();
		} else if (incomingEnabled && !animating) {
			this.icon = incomingIcon;
			this.startAnimation();
		} else if (incomingEnabled && animating) {
			if (this.icon !== incomingIcon) {
				this.stopAnimation(this.icon);
				this.imageElements = [];
			}
		}
	}

	componentWillUnmount() {
		this.clearAnimation();
	}

	componentDidMount() {
		if (this.props.enabled) {
			this.setState({ enabled: true });
		}
	}

	render() {
		return <div ref='particles' className='particles' />;
	}
}

export default AnimatedIcon;

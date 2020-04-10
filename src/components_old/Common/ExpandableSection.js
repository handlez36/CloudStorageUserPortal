import React, { Fragment, Component } from 'react';
import { string } from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import ScrollView from './COMPANYScrollViewNew';
import { Utils } from '../../services/utils';

class ExpandableSection extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.state = {
			content: '',
			overflow: false,
			expanded: false,
		};
	}

	toggleExpand = () => {
		const { name } = this.props;
		const expanded = !this.state.expanded;
		this.setState(state => ({ ...state, expanded }));

		const wrapperElement = document.querySelector(`.${name} .expandable-wrapper`);
		if (expanded) {
			setTimeout(() => {
				const contentElement = document.querySelector(`.${name} .expandable-content-expanded`);
				const contentHeight = Math.min(contentElement.getBoundingClientRect().height, 200);
				this.setState({ height: contentElement.getBoundingClientRect().height });
				wrapperElement.setAttribute('style', `height: ${contentHeight}px !important`);
			}, 100);
		} else {
			const height = Utils.scalePxUsingVh(31, 1024);
			wrapperElement.setAttribute('style', `height: ${height}px !important`);
		}
	};

	updateContent = () => {
		const { content } = this.props;
		const { expanded } = this.state;

		if (content && !expanded) {
			this.displayContentBitByBit(content, expanded);
		}
	};

	componentDidMount() {
		const { name, content } = this.props;
		this.setState({ content });
		this.updateContent();

		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onResize();
			});
		});

		const wrapperElement = document.querySelector(`.${name} .expandable-wrapper`);
		this.myObserver.observe(wrapperElement);
	}

	componentDidUpdate() {
		const { name } = this.props;
		const { expanded, content } = this.state;

		if (!content) {
			this.updateContent();
		}

		if (!expanded) {
			this.displayContentBitByBit(content, expanded);
		}
	}

	consoleLogStuff = (wrapperElement, contentElement) => {
		console.log('Wrapper El Scroll Height: ', wrapperElement.scrollHeight);
		console.log('Wrapper El Client Height: ', wrapperElement.clientHeight);
		console.log('Content El Scroll Height: ', contentElement.scrollHeight);
		console.log('Content El Client Height: ', contentElement.clientHeight);
	};

	cacheHeights = (wrapperElement, contentElement) => {
		this.setState({
			wrapperScrollHeight: wrapperElement.scrollHeight,
			wrapperClientHeight: wrapperElement.clientHeight,
			wrapperHeight: wrapperElement.getBoundingClientRect().height,
			contentScrollHeight: contentElement.scrollHeight,
			contentClientHeight: contentElement.clientHeight,
			contentHeight: contentElement.getBoundingClientRect().height,
		});
	};

	displayContentBitByBit(content, expanded = false) {
		const { name } = this.props;
		const wrapperElement = document.querySelector(`.${name} .expandable-wrapper`);
		const contentElement = document.querySelector(`.${name} .expandable-content`);

		if (!wrapperElement || !contentElement) {
			return;
		}
		// Check to see if content does not overflow first
		contentElement.style.opacity = 0;
		contentElement.innerHTML = content;
		if (expanded || wrapperElement.scrollHeight <= wrapperElement.clientHeight) {
			contentElement.style.opacity = 1;
			return;
		}

		// Since content overflows, iteratively assemble content until the overflow point is reached
		contentElement.innerHTML = '';
		let end = 1;
		let truncatedContent = '';
		const interval = setInterval(() => {
			if (wrapperElement.scrollHeight <= wrapperElement.clientHeight) {
				truncatedContent = this.truncate(content, end++);
				contentElement.innerHTML = truncatedContent;
			} else {
				clearInterval(interval);
				contentElement.innerHTML = this.truncate(content, end - 15);
				contentElement.style.opacity = 1;
			}
		}, 0);
		if (!this.state.overflow) {
			this.setState({ overflow: true });
		}
	}

	truncate(content, end) {
		return content.slice(0, end) + '...';
	}

	onResize = () => {
		const { expanded } = this.state;
		const { content } = this.props;

		if (!expanded) {
			this.displayContentBitByBit(content, expanded);
		}
	};

	printStuff = () => {
		const {
			wrapperScrollHeight,
			wrapperClientHeight,
			wrapperHeight,
			contentScrollHeight,
			contentClientHeight,
			contentHeight,
		} = this.state;

		return (
			<div>
				<div>{`Wrapper Scroll Height: ${wrapperScrollHeight}`}</div>
				<div>{`Wrapper Client Height: ${wrapperClientHeight}`}</div>
				<div>{`Wrapper Client Height: ${wrapperHeight}`}</div>
				<div>---------------------------------------------</div>
				<div>{`Content Scroll Height: ${contentScrollHeight}`}</div>
				<div>{`Content Client Height: ${contentClientHeight}`}</div>
				<div>{`Content Client Height: ${contentHeight}`}</div>
			</div>
		);
	};

	render() {
		const { content, name } = this.props;
		const { expanded, overflow, content: cachedContent, height: contentHeight } = this.state;
		const expandedText = expanded ? 'Read Less' : 'Read More';

		return (
			<div className={`expandable-section ${name} ${expanded ? 'expanded' : ''}`}>
				<div className='expandable-wrapper'>
					{!expanded && (
						<Fragment>
							<div className='expandable-content' />
							{overflow && (
								<div className='read-more-less' onClick={this.toggleExpand}>
									{expandedText}
								</div>
							)}
						</Fragment>
					)}
					{expanded && (
						<ScrollView height={contentHeight} purple>
							<div className='expandable-content-expanded'>
								{content.replace(/\<br \/\>/g, '\n')}
								{/* {'TEST<br />TEST2\nTEST3'} */}
								{overflow && (
									<div className='read-more-less' onClick={this.toggleExpand}>
										{expandedText}
									</div>
								)}
							</div>
						</ScrollView>
					)}
				</div>
			</div>
		);
	}
}

ExpandableSection.propTypes = {
	name: string.isRequired, // Please ensure name is unique for each expandable section component
	content: string.isRequired,
};

export default ExpandableSection;

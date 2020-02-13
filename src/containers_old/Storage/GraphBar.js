import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as StorageUtils from '../Storage/Utils/StorageUtils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const barImage = `${CDN_URL}common/building-bar-graph.svg`;

class GraphBar extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
	}

	setFillColor = id => {
		const { color } = this.props;
		const graphBar = document.getElementById(id);

		if (graphBar) {
			graphBar.style.background = color;
			this.updateHeight(id);
		}
	};
	updateHeight = id => {
		const { sizeArray, size, unitSize } = this.props;
		const graphBar = document.getElementById(id);

		if (graphBar) {
			let bar = document.getElementById(`bar${this.props.id}`);
			let shadow = document.getElementById('shadow');
			shadow = shadow.getBoundingClientRect();
			bar = bar.getBoundingClientRect();

			const barHeight = bar.height - shadow.height;
			const total = sizeArray[0];
			let percent = ((unitSize / total) * 100) / 1;

			percent = (barHeight / 100) * percent;
			if (!size || size.sizeAmount === 0) {
				graphBar.style.height = `${0}px`;
			} else {
				graphBar.style.height = `${percent}px`;
			}
		}
		if (!size || size.sizeAmount === 0) {
			const graph = document.getElementById(`graph${id}`);
			if (graph) {
				graph.classList.add('inactive');
			}
		}
	};
	componentDidMount() {
		const { location, id } = this.props;
		const newId = `${location}${id}`;
		setTimeout(this.setFillColor(newId), 2000);

		this.myObserver = new ResizeObserver(() => {
			this.updateHeight(newId);
		});

		const bar = document.querySelector('.bar-image');
		this.myObserver.observe(bar);
	}

	render() {
		const { id, location, size, name, image } = this.props;

		return (
			<div className='graph-bar' id={`graph${location}${id}`}>
				{/* <div className='location-image'>
					<img src={image} />
				</div>
				<span className={`name ${location}`}>{name}</span> */}
				<div className='location-icon-row'>{StorageUtils.getLocationIcon(location)}</div>

				<div className='bar-image'>
					<span className='size'>
						{size.sizeAmount ? `${size.sizeAmount}${size.sizeAggregate}` : ''}
					</span>
					<img src={barImage} id={`bar${id}`} />
					<span className='shadow' id={'shadow'} />
					<span className='fill' id={`${location}${id}`} />
				</div>
			</div>
		);
	}
}
export default GraphBar;

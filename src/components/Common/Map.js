import React, { Component } from 'react';
import Test from './MapLabel';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const MapImg = `${CDN_URL}common/SOUTHEASTMAP.svg`;

const AtlantaBuilding = `${CDN_URL}common/Atlanta-buidling.svg`;
const ChattanoogaBuilding = `${CDN_URL}common/Chattanooga-building.svg`;
const HuntsvilleBuilding = `${CDN_URL}common/Huntsville-building.svg`;
const BirminghamBuilding = `${CDN_URL}common/Birmingham-building.svg`;

class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			locationImage: '',
			location: '',
			Hover: '',
			ATLHOVER: {
				location: 'ATLANTA',
				colorFill1: '#583a6b',
				colorFill2: '#8134c3',
				width: '43.001',
				fontColor: '#b4d334',
				x: '15',
			},
			CHATHOVER: {
				location: 'CHATTANOOGA',
				colorFill1: '#583a6b',
				colorFill2: '#8134c3',
				fontColor: '#b4d334',
				width: '64.793',
				x: '5',
			},
			HUNTHOVER: {
				location: 'HUNTSVILLE',
				colorFill1: '#583a6b',
				colorFill2: '#8134c3',
				fontColor: '#b4d334',
				width: '64.793',
				x: '10',
			},
			BIRMINGHAMHOVER: {
				location: 'BIRMINGHAM',
				colorFill1: '#583a6b',
				colorFill2: '#8134c3',
				fontColor: '#b4d334',
				width: '64.793',
				x: '10',
			},
		};
	}

	onMouseOver = id => {
		let location;
		if (id === 'dot-1') {
			location = 'ATLANTA';
		} else if (id === 'dot-2') {
			location = 'HUNTSVILLE';
		} else if (id === 'dot-3') {
			location = 'CHATTANOOGA';
		} else {
			location = 'BIRMINGHAM';
		}
		this.setState({ Hover: location });
	};

	onClick = location => {
		const locationImage = this.getLocationImage(location);
		if (this.props.onChange) {
			this.props.onChange(location);
		}
		this.setState({ locationImage, location });
	};

	getLocationImage = location => {
		if (location === 'Atlanta') {
			return {
				location: 'ATLANTA',
				colorFill1: '#b4d334',
				colorFill2: '#949300',
				width: '43.001',
				x: '17',
			};
		} else if (location === 'Huntsville') {
			return {
				location: 'HUNTSVILLE',
				colorFill1: '#b4d334',
				colorFill2: '#949300',
				width: '64.793',
				x: '12',
			};
		} else if (location === 'Birmingham') {
			return {
				location: 'BIRMINGHAM',
				colorFill1: '#b4d334',
				colorFill2: '#949300',
				width: '64.793',
				x: '12',
			};
		} else {
			return {
				location: 'CHATTANOOGA',
				colorFill1: '#b4d334',
				colorFill2: '#949300',
				width: '64.793',
				x: '6',
			};
		}
	};

	onMouseOut = () => {
		this.setState({ Hover: '' });
	};

	componentDidUpdate() {
		const { location: incomingLocation } = this.props;
		const { location: existingLocation } = this.state;

		if (existingLocation !== incomingLocation) {
			const locationImage = this.getLocationImage(incomingLocation);
			this.setState({ location: incomingLocation, locationImage });
		}
	}

	render() {
		return (
			<div className='map-wrapper'>
				<img id='map-image' src={MapImg} />
				{this.state.location === 'Atlanta' ? (
					<div className='dot dot-1'>
						{' '}
						<img id='atlanta-building' src={AtlantaBuilding} />{' '}
					</div>
				) : (
					<div
						onMouseOut={() => this.onMouseOut('dot-1')}
						onMouseOver={() => this.onMouseOver('dot-1')}
						onClick={() => this.onClick('Atlanta')}
						className='dot dot-1'
					>
						{this.state.Hover === 'ATLANTA' && (
							<div id='dot-1'>
								<Test location={this.state.ATLHOVER} />{' '}
							</div>
						)}
					</div>
				)}
				{this.state.location === 'Huntsville' ? (
					<div className='dot dot-2'>
						{' '}
						<img id='huntsville-building' src={HuntsvilleBuilding} />{' '}
					</div>
				) : (
					<div
						className='dot dot-2'
						onMouseOut={() => this.onMouseOut('dot-2')}
						onMouseOver={() => this.onMouseOver('dot-2')}
						onClick={() => this.onClick('Huntsville')}
					>
						{this.state.Hover === 'HUNTSVILLE' && (
							<div id='dot-2'>
								<Test location={this.state.HUNTHOVER} />
							</div>
						)}
					</div>
				)}
				{this.state.location === 'Chattanooga' ? (
					<div className='dot dot-3'>
						{' '}
						<img id='chat-building' src={ChattanoogaBuilding} />{' '}
					</div>
				) : (
					<div
						className='dot dot-3'
						onMouseOut={() => this.onMouseOut('dot-3')}
						onClick={() => this.onClick('Chattanooga')}
						onMouseOver={() => this.onMouseOver('dot-3')}
					>
						{this.state.Hover === 'CHATTANOOGA' && (
							<div id='dot-3'>
								<Test location={this.state.CHATHOVER} />{' '}
							</div>
						)}
					</div>
				)}
				{this.state.location === 'Birmingham' ? (
					<div className='dot dot-4'>
						{' '}
						<img id='birmingham-building' src={BirminghamBuilding} />{' '}
					</div>
				) : (
					<div
						className='dot dot-4'
						onMouseOut={() => this.onMouseOut('dot-4')}
						onClick={() => this.onClick('Birmingham')}
						onMouseOver={() => this.onMouseOver('dot-4')}
					>
						{this.state.Hover === 'BIRMINGHAM' && (
							<div id='dot-4'>
								<Test location={this.state.BIRMINGHAMHOVER} />{' '}
							</div>
						)}
					</div>
				)}
				{this.state.locationImage && (
					<div className='location-image'>
						<Test location={this.state.locationImage} />
					</div>
				)}
			</div>
		);
	}
}

export default Map;

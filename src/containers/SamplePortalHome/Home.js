import React, { Component } from 'react';
import HomePageGrid from './HomePageGrid';

export default class Home extends Component {
	render() {
		return (
			<div id='home-background' className='home-back-ground'>
				<HomePageGrid />
			</div>
		);
	}
}

import { Component } from 'react';
import React from 'react';
import { Utils } from '../../../services/utils';

export default class RosterUserOverviewBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: Utils.setBuildingImageByName(this.props.location.name),
		};
	}

	render() {
		return (
			<div
				className={
					'roster-user-overview-block ' +
					(this.props.location.rosterUserCount !== undefined ? '' : 'disabled')
				}
				onClick={this.props.click}
			>
				<div className={'block-wrapper'}>
					<div className={'name'}>
						{this.props.location.name}
						<span className={'name-tip'} />
					</div>
					<div className={'image'}>
						<img src={this.state.image} />
					</div>
				</div>
				{this.props.location.rosterUserCount !== undefined && (
					<div className={'roster-count'}>{this.props.location.rosterUserCount}</div>
				)}
			</div>
		);
	}
}

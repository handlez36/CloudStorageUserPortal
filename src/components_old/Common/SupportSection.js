import React, { Component } from 'react';

class SupportSection extends Component {
	render() {
		const { content: Section, ...remaining } = this.props;
		return (
			<div className='supporting-content support'>{Section && <Section {...remaining} />}</div>
		);
	}
}

export default SupportSection;

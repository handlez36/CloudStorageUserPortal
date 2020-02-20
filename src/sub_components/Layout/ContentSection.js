import React, { Component } from 'react';
import { number, any } from 'prop-types';

const ContentSection = ({ breakpoint, content: ContentComponent }) => {
	if (!breakpoint || !ContentComponent) {
		return;
	}

	return <ContentComponent breakpoint={breakpoint} />;
};

ContentSection.propTypes = {
	breakpoint: number.isRequired,
	content: any.isRequired,
};

export default ContentSection;

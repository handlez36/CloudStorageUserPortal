import React, { Component } from 'react'
import PropTypes from 'prop-types';

const {Provider, Consumer} = React.handleCMixpanelContext();

Provider.propTypes = {
    value: PropTypes.shape({
        init: PropTypes.func.isRequired,
        track: PropTypes.func.isRequired,
    })
};

export class MixpanelHandler extends Component {
  render() {
    return (
      <Provider value={ this.props.mixpanel} >
        { this.props.children }
      </Provider>
    )
  }
}

export const mixpanelShape = PropTypes.shape({
    init: PropTypes.func.isRequired,
    track: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    people: PropTypes.func.isRequired,
});

MixpanelHandler.propTypes = {
    children: PropTypes.node.isRequired,
    mixpanel: mixpanelShape
};

export const MixpanelConsumer = Consumer;



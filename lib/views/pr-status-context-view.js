import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import PropTypes from 'prop-types';

import Octicon from '../atom/octicon';
import {stateToIconAndStyle} from '../views/pr-statuses-view';

export class BarePrStatusContextView extends React.Component {
  static propTypes = {
    context: PropTypes.shape({
      context: PropTypes.string.isRequired,
      description: PropTypes.string,
      state: PropTypes.string.isRequired,
      targetUrl: PropTypes.string,
      creator: PropTypes.shape({
        avatarUrl: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  render() {
    const {context, description, state, targetUrl} = this.props.context;
    const {icon, style} = stateToIconAndStyle[state];
    return (
      <li className="github-PrStatuses-list-item">
        <span className="github-PrStatuses-list-item-icon">
          <Octicon icon={icon} className={style} />
        </span>
        <span className="github-PrStatuses-list-item-context">
          <strong>{context}</strong> {description}
        </span>
        <span className="github-PrStatuses-list-item-details-link">
          <a href={targetUrl}>Details</a>
        </span>
      </li>
    );
  }
}

export default createFragmentContainer(BarePrStatusContextView, {
  context: graphql`
    fragment prStatusContextView_context on StatusContext {
      context description state targetUrl
    }
  `,
});

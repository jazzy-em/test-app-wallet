import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './styles.less';
import {getLoading} from '../../selectors/ui';

const AppLoadingIndicator = ({loading, onTop}) => {
    return loading ? (
        <div className={classnames(styles.container, {[styles.top]: onTop})}>
            <LinearProgress color="primary" />
        </div>
    ) : null;
};

AppLoadingIndicator.propTypes = {
    loading: PropTypes.bool,
    onTop: PropTypes.bool
};

export default connect(store => {
    return {
        loading: getLoading(store)
    };
})(AppLoadingIndicator);

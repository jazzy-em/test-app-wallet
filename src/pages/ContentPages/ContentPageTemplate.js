import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './styles.less';

import Appbar from '../../components/Appbar/index';
import AppLoadingIndicator from '../../components/AppLoadingIndicator/index';
import {getLoading} from '../../selectors/ui';

const ContentPageTemplate = ({title, loading, children}) => {
    return (
        <div className={styles.container}>
            <Appbar />
            <AppLoadingIndicator />
            <div className={styles.scrollWrapper}>
                <div className={styles.content}>
                    <Paper className={styles.paper}>
                        {loading && <div className={styles.loading} />}
                        <Typography variant="h5" className={styles.title}>
                            {title}
                        </Typography>
                        {children}
                    </Paper>
                </div>
            </div>
        </div>
    )
};

ContentPageTemplate.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    loading: PropTypes.bool
};

export default connect(
    store => {
        return {
            loading: getLoading(store)
        };
    }
)(ContentPageTemplate)
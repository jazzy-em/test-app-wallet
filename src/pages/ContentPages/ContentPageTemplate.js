import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography/Typography';

import styles from './styles.less';

import Appbar from '../../components/Appbar/index';
import AppLoadingIndicator from '../../components/AppLoadingIndicator/index';

const ContentPageTemplate = ({title, children}) => {
    return (
        <div className={styles.container}>
            <Appbar />
            <AppLoadingIndicator />
            <div className={styles.scrollWrapper}>
                <div className={styles.content}>
                    <Paper className={styles.paper}>
                        <Typography variant="h4">
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
    title: PropTypes.string,
    children: PropTypes.node
};

export default ContentPageTemplate;
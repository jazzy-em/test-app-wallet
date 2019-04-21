import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import {Link} from 'react-router-dom';

import styles from '../styles.less';

import {logoutRequestAction} from '../../../actions/auth';
import AuthPageTemplate from '../AuthPageTemplate';
import {getUserInfo} from '../../../selectors/auth';
import {loginUrl} from '../../../helpers/routes';

class LogoutPage extends React.PureComponent {
    componentDidMount() {
        this.logout();
    }

    componentDidUpdate() {
        this.logout();
    }

    logout = () => {
        if (this.props.userInfo) {
            this.props.logoutRequest();
        }
    };

    render() {
        const isAuthorized = this.props.userInfo;
        return (
            <AuthPageTemplate>
                <div className={styles.statusMessage}>
                    <Typography>
                        {isAuthorized ? 'Logging out...' : 'You have successfully logged out'}
                    </Typography>
                </div>
            </AuthPageTemplate>
        );
    }

    static propTypes = {
        match: PropTypes.object,
        userInfo: PropTypes.object,
        logoutRequest: PropTypes.func
    }
}

export default connect(store => {
    return {
        userInfo: getUserInfo(store)
    };
}, {
    logoutRequest: logoutRequestAction
})(LogoutPage);
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles.less';

import {getNotifications} from '../../selectors/ui';
import {hideNotificationAction} from '../../actions/ui';

const DEFAULT_AUTO_HIDE_DURATIONS = {
    error: 6000,
    default: 3000
};
const DEFAULT_MESSAGES = {
    error: 'Something went wrong...'
};

class Notifications extends React.PureComponent {
    state = {
        open: false,
        notification: {}
    };

    componentDidUpdate(prevProps) {
        if (this.props.notifications[this.props.notifications.length - 1] !== prevProps.notifications[prevProps.notifications.length - 1]) {
            if (this.state.open) {
                // immediately begin dismissing current message
                // to start showing new one
                this.setState({open: false});
            } else {
                this.processQueue();
            }
        }
    }

    processQueue = () => {
        const {notifications} = this.props;
        if (notifications.length > 0) {
            if (notifications.find(notif => notif.id === this.state.notification.id)) {
                this.props.hideNotification(this.state.notification.id);
            }
            this.setState({
                notification: notifications[notifications.length - 1],
                open: true,
            });
        }
    };

    handleExited = () => {
        this.processQueue();
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.hideNotification(this.state.notification.id);
    };

    getIcon = () => {
        switch (this.state.notification.type) {
            case 'error':
                return 'error';
            default:
                return 'check_circle';
        }
    };

    render() {
        const {open, notification} = this.state;
        const type = notification.type;
        const icon = this.getIcon();
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={notification.duration || DEFAULT_AUTO_HIDE_DURATIONS[type] || DEFAULT_AUTO_HIDE_DURATIONS.default}
                onClose={this.handleClose}
                onExited={this.handleExited}
                ContentProps={{
                    className: styles[type] || styles.info
                }}
                message={<div className={styles.message}>
                    <Icon className={styles.icon}>{icon}</Icon>
                    {notification.message || DEFAULT_MESSAGES[type]}
                </div>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                ]}
            />
        )
    }

    static propTypes = {
        notifications: PropTypes.array,
        hideNotification: PropTypes.func
    };

    static defaultProps = {
        notifications: []
    };
}

export default connect(
    store => ({
        notifications: getNotifications(store)
    }),
    {
        hideNotification: hideNotificationAction
    }
)(Notifications);
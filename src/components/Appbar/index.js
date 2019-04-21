import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

import styles from './styles.less';
import Logo from './logo.svg';
import {getUserInfo} from '../../selectors/auth';
import {getLoginUrl, getLogoutUrl} from '../../helpers/routes';
import {isLoggedIn} from '../../helpers/auth';

const Appbar = ({title = 'Wallet app', userInfo}) => {
    const isLogged = isLoggedIn(userInfo);
    return (
        <div className={styles.container}>
            <AppBar className={styles.appBar} position="static" color="default">
                <Toolbar className={styles.toolBar} >
                    <div className={styles.widthWrapper}>
                        <Logo />
                        <Typography className={styles.title} variant="h5">{title}</Typography>
                        {isLogged && <Typography className={styles.username}>{userInfo.username}</Typography>}
                        {isLogged ? (
                                <Button component={Link} to={getLogoutUrl()}>
                                    Logout
                                </Button>
                            ) : (
                                <Button component={Link} to={getLoginUrl()}>
                                    Login
                                </Button>
                            )
                        }

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
};

Appbar.propTypes = {
    title: PropTypes.string,
    userInfo: PropTypes.object
};

export default connect(
    store => {
        return {
            userInfo: getUserInfo(store)
        };
    }
)(Appbar);
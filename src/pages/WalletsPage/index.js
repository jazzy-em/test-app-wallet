import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import styles from './styles.less';
import Appbar from '../../components/Appbar';
import AppLoadingIndicator from '../../components/AppLoadingIndicator';
import {jsonRequest} from '../../utils/network';

const WalletsPage = () => {
    // useEffect(() => {
    //     console.log('loading balance');
    //     jsonRequest('/api/wallet');
    // }, []);
    return (
        <div className={styles.container}>
            <Appbar />
            <AppLoadingIndicator />
            <div className={styles.scrollWrapper}>
                <div className={styles.content}>
                    <div>Wallets page</div>
                </div>
            </div>
        </div>
    )
};

export default WalletsPage;
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';

import styles from './styles.less';

import ContentPageTemplate from '../ContentPageTemplate';
import {loadWalletsRequestAction} from '../../../actions/wallet';

const WalletsPage = ({loadWallets}) => {
    useEffect(() => {
        loadWallets();
    }, []);
    return (
        <ContentPageTemplate title="Your wallets">
            Some content
        </ContentPageTemplate>
    )
};

WalletsPage.propTypes = {
    loadWallets: PropTypes.func
};

export default connect(store => ({
}), {
    loadWallets: loadWalletsRequestAction
})(WalletsPage);
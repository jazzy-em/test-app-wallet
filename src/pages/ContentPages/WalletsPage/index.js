import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import {Link} from 'react-router-dom';

import styles from './styles.less';

import ContentPageTemplate from '../ContentPageTemplate';
import {loadWalletsRequestAction} from '../../../actions/wallet';
import {getWallets} from '../../../selectors/wallet';
import {formatBtc} from '../../../utils/formats';
import {getWalletUrl} from '../../../helpers/routes';

const WalletsPage = ({wallets = [], loadWallets}) => {
    useEffect(() => {loadWallets()}, []);
    return (
        <ContentPageTemplate title="Your wallets">
            {wallets.map(wallet => (
                <div key={wallet.id}>
                    <Link to={getWalletUrl(wallet.id)}>{wallet.label} - {formatBtc(wallet.balance)} BTC</Link>
                </div>)
            )}
        </ContentPageTemplate>
    )
};

WalletsPage.propTypes = {
    wallets: PropTypes.array,
    loadWallets: PropTypes.func
};

export default connect(store => ({
    wallets: getWallets(store)
}), {
    loadWallets: loadWalletsRequestAction
})(WalletsPage);
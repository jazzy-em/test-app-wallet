import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './styles.less';

import ContentPageTemplate from '../ContentPageTemplate';
import {loadWalletRequestAction, loadWalletsRequestAction} from '../../../actions/wallet';
import {getWallet} from '../../../selectors/wallet';
import {formatBtc} from '../../../utils/formats';
import {getWalletsUrl} from '../../../helpers/routes';
import * as api from '../../../api';

const WalletPage = ({wallet, match, loadWallet}) => {
    useEffect(() => {loadWallet(match.params.id)}, []);

    const sendCoins = (address, amount, walletPassphrase) => {
        api.unlock('000000')
            .then(() =>
                api.sendCoins({walletId: wallet.id, address, amount, walletPassphrase})
            );
    };

    return (
        <ContentPageTemplate title={wallet && wallet.label || 'Loading...'}>
            <Link to={getWalletsUrl()}>Back to wallets</Link>
            {wallet && <div>
                {formatBtc(wallet.balance)} BTC
            </div>}
            <div>
                <Typography variant="h5">Send money:</Typography>
                <Button onClick={() => {
                    sendCoins('2NFsRApi8N687YNLvpt7p612E3KR4n6XsYV', '10000', '');
                }}>Send</Button>
            </div>
        </ContentPageTemplate>
    )
};

WalletPage.propTypes = {
    match: PropTypes.object,
    wallet: PropTypes.object,
    loadWallet: PropTypes.func
};

export default connect(store => ({
    wallet: getWallet(store)
}), {
    loadWallet: loadWalletRequestAction
})(WalletPage);
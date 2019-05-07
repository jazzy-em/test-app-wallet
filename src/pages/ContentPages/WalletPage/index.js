import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';

import styles from './styles.less';

import ContentPageTemplate from '../ContentPageTemplate';
import {clearWalletAction, loadWalletRequestAction} from '../../../actions/wallet';
import {getTransfers, getWallet} from '../../../selectors/wallet';
import SendMoneyButton from '../../../components/SendMoneyButton';
import WalletTransfers from '../../../components/WalletTransfers';
import WalletHeader from '../../../components/WalletHeader';

const WalletPage = ({wallet, transfers, match, loadWallet, clearWallet}) => {
    useEffect(() => {
        loadWallet(match.params.id);
        return clearWallet;
    }, []);

    return (
        <ContentPageTemplate title={<WalletHeader wallet={wallet}/>}>
            {wallet && (
                <>
                    <Typography variant="caption">Receive address:</Typography>
                    <Typography>{wallet.receiveAddress.address}</Typography>
                    <div className={styles.sendMoney}>
                        <SendMoneyButton fromId={wallet.id} coin={wallet.coin}/>
                    </div>
                    <Typography variant="h6">Last transactions:</Typography>
                    <WalletTransfers transfers={transfers}/>
                </>
            )}
        </ContentPageTemplate>
    )
};

WalletPage.propTypes = {
    match: PropTypes.object,
    wallet: PropTypes.object,
    transfers: PropTypes.array,
    loadWallet: PropTypes.func,
    clearWallet: PropTypes.func
};

export default connect(store => ({
    wallet: getWallet(store),
    transfers: getTransfers(store)
}), {
    loadWallet: loadWalletRequestAction,
    clearWallet: clearWalletAction
})(WalletPage);
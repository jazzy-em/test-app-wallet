import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import styles from './styles.less';

import ContentPageTemplate from '../ContentPageTemplate';
import {clearWalletAction, loadWalletRequestAction} from '../../../actions/wallet';
import {getTransfers, getWallet} from '../../../selectors/wallet';
import {formatWalletBalance} from '../../../utils/formats';
import {getWalletsUrl} from '../../../helpers/routes';
import SendMoneyButton from '../../../components/SendMoneyButton';
import WalletTransfers from '../../../components/WalletTransfers';

const WalletPage = ({wallet, transfers, match, loadWallet, clearWallet}) => {
    useEffect(() => {
        loadWallet(match.params.id);
        return clearWallet;
    }, []);

    const renderTitle = () => (
        <div className={styles.header}>
            <IconButton
                component={Link}
                to={getWalletsUrl()}
            >
                <Icon>keyboard_backspace</Icon>
            </IconButton>
            {wallet ? (
                <>
                    {wallet.label}
                    <div className={styles.spacer}/>
                    <Typography variant="h6">{formatWalletBalance(wallet)}</Typography>
                </>
            ) : 'Loading...'}
        </div>
    );

    return (
        <ContentPageTemplate title={renderTitle()}>
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
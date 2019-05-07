import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ContentPageTemplate from '../ContentPageTemplate';
import {loadWalletsRequestAction} from '../../../actions/wallet';
import {getWallets} from '../../../selectors/wallet';
import {formatWalletBalance} from '../../../utils/formats';
import {getWalletUrl} from '../../../helpers/routes';
import Table from '../../../components/Table';

const tableHead = [
    {
        id: 'label',
        label: 'Wallet label'
    },
    {
        id: 'balance',
        label: 'Coin balance'
    }
];

export const WalletsPage = ({wallets = [], loadWallets, history}) => {
    useEffect(() => {loadWallets()}, []);

    const tableRows = wallets.map((wallet) => ({
        label: wallet.label,
        balance: formatWalletBalance(wallet),
        onClick: () => {
            history.push(getWalletUrl(wallet.id))
        }
    }));

    return (
        <ContentPageTemplate title="Your wallets">
            <Table head={tableHead} rows={tableRows} />
        </ContentPageTemplate>
    )
};

WalletsPage.propTypes = {
    wallets: PropTypes.array,
    loadWallets: PropTypes.func,
    history: PropTypes.object
};

export default connect(store => ({
    wallets: getWallets(store)
}), {
    loadWallets: loadWalletsRequestAction
})(WalletsPage);
import React from 'react';
import PropTypes from 'prop-types';

import {formatWalletBalance} from '../../utils/formats';
import {getWalletUrl} from '../../helpers/routes';
import Table from '../../components/Table';

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

export const WalletsTable = ({wallets = [], history}) => {
    const tableRows = wallets.map(wallet => ({
        id: wallet.id,
        label: wallet.label,
        balance: formatWalletBalance(wallet),
        onClick: () => {
            history.push(getWalletUrl(wallet.id));
        }
    }));

    return <Table head={tableHead} rows={tableRows} />;
};

WalletsTable.propTypes = {
    wallets: PropTypes.array,
    history: PropTypes.object
};

export default WalletsTable;

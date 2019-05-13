import React from 'react';
import PropTypes from 'prop-types';

import {formatTimeForTransfers, formatTransferAmount} from '../../utils/formats';
import Table from '../Table';

const tableHead = [
    {
        id: 'date',
        label: 'Date'
    },
    {
        id: 'type',
        label: 'Type'
    },
    {
        id: 'toFrom',
        label: 'To/From'
    },
    {
        id: 'state',
        label: 'State'
    },
    {
        id: 'amount',
        label: 'Amount'
    }
];

const findAddress = (outputs = []) => {
    const chain0 = outputs.find(output => output.isSegwit === false && output.redeemScript) || {};
    return chain0.address || '';
};

const WalletTransfers = ({transfers}) => {
    const tableRows = (transfers || []).map(transfer => {
        const {id, type, date, outputs, state, valueString} = transfer;
        return {
            id,
            date: formatTimeForTransfers(date),
            type,
            toFrom: findAddress(outputs),
            state,
            amount: formatTransferAmount(valueString)
        };
    });

    return <Table head={tableHead} rows={tableRows} />;
};

WalletTransfers.propTypes = {
    transfers: PropTypes.array
};

export default WalletTransfers;

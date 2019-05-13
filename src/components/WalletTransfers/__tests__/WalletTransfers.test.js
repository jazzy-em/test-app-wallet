import React from 'react';
import {mount} from 'enzyme';

import WalletTransfers from '..';
import Table from '../../Table';

describe('WalletTransfers tests', () => {
    it('should render table with transfers', () => {
        const transfers = [
            {
                id: 1,
                date: '2019-05-12T19:43:19.717Z',
                type: 'receive',
                outputs: [
                    {
                        address: 'address 1',
                        isSegwit: true
                    },
                    {
                        address: 'address 2',
                        isSegwit: false,
                        redeemScript: 'dfsfdfdsfdsgfg'
                    }
                ],
                state: 'confirmed',
                valueString: '200000'
            },
            {
                id: 2,
                date: '2019-05-13T19:43:19.717Z',
                type: 'send',
                outputs: [
                    {
                        address: 'address 4',
                        isSegwit: true,
                        redeemScript: 'dfsfdfdsfdsgfg3'
                    },
                    {
                        address: 'address 5',
                        isSegwit: false,
                        redeemScript: 'dfsfdfdsfdsgfg'
                    }
                ],
                state: 'confirmed',
                valueString: '-200000'
            }
        ];
        const component = mount(<WalletTransfers transfers={transfers} />);
        const table = component.find(Table);
        expect(table.length).toBe(1);
        expect(table.prop('head')).toEqual([
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
        ]);
        expect(table.prop('rows')).toMatchObject([
            {
                id: 1,
                type: 'receive',
                toFrom: 'address 2',
                state: 'confirmed',
                amount: '+0.002'
            },
            {
                id: 2,
                type: 'send',
                toFrom: 'address 5',
                state: 'confirmed',
                amount: '-0.002'
            }
        ]);
    });
});

import React from 'react';
import {mount} from 'enzyme';

import WalletsTable from '..';
import Table from '../../Table';

describe('WalletsTable tests', () => {
    it('should render table with wallets', () => {
        const wallets = [
            {
                id: 1,
                label: 'My wallet 1',
                coin: 'B',
                balance: 200000
            },
            {
                id: 2,
                label: 'My wallet 2',
                coin: 'B',
                balance: 400000
            }
        ];
        const component = mount(<WalletsTable wallets={wallets} />);
        const table = component.find(Table);
        expect(table.length).toBe(1);
        expect(table.prop('head')).toEqual([
            {
                id: 'label',
                label: 'Wallet label'
            },
            {
                id: 'balance',
                label: 'Coin balance'
            }
        ]);
        expect(table.prop('rows')).toMatchObject([
            {
                id: 1,
                label: 'My wallet 1',
                balance: '0.002 B'
            },
            {
                id: 2,
                label: 'My wallet 2',
                balance: '0.004 B'
            }
        ]);
    });

    it('should map onClick prop to row with history.push', () => {
        const wallets = [
            {
                id: 1,
                label: 'My wallet 1',
                coin: 'B',
                balance: 200000
            }
        ];
        const history = {
            push: jest.fn()
        };
        const component = mount(<WalletsTable wallets={wallets} history={history} />);
        const table = component.find(Table);
        table.prop('rows')[0].onClick();
        expect(history.push).toHaveBeenCalledWith('/wallet/1');
    });
});

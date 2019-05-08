import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ConnectedWalletsPage, {WalletsPage} from '..';
import ContentPageTemplate from '../../ContentPageTemplate';
import WalletsTable from '../../../../components/WalletsTable';
import {loadWalletsRequestAction} from '../../../../actions/wallet';

describe('WalletsPage tests', () => {
    afterEach(() => {
       jest.restoreAllMocks();
    });
    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const component = shallow(<WalletsPage />);
            const template = component.find(ContentPageTemplate);
            expect(template.length).toBe(1);
            expect(template.prop('title')).toBe('Your wallets');
            expect(component.find(WalletsTable).length).toBe(1);
        });

        it('should forward wallets and history props to WalletsTable', () => {
            const history = {};
            const wallets = [];
            const component = shallow(<WalletsPage history={history} wallets={wallets} />);
            const walletsTable = component.find(WalletsTable);
            expect(walletsTable.prop('wallets')).toBe(wallets);
            expect(walletsTable.prop('history')).toBe(history);
        });

        it('should call loadWallets prop on mount', () => {
            const loadWallets = jest.fn();
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(() => <div/>);
            mount(<WalletsPage loadWallets={loadWallets} />);
            expect(loadWallets).toHaveBeenCalled();
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            wallet: {
                wallets: [{}]
            }
        };
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(() => <div />);
        });

        it('should connect wallets prop', () => {
            const component = mount(<Provider store={store}>
                <ConnectedWalletsPage />
            </Provider>);
            expect(component.find(WalletsPage).prop('wallets')).toBe(initial.wallet.wallets);
        });

        it('should connect loadWallets prop', () => {
            const component = mount(<Provider store={store}>
                <ConnectedWalletsPage />
            </Provider>);
            expect(component.find(WalletsPage).prop('loadWallets')()).toMatchObject(loadWalletsRequestAction());
        });
    });
});
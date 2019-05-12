import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ConnectedWalletPage, {WalletPage} from '..';
import ContentPageTemplate from '../../ContentPageTemplate';
import WalletHeader from '../../../../components/WalletHeader';
import SendMoneyButton from '../../../../components/SendMoneyButton';
import WalletTransfers from '../../../../components/WalletTransfers';
import {clearWalletAction, loadWalletRequestAction} from '../../../../actions/wallet';

describe('WalletPage tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Pure component behavior', () => {
        it('should render only page title when wallet prop is not specified', () => {
            const component = shallow(<WalletPage />);
            const template = component.find(ContentPageTemplate);
            expect(template.length).toBe(1);
            expect(template.prop('title')).toEqual(<WalletHeader />);
            expect(component.find(SendMoneyButton).length).toBe(0);
            expect(component.find(WalletTransfers).length).toBe(0);
        });

        it('should render all components when wallet prop is specified', () => {
            const wallet = {};
            const component = shallow(<WalletPage wallet={wallet} />);
            const template = component.find(ContentPageTemplate);
            expect(template.length).toBe(1);
            expect(template.prop('title')).toEqual(<WalletHeader wallet={wallet} />);
            expect(component.find(SendMoneyButton).length).toBe(1);
            expect(component.find(WalletTransfers).length).toBe(1);
        });

        it('should call loadWallet prop on mount', () => {
            const match = {
                params: {
                    id: 'walletId'
                }
            };
            const loadWallet = jest.fn();
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(() => <div />);
            mount(<WalletPage loadWallet={loadWallet} match={match} />);
            expect(loadWallet).toHaveBeenCalledWith(match.params.id);
        });

        it('should call clearWallet prop on unmount', () => {
            const match = {
                params: {
                    id: 'walletId'
                }
            };
            const loadWallet = jest.fn();
            const clearWallet = jest.fn();
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(() => <div />);
            const component = mount(<WalletPage loadWallet={loadWallet} clearWallet={clearWallet} match={match} />);
            expect(clearWallet).not.toHaveBeenCalled();
            component.unmount();
            expect(clearWallet).toHaveBeenCalled();
        });

        it('should render wallet address', () => {
            const wallet = {
                receiveAddress: {
                    address: '123abc'
                }
            };
            const match = {
                params: {
                    id: 'walletId'
                }
            };
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(({children}) => <div>{children}</div>);
            jest.spyOn(SendMoneyButton, 'type').mockImplementation(() => <div />);
            const component = mount(<WalletPage wallet={wallet} match={match} loadWallet={jest.fn()} />);
            expect(component.text().includes(wallet.receiveAddress.address)).toBe(true);
        });

        it('should set walletId and coin props to SendMoneyButton', () => {
            const wallet = {
                id: 'walletId',
                coin: 'some_coin'
            };
            const component = shallow(<WalletPage wallet={wallet} />);
            const sendMoneyButton = component.find(SendMoneyButton);
            expect(sendMoneyButton.prop('walletId')).toBe(wallet.id);
            expect(sendMoneyButton.prop('coin')).toBe(wallet.coin);
        });

        it('should forward transfer prop to WalletTransfers', () => {
            const wallet = {};
            const transfers = [];
            const component = shallow(<WalletPage wallet={wallet} transfers={transfers} />);
            expect(component.find(WalletTransfers).prop('transfers')).toBe(transfers);
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            wallet: {
                wallet: {
                    id: 'walletId'
                },
                transfers: []
            }
        };
        let store;
        const match = {
            params: {}
        };
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(ContentPageTemplate, 'type').mockImplementation(() => <div />);
        });

        it('should connect wallet and transfers props', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedWalletPage match={match} />
                </Provider>
            );
            const page = component.find(WalletPage);
            expect(page.prop('wallet')).toBe(initial.wallet.wallet);
            expect(page.prop('transfers')).toBe(initial.wallet.transfers);
        });

        it('should connect loadWallet and clearWallet props', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedWalletPage match={match} />
                </Provider>
            );
            const page = component.find(WalletPage);
            expect(page.prop('loadWallet')()).toEqual(loadWalletRequestAction());
            expect(page.prop('clearWallet')()).toEqual(clearWalletAction());
        });
    });
});

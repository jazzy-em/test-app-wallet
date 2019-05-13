import React from 'react';
import {mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {curry} from 'ramda';

import ConnectedSendMoneyButton, {SendMoneyButton} from '..';
import {SEND_COINS_STATES} from '../../../constants/wallet';
import {sendCoinsRequestAction} from '../../../actions/wallet';

describe('SendMoneyButton tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const findField = curry((name, component) => component.find(`TextField[name="${name}"]`));
    const findToField = findField('to');
    const findAmountField = findField('amount');
    const findPassphraseField = findField('passphrase');
    const findOtpField = findField('otp');
    const findButtonByLabel = curry((label, component) =>
        component.find(Button).filterWhere(button => button.text() === label)
    );
    const findSendMoneyButton = findButtonByLabel('Send money');
    const findCancelButton = findButtonByLabel('Cancel');
    const findSendButton = findButtonByLabel('Send');
    const openDialog = component => findSendMoneyButton(component).simulate('click');

    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = () => {};
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            expect(findSendMoneyButton(component).length).toBe(1);
            openDialog(component);
            const dialog = component.find(Dialog);
            expect(dialog.length).toBe(1);
            expect(findToField(dialog).length).toBe(1);
            expect(findAmountField(dialog).length).toBe(1);
            expect(findPassphraseField(dialog).length).toBe(1);
            expect(findOtpField(dialog).length).toBe(1);
            expect(findSendButton(dialog).length).toBe(1);
            expect(findCancelButton(dialog).length).toBe(1);
        });

        it('should not render dialog content when dialog is closed', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = () => {};
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            expect(findSendMoneyButton(component).length).toBe(1);
            const dialog = component.find(Dialog);
            expect(dialog.length).toBe(1);
            expect(findToField(dialog).length).toBe(0);
            expect(findAmountField(dialog).length).toBe(0);
            expect(findPassphraseField(dialog).length).toBe(0);
            expect(findOtpField(dialog).length).toBe(0);
            expect(findSendButton(dialog).length).toBe(0);
            expect(findCancelButton(dialog).length).toBe(0);
        });

        it('should not call sendCoins prop on send button click if component state is not valid', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = jest.fn();
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            openDialog(component);
            findToField(component).prop('onChange')({
                target: {
                    name: 'to',
                    value: 'ffdsfdsfsdf'
                }
            });
            findAmountField(component).prop('onChange')({
                target: {
                    name: 'amount',
                    value: '-0.0001'
                }
            });
            findSendButton(component).simulate('click');
            expect(sendCoins).not.toHaveBeenCalled();
            expect(findToField(component).prop('error')).toBe(false);
            expect(findAmountField(component).prop('error')).toBe(true);
            expect(findPassphraseField(component).prop('error')).toBe(true);
            expect(findOtpField(component).prop('error')).toBe(true);
        });

        it('should call sendCoins prop on send button click if component state is valid', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = jest.fn();
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            openDialog(component);
            findToField(component).prop('onChange')({
                target: {
                    name: 'to',
                    value: 'toAddress'
                }
            });
            findAmountField(component).prop('onChange')({
                target: {
                    name: 'amount',
                    value: '0.0001'
                }
            });
            findPassphraseField(component).prop('onChange')({
                target: {
                    name: 'passphrase',
                    value: 'abc'
                }
            });
            findOtpField(component).prop('onChange')({
                target: {
                    name: 'otp',
                    value: '123456'
                }
            });
            findSendButton(component).simulate('click');
            expect(sendCoins).toHaveBeenCalled();
            expect(sendCoins.mock.calls[0][0]).toEqual({
                fromId: walletId,
                to: 'toAddress',
                amount: '10000',
                passphrase: 'abc',
                otp: '123456'
            });
            expect(findToField(component).prop('error')).toBe(false);
            expect(findAmountField(component).prop('error')).toBe(false);
            expect(findPassphraseField(component).prop('error')).toBe(false);
            expect(findOtpField(component).prop('error')).toBe(false);
        });

        it('should call sendCoins prop on Enter keypress if component state is valid', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = jest.fn();
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            openDialog(component);
            findToField(component).prop('onChange')({
                target: {
                    name: 'to',
                    value: 'toAddress'
                }
            });
            findAmountField(component).prop('onChange')({
                target: {
                    name: 'amount',
                    value: '0.0001'
                }
            });
            findPassphraseField(component).prop('onChange')({
                target: {
                    name: 'passphrase',
                    value: 'abc'
                }
            });
            findOtpField(component).prop('onChange')({
                target: {
                    name: 'otp',
                    value: '123456'
                }
            });
            findOtpField(component).simulate('keypress', {
                key: 'Enter'
            });
            expect(sendCoins).toHaveBeenCalled();
            expect(sendCoins.mock.calls[0][0]).toEqual({
                fromId: walletId,
                to: 'toAddress',
                amount: '10000',
                passphrase: 'abc',
                otp: '123456'
            });
            expect(findToField(component).prop('error')).toBe(false);
            expect(findAmountField(component).prop('error')).toBe(false);
            expect(findPassphraseField(component).prop('error')).toBe(false);
            expect(findOtpField(component).prop('error')).toBe(false);
        });

        it('should close dialog on cancel button click', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = () => {};
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            expect(findSendMoneyButton(component).length).toBe(1);
            openDialog(component);
            let dialog = component.find(Dialog);
            expect(dialog.prop('open')).toBe(true);

            findCancelButton(dialog).simulate('click');
            dialog = component.find(Dialog);
            expect(dialog.prop('open')).toBe(false);
        });

        it('should close dialog when step props is SEND_COINS_STATES.success', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const sendCoins = () => {};
            const component = mount(<SendMoneyButton walletId={walletId} coin={coin} sendCoins={sendCoins} />);
            expect(findSendMoneyButton(component).length).toBe(1);
            openDialog(component);
            let dialog = component.find(Dialog);
            expect(dialog.prop('open')).toBe(true);

            component.setProps({
                step: SEND_COINS_STATES.success
            });
            component.update();
            dialog = component.find(Dialog);
            expect(dialog.prop('open')).toBe(false);
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            wallet: {
                sendMoneyStep: SEND_COINS_STATES.initial
            }
        };
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
        });

        it('should connect sendCoins prop', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const component = mount(
                <Provider store={store}>
                    <ConnectedSendMoneyButton walletId={walletId} coin={coin} />
                </Provider>
            );
            const pureComponent = component.find(SendMoneyButton);
            expect(pureComponent.prop('sendCoins')({})).toEqual(sendCoinsRequestAction({}));
        });

        it('should connect step prop', () => {
            const walletId = 'walletId';
            const coin = 'tbtc';
            const component = mount(
                <Provider store={store}>
                    <ConnectedSendMoneyButton walletId={walletId} coin={coin} />
                </Provider>
            );
            const pureComponent = component.find(SendMoneyButton);
            expect(pureComponent.prop('step')).toEqual(initial.wallet.sendMoneyStep);
        });
    });
});

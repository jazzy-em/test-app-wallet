import {takeLatest, takeEvery, put, call, all, delay} from 'redux-saga/effects';

import {setAppLoading, showNotificationAction} from '../../actions/ui';
import * as api from '../../api';
import {handleErrors} from '../common';
import {
    loadWallet,
    loadWallets,
    loadWalletSaga,
    loadWalletsSaga,
    sendCoins,
    sendCoinsSaga,
    silentLoadWallet,
    WALLET_POLLING_INTERVAL,
    walletPolling,
    walletPollingSaga
} from '../wallet';
import {setSendMoneyStepAction, setTransfersAction, setWalletAction, setWalletsAction} from '../../actions/wallet';
import {SEND_COINS_STEPS} from '../../constants/wallet';
import * as uiHelpers from '../../helpers/ui';

describe('Wallet sagas tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Reactions on events', () => {
        it('should take latest WALLET_LOAD_WALLETS_REQUEST action and run loadWallets saga', () => {
            const gen = loadWalletsSaga();
            expect(gen.next().value).toEqual(takeLatest('WALLET_LOAD_WALLETS_REQUEST', loadWallets));
            expect(gen.next().done).toBe(true);
        });

        it('should take latest WALLET_LOAD_WALLET_REQUEST action and run loadWallet saga', () => {
            const gen = loadWalletSaga();
            expect(gen.next().value).toEqual(takeLatest('WALLET_LOAD_WALLET_REQUEST', loadWallet));
            expect(gen.next().done).toBe(true);
        });

        it('should take latest ["WALLET_SET_WALLET", "WALLET_CLEAR_WALLET"] actions and run walletPolling saga', () => {
            const gen = walletPollingSaga();
            expect(gen.next().value).toEqual(takeLatest(['WALLET_SET_WALLET', 'WALLET_CLEAR_WALLET'], walletPolling));
            expect(gen.next().done).toBe(true);
        });

        it('should take every WALLET_SEND_COINS_REQUEST action and run sendCoins saga', () => {
            const gen = sendCoinsSaga();
            expect(gen.next().value).toEqual(takeEvery('WALLET_SEND_COINS_REQUEST', sendCoins));
            expect(gen.next().done).toBe(true);
        });
    });

    const error = {
        info: {
            result: {
                message: 'Some error!'
            }
        }
    };

    describe('LoadWallets saga behavior', () => {
        it('should set wallets if wallets request is successful', () => {
            const gen = loadWallets();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.wallets));
            const response = {
                wallets: [{}, {}]
            };
            expect(gen.next(response).value).toEqual(put(setWalletsAction(response.wallets)));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });

        it('should call handleErrors if wallets request is failed', () => {
            const gen = loadWallets();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.wallets));
            expect(gen.throw(error).value).toEqual(call(handleErrors, error));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('LoadWallet saga behavior', () => {
        const action = {
            payload: 'walletId'
        };

        it('should call silentLoadWallet and set loading', () => {
            const gen = loadWallet(action);
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(silentLoadWallet, action.payload));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('SilentLoadWallet behavior', () => {
        const walletId = 'walletId';

        it('should set wallet and transfers if wallet and transfers requests are successful', () => {
            const gen = silentLoadWallet(walletId);
            expect(gen.next().value).toEqual(all([call(api.wallet, walletId), call(api.transfers, walletId)]));
            const walletResponse = {
                id: 'walletId'
            };
            const transfersResponse = {
                transfers: [{}]
            };
            expect(gen.next([walletResponse, transfersResponse]).value).toEqual(put(setWalletAction(walletResponse)));
            expect(gen.next().value).toEqual(put(setTransfersAction(transfersResponse.transfers)));
            expect(gen.next().done).toBe(true);
        });

        it('should call handleErrors if wallet or transfers requests are failed', () => {
            const gen = silentLoadWallet(walletId);
            expect(gen.next().value).toEqual(all([call(api.wallet, walletId), call(api.transfers, walletId)]));
            expect(gen.throw(error).value).toEqual(call(handleErrors, error));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('WalletPolling saga behavior', () => {
        it('should periodically call silentLoadWallet (infinity loop) for WALLET_SET_WALLET action', () => {
            const action = {
                type: 'WALLET_SET_WALLET',
                payload: {
                    id: 'walletId'
                }
            };
            const gen = walletPolling(action);
            expect(gen.next().value).toEqual(delay(WALLET_POLLING_INTERVAL));
            expect(gen.next().value).toEqual(call(silentLoadWallet, action.payload.id));
            expect(gen.next().value).toEqual(delay(WALLET_POLLING_INTERVAL));
            expect(gen.next().value).toEqual(call(silentLoadWallet, action.payload.id));
            expect(gen.next().value).toEqual(delay(WALLET_POLLING_INTERVAL));
            expect(gen.next().value).toEqual(call(silentLoadWallet, action.payload.id));
            expect(gen.next().value).toEqual(delay(WALLET_POLLING_INTERVAL));
            expect(gen.next().value).toEqual(call(silentLoadWallet, action.payload.id));
            expect(gen.next().done).toBe(false);
        });

        it('should do nothing for WALLET_CLEAR_WALLET action', () => {
            const action = {
                type: 'WALLET_CLEAR_WALLET'
            };
            const gen = walletPolling(action);
            expect(gen.next().done).toBe(true);
        });
    });

    describe('SendCoins saga behavior', () => {
        const action = {
            payload: {
                fromId: 'fromId',
                to: 'toAddress',
                amount: '0.001',
                passphrase: 'abcde',
                otp: '123456'
            }
        };

        it('should perform session unlock and call api.sendCoins with params', () => {
            jest.spyOn(uiHelpers, 'getNotificationId').mockReturnValue(123);
            const gen = sendCoins(action);
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(put(setSendMoneyStepAction(SEND_COINS_STEPS.inProgress)));
            expect(gen.next().value).toEqual(call(api.unlock, action.payload.otp));
            expect(gen.next().value).toEqual(
                call(api.sendCoins, {
                    walletId: action.payload.fromId,
                    address: action.payload.to,
                    amount: action.payload.amount,
                    walletPassphrase: action.payload.passphrase
                })
            );
            expect(gen.next().value).toEqual(put(showNotificationAction({message: 'Money was successfully sent!'})));
            expect(gen.next().value).toEqual(put(setSendMoneyStepAction(SEND_COINS_STEPS.success)));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().value).toEqual(put(setSendMoneyStepAction(SEND_COINS_STEPS.initial)));
            expect(gen.next().done).toBe(true);
        });

        it('should call handleErrors if one of requests is failed', () => {
            const gen = sendCoins(action);
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(put(setSendMoneyStepAction(SEND_COINS_STEPS.inProgress)));
            expect(gen.next().value).toEqual(call(api.unlock, action.payload.otp));
            expect(gen.throw(error).value).toEqual(call(handleErrors, error));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().value).toEqual(put(setSendMoneyStepAction(SEND_COINS_STEPS.initial)));
            expect(gen.next().done).toBe(true);
        });
    });
});

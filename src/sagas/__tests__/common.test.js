import {put} from 'redux-saga/effects';

import {handleErrors} from '../common';
import {showNotificationAction} from '../../actions/ui';
import * as uiHelpers from '../../helpers/ui';

describe('Common sagas tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('handleErrors behavior', () => {
        beforeEach(() => {
            jest.spyOn(uiHelpers, 'getNotificationId').mockReturnValue(123);
        });

        it('should get error from info.result.message prop and show notification', () => {
            const error = {
                info: {
                    result: {
                        message: 'Some error!'
                    }
                }
            };
            const gen = handleErrors(error);
            expect(gen.next().value).toEqual(put(showNotificationAction({type: 'error', message: 'Some error!'})));
            expect(gen.next().done).toBe(true);
        });

        it('should get error from info.result.error prop and show notification', () => {
            const error = {
                info: {
                    result: {
                        error: 'Some error!'
                    }
                }
            };
            const gen = handleErrors(error);
            expect(gen.next().value).toEqual(put(showNotificationAction({type: 'error', message: 'Some error!'})));
            expect(gen.next().done).toBe(true);
        });

        it('should get error from info.message prop and show notification', () => {
            const error = {
                info: {
                    message: 'Some error!'
                }
            };
            const gen = handleErrors(error);
            expect(gen.next().value).toEqual(put(showNotificationAction({type: 'error', message: 'Some error!'})));
            expect(gen.next().done).toBe(true);
        });

        it('should show notification with standard error message in case of unparsed error', () => {
            const error = {
                info: {
                    someMessage: 'Some error!'
                }
            };
            const gen = handleErrors(error);
            expect(gen.next().value).toEqual(
                put(showNotificationAction({type: 'error', message: 'Something went wrong...'}))
            );
            expect(gen.next().done).toBe(true);
        });
    });
});

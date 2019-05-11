import uiReducer from '../ui';

describe('UI reducer tests', () => {
    it('should have initial state', () => {
        const initialState = {
            loading: false,
            notifications: []
        };

        expect(uiReducer(undefined, {})).toEqual(initialState);
    });

    it('should set application loading state', () => {
        const state = {
            loading: false
        };

        const payload = true;

        expect(uiReducer(state, {type: 'UI_SET_APP_LOADING', payload})).toEqual({
            loading: payload
        });
    });

    it('should unset application loading state', () => {
        const state = {
            loading: true
        };

        const payload = false;

        expect(uiReducer(state, {type: 'UI_SET_APP_LOADING', payload})).toEqual({
            loading: payload
        });
    });

    it('should add new notification in array', () => {
        const state = {
            notifications: [{id: 1, type: 'error', message: 'Error message'}]
        };

        const payload = {id: 2, type: 'error', message: 'New error message'};

        expect(uiReducer(state, {type: 'UI_SHOW_NOTIFICATION', payload})).toEqual({
            notifications: [
                {id: 1, type: 'error', message: 'Error message'},
                {id:2, type: 'error', message: 'New error message'}
            ]
        });
    });

    it('should add remove notification from array by id', () => {
        const state = {
            notifications: [
                {id: 1, type: 'error', message: 'Error message'},
                {id: 2, type: 'error', message: 'New error message'}
            ]
        };

        expect(uiReducer(state, {type: 'UI_HIDE_NOTIFICATION', payload: 2})).toEqual({
            notifications: [
                {id: 1, type: 'error', message: 'Error message'}
            ]
        });
    });
});
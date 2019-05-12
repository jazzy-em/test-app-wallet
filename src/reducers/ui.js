import produce from 'immer';

import {UI} from '../constants/actions';

const initialState = {
    loading: false,
    notifications: []
};

const uiReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UI.SET_APP_LOADING:
                draft.loading = action.payload;
                break;
            case UI.SHOW_NOTIFICATION:
                draft.notifications.push(action.payload);
                break;
            case UI.HIDE_NOTIFICATION:
                draft.notifications = state.notifications.filter(notif => notif.id !== action.payload);
                break;
        }
    });

export default uiReducer;

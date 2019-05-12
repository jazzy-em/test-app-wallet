import {UI} from '../constants/actions';

const initialState = {
    loading: false,
    notifications: []
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case UI.SET_APP_LOADING:
            return {...state, loading: action.payload};
        case UI.SHOW_NOTIFICATION:
            return {...state, notifications: state.notifications.concat({...action.payload})};
        case UI.HIDE_NOTIFICATION:
            return {...state, notifications: state.notifications.filter(notif => notif.id !== action.payload)};
    }
    return state;
};

export default uiReducer;

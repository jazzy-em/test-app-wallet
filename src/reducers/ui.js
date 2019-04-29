const initialState = {
    loading: false,
    notifications: []
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UI_SET_APP_LOADING':
            return {...state, loading: action.payload};
        case 'UI_SHOW_NOTIFICATION':
            return {...state, notifications: state.notifications.concat({...action.payload})};
        case 'UI_HIDE_NOTIFICATION':
            return {...state, notifications: state.notifications.filter(notif => notif.id !== action.payload)};
    }
    return state;
};

export default uiReducer;

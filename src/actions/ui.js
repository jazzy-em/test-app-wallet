import {getNotificationId} from '../helpers/ui';
import {UI} from '../constants/actions';

export const setAppLoading = loading => ({
    type: UI.SET_APP_LOADING,
    payload: loading
});

export const showNotificationAction = ({message, type, duration}) => ({
    type: UI.SHOW_NOTIFICATION,
    payload: {id: getNotificationId(), message, type, duration}
});

export const hideNotificationAction = id => ({
    type: UI.HIDE_NOTIFICATION,
    payload: id
});

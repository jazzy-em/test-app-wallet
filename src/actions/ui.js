import {getNotificationId} from '../helpers/ui';

export const setAppLoading = loading => ({
    type: 'UI_SET_APP_LOADING',
    payload: loading
});

export const showNotificationAction = ({message, type, duration}) => ({
    type: 'UI_SHOW_NOTIFICATION',
    payload: {id: getNotificationId(), message, type, duration}
});

export const hideNotificationAction = id => ({
    type: 'UI_HIDE_NOTIFICATION',
    payload: id
});

import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ConnectedLogoutPage, {LogoutPage} from '..';
import AuthPageTemplate from '../../AuthPageTemplate';
import {logoutRequestAction} from '../../../../actions/auth';

describe('Logout page tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const component = shallow(<LogoutPage />);
            expect(component.find(AuthPageTemplate).length).toBe(1);
        });

        it('should call logoutRequest prop on component mount if userInfo prop is defined', () => {
            const logoutRequest = jest.fn();
            jest.spyOn(AuthPageTemplate, 'type').mockImplementation(({children}) => <div>{children}</div>);
            const component = mount(<LogoutPage logoutRequest={logoutRequest} userInfo={{}}/>);
            expect(logoutRequest).toHaveBeenCalled();
            expect(component.text()).toBe('Logging out...');
        });

        it('should not call logoutRequest prop on component mount if userInfo prop is undefined', () => {
            const logoutRequest = jest.fn();
            jest.spyOn(AuthPageTemplate, 'type').mockImplementation(({children}) => <div>{children}</div>);
            const component = mount(<LogoutPage logoutRequest={logoutRequest} />);
            expect(logoutRequest).not.toHaveBeenCalled();
            expect(component.text()).toBe('You have successfully logged out');
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            auth: {
                userInfo: {}
            }
        };
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(AuthPageTemplate, 'type').mockImplementation(() => <div />);
        });

        it('should connect userInfo prop', () => {
            const component = mount(<Provider store={store}>
                <ConnectedLogoutPage />
            </Provider>);
            const page = component.find(LogoutPage);
            expect(page.prop('userInfo')).toBe(initial.auth.userInfo);
        });

        it('should connect logoutRequest prop', () => {
            const component = mount(<Provider store={store}>
                <ConnectedLogoutPage />
            </Provider>);
            const page = component.find(LogoutPage);
            expect(page.prop('logoutRequest')()).toEqual(logoutRequestAction());
        });
    });
});
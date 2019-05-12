import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Button from '@material-ui/core/Button';
import {curry} from 'ramda';

import ConnectedLoginPage, {LoginPage} from '..';
import AuthPageTemplate from '../../AuthPageTemplate';
import {loginRequestAction} from '../../../../actions/auth';

describe('Login page tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const findField = curry((name, component) => component.find(`TextField[name="${name}"]`));
    const findEmailField = findField('email');
    const findPasswordField = findField('password');
    const findOtpField = findField('otp');
    const findLoginButton = component => component.find(Button);

    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const component = shallow(<LoginPage />);
            expect(component.find(AuthPageTemplate).length).toBe(1);
            expect(findEmailField(component).length).toBe(1);
            expect(findPasswordField(component).length).toBe(1);
            expect(findOtpField(component).length).toBe(1);
            expect(findLoginButton(component).length).toBe(1);
        });

        it('should not call loginRequest prop on login button click if component state is not valid', () => {
            const loginRequest = jest.fn();
            const component = shallow(<LoginPage loginRequest={loginRequest} />);
            findEmailField(component).simulate('change', {
                target: {
                    name: 'email',
                    value: '123@123.com'
                }
            });
            findPasswordField(component).simulate('change', {
                target: {
                    name: 'password',
                    value: '1234'
                }
            });
            findLoginButton(component).simulate('click');
            expect(loginRequest).not.toHaveBeenCalled();
            expect(findEmailField(component).prop('error')).toBe(false);
            expect(findPasswordField(component).prop('error')).toBe(false);
            expect(findOtpField(component).prop('error')).toBe(true);
        });

        it('should call loginRequest prop on login button click if component state is valid', () => {
            const loginRequest = jest.fn();
            const component = shallow(<LoginPage loginRequest={loginRequest} />);
            findEmailField(component).simulate('change', {
                target: {
                    name: 'email',
                    value: '123@123.com'
                }
            });
            findPasswordField(component).simulate('change', {
                target: {
                    name: 'password',
                    value: '1234'
                }
            });
            findOtpField(component).simulate('change', {
                target: {
                    name: 'otp',
                    value: '000000'
                }
            });
            findLoginButton(component).simulate('click');
            expect(loginRequest).toHaveBeenCalled();
            expect(findEmailField(component).prop('error')).toBe(false);
            expect(findPasswordField(component).prop('error')).toBe(false);
            expect(findOtpField(component).prop('error')).toBe(false);
        });

        it('should call loginRequest prop on Enter keypress if component state is valid', () => {
            const loginRequest = jest.fn();
            const component = shallow(<LoginPage loginRequest={loginRequest} />);
            findEmailField(component).simulate('change', {
                target: {
                    name: 'email',
                    value: '123@123.com'
                }
            });
            findPasswordField(component).simulate('change', {
                target: {
                    name: 'password',
                    value: '1234'
                }
            });
            findOtpField(component).simulate('change', {
                target: {
                    name: 'otp',
                    value: '000000'
                }
            });
            findOtpField(component).simulate('keypress', {
                key: 'Enter'
            });
            expect(loginRequest).toHaveBeenCalled();
            expect(findEmailField(component).prop('error')).toBe(false);
            expect(findPasswordField(component).prop('error')).toBe(false);
            expect(findOtpField(component).prop('error')).toBe(false);
        });
    });

    describe('Connected component behavior', () => {
        let initial = {};
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(AuthPageTemplate, 'type').mockImplementation(() => <div />);
        });

        it('should connect loginRequest prop', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedLoginPage />
                </Provider>
            );
            const page = component.find(LoginPage);
            expect(page.prop('loginRequest')({})).toEqual(loginRequestAction({}));
        });
    });
});

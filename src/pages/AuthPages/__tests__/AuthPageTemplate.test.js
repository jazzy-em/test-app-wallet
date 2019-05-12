import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import * as reactRouterDom from 'react-router-dom';

import ConnectedAuthPageTemplate, {AuthPageTemplate} from '../AuthPageTemplate';
import AppLoadingIndicator from '../../../components/AppLoadingIndicator';
import {setAuthErrorsAction} from '../../../actions/auth';

describe('AuthPageTemplate tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const children = <div className="test-body">123</div>;
            const setAuthErrors = jest.fn();
            const component = shallow(<AuthPageTemplate setAuthErrors={setAuthErrors}>{children}</AuthPageTemplate>);
            expect(component.find(AppLoadingIndicator).length).toBe(1);
            expect(component.find('.errors').length).toBe(0);
            expect(component.find('.test-body').length).toBe(1);
        });

        it('should render auth errors if errors prop is defined', () => {
            const children = <div className="test-body">123</div>;
            const setAuthErrors = jest.fn();
            const errors = ['error1', 'error2'];
            const component = shallow(
                <AuthPageTemplate setAuthErrors={setAuthErrors} errors={errors}>
                    {children}
                </AuthPageTemplate>
            );
            expect(component.find('.errors').length).toBe(1);
            expect(component.find('.error').length).toBe(2);
        });

        it('should call setAuthErrors on mount', () => {
            const setAuthErrors = jest.fn();
            shallow(<AuthPageTemplate setAuthErrors={setAuthErrors} />);
            expect(setAuthErrors).toHaveBeenCalled();
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            auth: {
                authErrors: ['error1']
            }
        };
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(reactRouterDom, 'Link').mockImplementation(({to}) => <a href={to} />);
            jest.spyOn(AppLoadingIndicator, 'type').mockImplementation(() => <div />);
        });

        it('should connect errors prop', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedAuthPageTemplate />
                </Provider>
            );
            const template = component.find(AuthPageTemplate);
            expect(template.prop('errors')).toBe(initial.auth.authErrors);
        });

        it('should connect setAuthErrors prop', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedAuthPageTemplate />
                </Provider>
            );
            const template = component.find(AuthPageTemplate);
            expect(template.prop('setAuthErrors')([])).toEqual(setAuthErrorsAction([]));
        });
    });
});

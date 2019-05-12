import React from 'react';
import {shallow, mount} from 'enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ConnectedContentPageTemplate, {ContentPageTemplate} from '../ContentPageTemplate';
import AppBar from '../../../components/Appbar';
import AppLoadingIndicator from '../../../components/AppLoadingIndicator';

describe('ContentPageTemplate tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Pure component behavior', () => {
        it('should render main parts', () => {
            const component = shallow(<ContentPageTemplate />);
            expect(component.find(AppBar).length).toBe(1);
            expect(component.find(AppLoadingIndicator).length).toBe(1);
            expect(component.find('.loading').length).toBe(0);
        });

        it('should render loading background when loading prop is true', () => {
            const component = shallow(<ContentPageTemplate loading={true} />);
            expect(component.find('.loading').length).toBe(1);
        });

        it('should render title and children', () => {
            const body = <div className="test-body">body</div>;
            const title = <span className="test-title">title</span>;
            const component = shallow(<ContentPageTemplate title={title}>{body}</ContentPageTemplate>);
            expect(component.find('.test-body').length).toBe(1);
            expect(component.find('.test-title').length).toBe(1);
        });
    });

    describe('Connected component behavior', () => {
        let initial = {
            ui: {
                loading: true
            }
        };
        let store;
        beforeEach(() => {
            const reducer = (state = initial) => {
                return state;
            };
            store = createStore(reducer);
            jest.spyOn(AppBar, 'type').mockImplementation(() => <div />);
            jest.spyOn(AppLoadingIndicator, 'type').mockImplementation(() => <div />);
        });

        it('should connect loading prop', () => {
            const component = mount(
                <Provider store={store}>
                    <ConnectedContentPageTemplate />
                </Provider>
            );
            const template = component.find(ContentPageTemplate);
            expect(template.prop('loading')).toBe(true);
        });
    });
});

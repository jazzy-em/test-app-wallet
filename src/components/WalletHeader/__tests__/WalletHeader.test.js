import React from 'react';
import {mount} from 'enzyme';
import * as reactRouterDom from 'react-router-dom';

import WalletHeader from '..';

describe('WalletHeader tests', () => {
    it('should render wallet info if wallet prop is specified', () => {
        jest.spyOn(reactRouterDom, 'Link').mockImplementation(({to}) => <a href={to} />);
        const wallet = {
            label: 'My wallet ',
            coin: 'B',
            balance: 200000
        };
        const component = mount(<WalletHeader wallet={wallet} />);
        expect(component.find('IconButton').length).toBe(1);
        expect(component.find('IconButton').prop('to')).toBe('/');
        expect(component.text()).toBe('My wallet 0.002 B');
    });

    it('should render only back button and Loading... if wallet prop is not specified', () => {
        jest.spyOn(reactRouterDom, 'Link').mockImplementation(({to}) => <a href={to} />);
        const component = mount(<WalletHeader />);
        expect(component.find('IconButton').length).toBe(1);
        expect(component.find('IconButton').prop('to')).toBe('/');
        expect(component.text()).toBe('Loading...');
    });
});

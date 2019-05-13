import React from 'react';
import {shallow, mount} from 'enzyme';
import Snackbar from '@material-ui/core/Snackbar';

import {Notifications} from '..';

describe('Notifications tests', () => {
    it('should render closed Snackbar by default', () => {
        const component = shallow(<Notifications />);
        expect(component.find(Snackbar).length).toBe(1);
        expect(component.find(Snackbar).prop('open')).toBe(false);
    });

    it('should open Snackbar when notifications prop is changed', () => {
        const component = mount(<Notifications hideNotification={() => {}} />);
        let snackbar = component.find(Snackbar);
        expect(snackbar.length).toBe(1);
        expect(snackbar.prop('open')).toBe(false);
        component.setProps({
            notifications: [{message: 'Hello!'}]
        });
        component.update();
        snackbar = component.find(Snackbar);
        expect(component.text().includes('Hello!')).toBe(true);
        expect(snackbar.prop('open')).toBe(true);
    });
});

import React from 'react';
import {mount} from 'enzyme';

import Table from '..';

describe('Table tests', () => {
    it('should render head and rows from received props', () => {
        const head = [
            {
                id: 'date',
                label: 'Date'
            },
            {
                id: 'type',
                label: 'Type'
            }
        ];
        const rows = [
            {
                date: '05/01/2019',
                type: 'completed'
            }
        ];
        const component = mount(<Table head={head} rows={rows} />);
        expect(component.find('TableHead TableCell').map(node => node.text())).toEqual(['Date', 'Type']);
        expect(component.find('TableBody TableCell').map(node => node.text())).toEqual(['05/01/2019', 'completed']);
    });
});

import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './styles.less';

export const Table = ({head = [], rows = []}) => {
    return (
        <div className={styles.container}>
            <MUITable>
                <TableHead>
                    <TableRow>
                        {head.map(column => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow
                            key={row.id || i}
                            onClick={row.onClick}
                            className={classnames(styles.row, {[styles.clickableRow]: row.onClick})}
                        >
                            {head.map(column => (
                                <TableCell key={column.id}>{row[column.id]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MUITable>
        </div>
    );
};

Table.propTypes = {
    head: PropTypes.array,
    rows: PropTypes.array
};

export default memo(Table);

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import styles from './styles.less';

import {formatWalletBalance} from '../../utils/formats';
import {getWalletsUrl} from '../../helpers/routes';

const WalletHeader = ({wallet}) => (
    <div className={styles.header}>
        <IconButton
            component={Link}
            to={getWalletsUrl()}
        >
            <Icon>keyboard_backspace</Icon>
        </IconButton>
        {wallet ? (
            <>
                {wallet.label}
                <div className={styles.spacer}/>
                <Typography variant="h6">{formatWalletBalance(wallet)}</Typography>
            </>
        ) : 'Loading...'}
    </div>
);

WalletHeader.propTypes = {
    wallet: PropTypes.object
};

export default WalletHeader;
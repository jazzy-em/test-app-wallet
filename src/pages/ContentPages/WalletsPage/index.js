import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ContentPageTemplate from '../ContentPageTemplate';
import {loadWalletsRequestAction} from '../../../actions/wallet';
import {getWallets} from '../../../selectors/wallet';
import WalletsTable from '../../../components/WalletsTable';

export const WalletsPage = ({wallets = [], loadWallets, history}) => {
    useEffect(() => {
        loadWallets();
    }, []);

    return (
        <ContentPageTemplate title="Your wallets">
            <WalletsTable wallets={wallets} history={history} />
        </ContentPageTemplate>
    );
};

WalletsPage.propTypes = {
    wallets: PropTypes.array,
    loadWallets: PropTypes.func,
    history: PropTypes.object
};

export default connect(
    store => ({
        wallets: getWallets(store)
    }),
    {
        loadWallets: loadWalletsRequestAction
    }
)(WalletsPage);

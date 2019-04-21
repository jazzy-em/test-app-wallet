import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {jsonRequest, setNetworkOptions} from "../../utils/network";

const WalletsPage = () => {
    useEffect(() => {
        console.log('loading balance');
        jsonRequest('/api/wallet');
    }, []);
    return (
        <div>Wallets page</div>
    )
};

export default WalletsPage;
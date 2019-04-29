import React from 'react';
import {hot} from 'react-hot-loader'
import {Switch, Route, Redirect} from 'react-router-dom';
import WalletsPage from './pages/ContentPages/WalletsPage';
import WalletPage from './pages/ContentPages/WalletPage';
import LoginPage from './pages/AuthPages/LoginPage';
import LogoutPage from './pages/AuthPages/LogoutPage';
import {loginUrl, logoutUrl, walletUrl} from './helpers/routes';
//import WalletPage from './pages/WalletPage';

import './styles.less';
import Notifications from './components/Notifications';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={WalletsPage} />
                <Route exact path={`${walletUrl}/:id`} component={WalletPage} />
                <Route exact path={loginUrl} component={LoginPage} />
                <Route exact path={logoutUrl} component={LogoutPage} />
                <Redirect to={'/'}/>
            </Switch>
            <Notifications />
        </>
    );
};

export default hot(module)(App)

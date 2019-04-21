import React from 'react';
import {hot} from 'react-hot-loader'
import {Switch, Route, Redirect} from 'react-router-dom';
import WalletsPage from './pages/WalletsPage';
import LoginPage from './pages/AuthPages/LoginPage';
import LogoutPage from './pages/AuthPages/LogoutPage';
import {loginUrl, logoutUrl} from './helpers/routes';
//import WalletPage from './pages/WalletPage';

import './styles.less';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={WalletsPage} />
                <Route exact path={loginUrl} component={LoginPage} />
                <Route exact path={logoutUrl} component={LogoutPage} />
                <Redirect to={'/'}/>
            </Switch>
        </>
    );
};

export default hot(module)(App)

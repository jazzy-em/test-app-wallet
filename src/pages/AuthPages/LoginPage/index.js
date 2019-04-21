import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

import styles from '../styles.less';

import {loginRequestAction} from '../../../actions/auth';
import AuthPageTemplate from '../AuthPageTemplate';
import queryString from 'query-string';

class LoginPage extends React.PureComponent {
    state = {
        email: '',
        password: '',
        otp: ''
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    login = () => {
        const {redirectTo} = queryString.parse(window.location.search);
        const {email, password, otp} = this.state;
        this.props.loginRequest({
            login: email,
            password,
            otp,
            redirectTo
        });
    };

    render() {
        const {email, password, otp} = this.state;
        return (
            <AuthPageTemplate>
                <div>
                    <TextField
                        label="E-mail"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        fullWidth
                        margin="dense"
                        onKeyPress={this.onKeyPress}
                    />
                </div>

                <div>
                    <TextField
                        label="Password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        fullWidth
                        margin="dense"
                        type="password"
                        onKeyPress={this.onKeyPress}
                    />
                </div>

                <div>
                    <TextField
                        label="OTP"
                        name="otp"
                        value={otp}
                        onChange={this.handleChange}
                        fullWidth
                        margin="dense"
                        onKeyPress={this.onKeyPress}
                    />
                </div>

                <Button variant="contained" color="primary" className={styles.button} onClick={this.login}>
                    Login
                </Button>
            </AuthPageTemplate>
        );
    }

    static propTypes = {
        match: PropTypes.object,
        loginRequest: PropTypes.func
    }
}

export default connect(store => ({}), {
    loginRequest: loginRequestAction
})(LoginPage);
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
        otp: '',
        emailError: false,
        passwordError: false,
        otpError: false
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
            [`${name}Error`]: false
        });
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    setError = name => {
        this.setState({
            [`${name}Error`]: true
        })
    };

    validate = () => {
        let isValid = true;
        const fieldNames = ['email', 'password', 'otp'];
        fieldNames.forEach((name) => {
            if (!this.state[name]) {
                this.setError(name);
                isValid = false;
            }
        });
        return isValid;
    };

    login = () => {
        if (this.validate()) {
            const {redirectTo} = queryString.parse(window.location.search);
            const {email, password, otp} = this.state;
            this.props.loginRequest({
                login: email,
                password,
                otp,
                redirectTo
            });
        }
    };

    render() {
        const {email, password, otp, emailError, passwordError, otpError} = this.state;
        return (
            <AuthPageTemplate>
                <div>
                    <TextField
                        label="E-mail"
                        name="email"
                        error={emailError}
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
                        error={passwordError}
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
                        error={otpError}
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

export default connect(() => ({}), {
    loginRequest: loginRequestAction
})(LoginPage);
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {sendCoinsRequestAction} from '../../actions/wallet';
import {btcToSatoshi} from '../../utils/formats';
import {getSendMoneyStep} from '../../selectors/wallet';
import {SEND_COINS_STATES} from '../../constants/wallet';

const initialState = {
    open: false,
    to: '',
    amount: '0',
    passphrase: '',
    otp: '',
    toError: false,
    amountError: false,
    passphraseError: false,
    otpError: false
};

export class SendMoneyButton extends React.PureComponent {
    state = {...initialState};

    componentDidUpdate = prevProps => {
        if (this.props.step !== prevProps.step && this.props.step === SEND_COINS_STATES.success) {
            this.closeDialog();
        }
    };

    sendMoney = () => {
        if (this.validate()) {
            const {to, amount, passphrase, otp} = this.state;
            this.props.sendCoins({
                fromId: this.props.walletId,
                to,
                amount: btcToSatoshi(amount),
                passphrase,
                otp
            });
        }
    };

    validate = () => {
        let isValid = true;
        const fieldNames = ['to', 'amount', 'passphrase', 'otp'];
        fieldNames.forEach(name => {
            if (!this.state[name]) {
                this.setError(name);
                isValid = false;
            }
        });
        const {amount} = this.state;
        const parsedAmount = +amount.replace(',', '.');
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            this.setError('amount');
            isValid = false;
        }
        return isValid;
    };

    openDialog = () => {
        this.setState({
            ...initialState,
            open: true
        });
    };

    isSendingInProgress = () => {
        return this.props.step === SEND_COINS_STATES.inProgress;
    };

    closeDialog = () => {
        if (!this.isSendingInProgress()) {
            this.setState({
                open: false
            });
        }
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
            this.sendMoney();
        }
    };

    setError = name => {
        this.setState({
            [`${name}Error`]: true
        });
    };

    render() {
        const {open, to, amount, passphrase, otp, toError, amountError, passphraseError, otpError} = this.state;
        const coin = (this.props.coin || '').toUpperCase();
        return (
            <>
                <Button variant="contained" color="primary" onClick={this.openDialog}>
                    Send money
                </Button>
                <Dialog open={open} onClose={this.closeDialog}>
                    <DialogTitle>Send money</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To send money, please fill all fields below (all are required):
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Address"
                            value={to}
                            error={toError}
                            name="to"
                            onChange={this.handleChange}
                            onKeyPress={this.onKeyPress}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label={`Amount ${coin} to send`}
                            type="number"
                            value={amount}
                            error={amountError}
                            name="amount"
                            onChange={this.handleChange}
                            onKeyPress={this.onKeyPress}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Wallet passphrase"
                            value={passphrase}
                            error={passphraseError}
                            type="password"
                            name="passphrase"
                            onChange={this.handleChange}
                            onKeyPress={this.onKeyPress}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="OTP"
                            type="number"
                            value={otp}
                            error={otpError}
                            name="otp"
                            onChange={this.handleChange}
                            onKeyPress={this.onKeyPress}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.isSendingInProgress()} onClick={this.closeDialog}>
                            Cancel
                        </Button>
                        <Button disabled={this.isSendingInProgress()} onClick={this.sendMoney} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    static propTypes = {
        walletId: PropTypes.string.isRequired,
        step: PropTypes.oneOf(Object.values(SEND_COINS_STATES)),
        coin: PropTypes.string.isRequired,
        sendCoins: PropTypes.func.isRequired
    };
}

export default connect(
    store => ({
        step: getSendMoneyStep(store)
    }),
    {
        sendCoins: sendCoinsRequestAction
    }
)(SendMoneyButton);

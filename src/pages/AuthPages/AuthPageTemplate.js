import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import styles from './styles.less';
import Logo from './Bitcoin.svg';

import AppLoadingIndicator from '../../components/AppLoadingIndicator';
import {getAuthErrors} from '../../selectors/auth';
import {setAuthErrorsAction} from '../../actions/auth';

export class AuthPageTemplate extends React.PureComponent {
    componentDidMount() {
        this.props.setAuthErrors([]);
    }

    render() {
        const {children, errors = []} = this.props;
        return (
            <div className={styles.container}>
                <AppLoadingIndicator onTop={true} />
                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <Link to="/">
                            <Logo />
                        </Link>
                        {errors.length > 0 && (
                            <div className={styles.errors}>
                                {errors.map((error, i) => (
                                    <div key={i} className={styles.error}>
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

AuthPageTemplate.propTypes = {
    children: PropTypes.node,
    errors: PropTypes.array,
    setAuthErrors: PropTypes.func
};

export default connect(
    store => ({
        errors: getAuthErrors(store)
    }),
    {
        setAuthErrors: setAuthErrorsAction
    }
)(AuthPageTemplate);

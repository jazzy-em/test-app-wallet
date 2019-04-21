import * as React from 'react';

const memo = Component =>
    class memo extends React.PureComponent {
        render() {
            return <Component {...this.props} />;
        }
    };

module.exports = {...React, memo};

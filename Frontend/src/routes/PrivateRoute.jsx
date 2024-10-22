import PropTypes from "prop-types";
import { Component } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, isClosed, ...rest }) {
    const isLogged = useSelector(states => states.auth.isLogged);

    if (isClosed && !isLogged) {
        return (
            <Redirect to={{ pathname: '/entrar' }}/>
        );
    }

    return (
        <Route {...rest} component={Component} />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]).isRequired,
    isClosed: PropTypes.bool,
}

PrivateRoute.defaultProps = {
    isClosed: false,
}

export default PrivateRoute;
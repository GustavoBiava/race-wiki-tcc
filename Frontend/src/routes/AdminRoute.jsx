import PropTypes from "prop-types";
import { Component } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';

function AdminRoute({ component: Component, isClosed, ...rest }) {
    const isLogged = useSelector(states => states.auth.isLogged);
    const type = useSelector(states => states.auth.user.type);

    if (isClosed && !isLogged && type !== 'ADMIN') {
        return (
            <Redirect to={{ pathname: '/entrar' }}/>
        );
    }

    return (
        <Route {...rest} component={Component} />
    );
}

AdminRoute.propTypes = {
    component: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]).isRequired,
    isClosed: PropTypes.bool,
}

AdminRoute.defaultProps = {
    isClosed: false,
}

export default AdminRoute;
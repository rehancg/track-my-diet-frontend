import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Api from '../api';

const withAuth = (WrapperComponent) => {
    return (props) => {
        const history = useHistory();
        const location = useLocation();
        const token = localStorage.getItem('jwt');
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        if (location.pathname === '/login' && token != null) {
            history.replace('/');
        }
        else if (!token && location.pathname !== '/login') {
            history.replace('/login');
        }
        else return <WrapperComponent token={token} />

        return null;
    }
}

export default withAuth;
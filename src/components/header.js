import React from 'react';
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import classes from './style.module.css'

const Header = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.clear('jwt');
        history.replace('/login');
    }

    return (
        <>
            <Button className={classes.logoutBtn} onClick={logout} variant="link" type="button">Logout</Button>

            <h4 className={classes.title}>Track My Diet Dashboard</h4>
        </>
    )
}

export default Header;
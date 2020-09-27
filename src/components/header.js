import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import classes from './style.module.css'

const Header = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.clear('jwt');
        history.replace('/login');
    }

    const goToHome = () => {
        history.replace('/');
    }

    return (
        <>
            <Row>
                <div className={classes.btnContainer}>
                    <Button onClick={goToHome} variant="link" type="button">Home</Button>
                    <Button onClick={logout} variant="link" type="button">Logout</Button>
                </div>
            </Row>

            <h4 className={classes.title}>Track My Diet Dashboard</h4>
        </>
    )
}

export default Header;
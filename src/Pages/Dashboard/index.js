import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Api from '../../api';
import withAuth from '../../hoc/withAuth';
import classes from './style.module.css'

const Dashboard = (props) => {

    const history = useHistory();

    useEffect(() => {
        let getDataAsync = async () => {
            const response = await Api.get('/meta/activity_levels');
            console.log("response", response);
        }
        getDataAsync();
    }, [])

    const logout = () => {
        localStorage.clear('jwt');
        history.replace('/login');
    }

    return (
        <Container className={classes.container}>
            <Button className={classes.logoutBtn} onClick={logout} variant="info" type="button">Logout</Button>

            <h4 className={classes.title}>Track My Diet - Admin</h4>
            <Card>
                <Row>
                    <Col className={classes.col}>
                        <Link to='/login'>
                            <label className={classes.sectionLabel}>Foods</label>
                        </Link>
                    </Col>

                    <Col className={classes.col}>
                        <Link to='/login'>
                            <label className={classes.sectionLabel}>Meal Plans</label>
                        </Link>
                    </Col>

                    <Col className={classes.col}>
                        <Link to='/login'>
                            <label className={classes.sectionLabel}>Articles</label>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default withAuth(Dashboard);
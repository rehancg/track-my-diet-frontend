import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Api from '../../api';
import Header from '../../components/header';
import withAuth from '../../hoc/withAuth';
import classes from './style.module.css'

const Dashboard = (props) => {

    useEffect(() => {
        let getDataAsync = async () => {
            const response = await Api.get('/meta/activity_levels');
            console.log("response", response);
        }
        getDataAsync();
    }, [])

    return (
        <Container className={classes.container}>
            <Header />
            <Card>
                <Row>
                    <Col className={classes.col}>
                        <Link to='/foods'>
                            <label className={classes.sectionLabel}>Foods</label>
                        </Link>
                    </Col>

                    <Col className={classes.col}>
                        <Link to='/meal-plans'>
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
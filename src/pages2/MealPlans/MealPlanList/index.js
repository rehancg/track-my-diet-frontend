import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Api from '../../../api';
import Header from '../../../components/header';
import withAuth from '../../../hoc/withAuth';
import classes from './style.module.css';

const MealPlanList = () => {
    const history = useHistory();
    const [mealPlanList, setMealPlanList] = useState([]);

    const handleCreate = () => {
        history.push('/create-meal-plan')
    }

    useEffect(() => {
        loadMealPlans();
    }, [])

    const loadMealPlans = async () => {
        try {
            const response = await Api.get('/meal_plan');
            setMealPlanList(response.data);
        } catch (error) {

        }
    }

    return (
        <Container>
            <Header />
            <Button className={classes.createNewBtn} onClick={handleCreate} type="button" variant="link">Create new</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Cost Per Day</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        mealPlanList.map((plan) => (
                            <tr key={plan.id}>
                                <th>{plan.id}</th>
                                <th>{plan.name}</th>
                                <th>{plan?.calories}</th>
                                <th>{plan?.cost}</th>
                                <th><Link to={`/meal-plans/${plan.id}`}>Edit</Link></th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default withAuth(MealPlanList);
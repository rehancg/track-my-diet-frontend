import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Api from '../../../api';
import Header from '../../../components/header';
import withAuth from '../../../hoc/withAuth';
import classes from './style.module.css';

const FoodList = () => {
    const history = useHistory();
    const [foodList, setFoodList] = useState([]);

    const handleCreate = () => {
        history.push('/create-food')
    }

    useEffect(() => {
        loadFoodList();
    }, [])

    const loadFoodList = async () => {
        try {
            const response = await Api.get('/food');
            setFoodList(response.data);
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
                        <th>Total Calories</th>
                        <th>Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        foodList.map((food) => (
                            <tr key={food.id}>
                                <th>{food.id}</th>
                                <th>{food.name}</th>
                                <th>{food.calories}</th>
                                <th>{food.cost}</th>
                                <th><Link to={`/foods/${food.id}`}>Edit</Link></th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default withAuth(FoodList);
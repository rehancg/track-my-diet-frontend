import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import Api from '../../../api';
import classes from './style.module.css';

const AddFoodModal = ({ onSelect, show, onClose }) => {
    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        loadFoodList();
    }, [])

    const loadFoodList = async () => {
        try {
            const response = await Api.get('/food');
            if (!response.error) setFoodList(response.data);
        } catch (error) {

        }
    }

    return (
        <Modal show={show} size="lg" onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Food List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            foodList?.map((food) => (
                                <tr key={food.id}>
                                    <td>{food.id}</td>
                                    <td>{food.name}</td>
                                    <td>{food.calories}</td>
                                    <td>{food.cost}</td>
                                    <td><Button variant="link" type="button" onClick={() => onSelect(food)}>Add</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default AddFoodModal;
import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Modal, Table,Form } from 'react-bootstrap';
import Api from '../../../api';
import classes from './style.module.css';

const AddFoodModal = ({ onSelect, show, onClose }) => {
    const [foodList, setFoodList] = useState([]);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    useEffect(() => {
        loadFoodList();
    }, [])

    const loadFoodList = async () => {
        try {
            const response = await Api.get('/food');
            if (!response.error) {
                setFoodList(response.data);
                setFilteredFoodList(response.data);
            }
        } catch (error) {

        }
    }

    const onSearchQueryChange = (query) => {
        if(!query){
            setFilteredFoodList(foodList);
            return 
        }
        else if(isFinite(query)){
            const upperLimit = parseInt(query) + 50;
            const lowerLimit = parseInt(query) - 50;

            setFilteredFoodList(foodList.filter(x=>parseInt(x.calories) >= lowerLimit && parseInt(x.calories) <= upperLimit))
        }
        else{
            setFilteredFoodList(foodList.filter(x=>x.name.toLowerCase().includes(query)));
        }
    }

    return (
        <Modal show={show} size="lg" onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Food List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Control onChange={(e)=>onSearchQueryChange(e.target.value)} className={classes.searchInput} type="text" placeholder="Search by name or calories"  />
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
                            filteredFoodList?.map((food) => (
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
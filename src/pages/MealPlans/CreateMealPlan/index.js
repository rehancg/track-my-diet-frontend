import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, FormControl, Row, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Api from '../../../api';
import Header from '../../../components/header';
import withAuth from '../../../hoc/withAuth';
import AddFoodModal from '../AddFoodModal';
import classes from './style.module.css';

const CreateMealPlan = () => {
    const params = useParams();
    const history = useHistory();
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({ items: [] });
    const [foodTypes, setFoodTypes] = useState([]);
    const [eatingWindow, setEatingWindow] = useState([]);
    const [showFoodListModal, setShowFoodListModal] = useState(false);

    useEffect(() => {
        if (params.id) {
            loadData(params.id)
            setIsEdit(true)
        } else setIsEdit(false)

        setMetaData();
    }, [])

    const loadData = async (id) => {
        try {
            const response = await Api.get(`/meal_plan/${id}`);
            setData(response.data);
        } catch (error) {

        }
    }

    const setMetaData = async () => {
        try {
            const response = await Promise.all([
                Api.get('/meta/food_type'),
                Api.get('/meta/eating_window')
            ])
            setFoodTypes(response[0].data);
            setEatingWindow(response[1].data);
        } catch (error) {

        }
    }

    const handleSave = async () => {
        try {
            const func = isEdit ? Api.patch : Api.post
            setSaving(true)
            const response = await func('/meal_plan', data);
            if (response.error) alert(response.error?.message || 'Meal creation failed ');
            else {
                alert('Mealplan successfully created!');
                history.replace(`/meal-plans/${response.data.id}`)
            }
            setSaving(false)
        } catch (error) {
            setSaving(false)
            alert(error.message || 'Meal creation failed ');
        }
    }

    const goBack = () => {
        history.goBack();
    }

    const handleOnImageChanged = () => {

    }

    const onChangeTextInput = (type, e) => {
        setData({ ...data, [type]: e.target.value })
    }

    // On meta data change
    const onSelectMetaData = (type, e, meta) => {
        const value = meta.find(x => x.id == e.target.value);
        setData({ ...data, [type]: value })
    }

    const handleAddNewFood = (food) => {
        setData({
            ...data,
            items: [
                ...data.items,
                {
                    servings: 1,
                    food: food,
                    eating_window: null,
                }
            ]
        })
        setShowFoodListModal(false)
    }

    useEffect(()=>{
        calcluateTotalCalories();
    },[data.items])

    const calcluateTotalCalories = () => {
        const calories = data.items?.reduce((total, foodItem) => total + (foodItem.food.calories * foodItem.servings), 0);
        setData({
            ...data,
            calories
        })
    }

    const onChangeFoodEatingWindow = (e, meta, index) => {
        const eating_window = meta.find(x => x.id = e.target.value);
        const updatedItems = data.items.map((item, i) => {
            if (index == i) return { ...item, eating_window: eating_window }
            return item
        })
        setData({
            ...data,
            items: updatedItems
        })
    }

    const onChangeItemServings = (e, index) => {
        const updatedItems = data.items.map((item, i) => {
            if (index == i) return { ...item, servings: e.target.value }
            return item
        })
        setData({
            ...data,
            items: updatedItems
        })
    }

    const removeFoodItem = async (item) => {
        if (window.confirm('Are you sure?')) {
            const updatedItems = data.items.filter(i => i.id !== item.id)
            setData({
                ...data,
                items: updatedItems
            })
            try {
                await Api.delete(`/meal_plan/food/${item.id}`)
                window.location.reload();
            } catch (error) {

            }
        }
    }

    return (
        <Container>
            <Header />
            <Button variant="link" type="button" onClick={goBack}>Go back</Button>
            <Card className={classes.card}>
                <Card.Body className={classes.card_header}>
                    <Card.Title>{isEdit ? `Update Meal Plan` : "Create New Meal Plan"}</Card.Title>

                    <Row className={classes.formRow}>
                        <Col>
                            <Form.Label>#ID</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="#ID"
                                aria-label="id"
                                disabled
                                value={data?.id || 'Auto-generated'}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Total Calories</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Total Calories"
                                aria-label="id"
                                disabled
                                value={data?.calories || 'Auto-generated'}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Per Day Cost</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Per day cost"
                                aria-label="id"
                                disabled
                                value={data?.cost || 'Auto-generated'}
                            />
                        </Col>
                    </Row>


                    {/* Food Name */}
                    <Row className={classes.formRow}>
                        <Col>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                value={data?.name || ''}
                                onChange={(e) => onChangeTextInput('name', e)}
                            />
                        </Col>

                        <Col>
                            <FormControl
                                type="text"
                                placeholder="Name Sinhala"
                                value={data?.name_si || ''}
                                onChange={(e) => onChangeTextInput('name_si', e)}
                            />
                        </Col>
                    </Row>

                    {/* Food images */}
                    <Row className={classes.formRow}>
                        <Col>
                            {/* <Form.File
                                className="position-relative"
                                required
                                name="file"
                                label="Image"
                                onChange={handleOnImageChanged}
                                feedbackTooltip
                            /> */}
                            <FormControl
                                type="text"
                                placeholder="Image Url"
                                value={data?.image_url || ''}
                                onChange={(e) => onChangeTextInput('image_url', e)}
                            />
                        </Col>

                        <Col>
                            <Form.Label>Meal Type</Form.Label>
                            <Form.Control value={data?.food_type?.id || "Select"} as="select" onChange={(e) => onSelectMetaData('food_type', e, foodTypes)}>
                                <option key={0}>Select</option>
                                {
                                    foodTypes.map(type => <option value={type.id} key={type.id}>{type?.name}</option>)
                                }
                            </Form.Control>
                        </Col>
                    </Row>

                    <Button className={classes.saveBtn} onClick={handleSave} type="button" variant="info" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>

                </Card.Body>
            </Card>
            {
                isEdit && (
                    <Card className={classes.card}>
                        <Card.Body>
                            <Card.Title>{`Add foods to meal plan`}</Card.Title>
                            <Button variant="link" type="button" className={classes.addNewFoodBtn} onClick={() => setShowFoodListModal(!showFoodListModal)}>Add new</Button>
                            {
                                data?.items.length > 0 &&
                                (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Calories per serving</th>
                                                <th>Serving Size</th>
                                                <th>Serving Unit</th>
                                                <th>Servings</th>
                                                <th>Eating Window</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                data?.items?.map((item, index) => (
                                                    <tr>
                                                        <td>{item?.food?.name}</td>
                                                        <td>{item?.food?.calories}</td>
                                                        <td>{item?.food?.serving_size}</td>
                                                        <td>{item?.food?.serving_unit}</td>
                                                        <td>
                                                            <FormControl
                                                                type="text"
                                                                placeholder="Servings"
                                                                value={data?.items[index]?.servings || ''}
                                                                onChange={(e) => onChangeItemServings(e, index)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Control value={data?.items[index]?.eating_window?.id || "Select"} as="select" onChange={(e) => onChangeFoodEatingWindow(e, foodTypes, index)}>
                                                                <option key={0}>Select</option>
                                                                {
                                                                    eatingWindow.map(type => <option value={type.id} key={type.id}>{type?.name}</option>)
                                                                }
                                                            </Form.Control>
                                                        </td>
                                                        <td><Button variant="link" type="button" onClick={() => removeFoodItem(item)}>Remove</Button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                )}
                        </Card.Body>
                    </Card>
                )}
            <AddFoodModal show={showFoodListModal}  onSelect={handleAddNewFood} onClose={() => setShowFoodListModal(false)} />
        </Container>
    )
}

export default withAuth(CreateMealPlan);
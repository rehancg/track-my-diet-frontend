import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, FormCheck, FormControl, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';

import withAuth from '../../../hoc/withAuth';
import Api from '../../../api';
import Header from '../../../components/header';

import classes from './style.module.css';

const CreateFood = () => {
    const history = useHistory();
    const params = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [nutritionTypes, setNutritionTypes] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [eatingWindow, setEatingWindow] = useState([]);
    const [data, setData] = useState({ is_suppliment: false, is_budget: false });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setMetaData();
        let { id } = params;
        if (id) {
            setIsEdit(true);
            loadFoodDetails(id);
        } else
            setIsEdit(false);
    }, [])

    // Load food details
    const loadFoodDetails = async (id) => {
        try {
            const response = await Api.get(`/food/${id}`);
            setData(response.data);
        } catch (error) {

        }
    }

    // Load meta data
    const setMetaData = async () => {
        try {
            const response = await Promise.all([
                Api.get('/meta/nutrition_type'),
                Api.get('/meta/food_type'),
                Api.get('/meta/eating_window')
            ])

            setNutritionTypes(response[0].data);
            setFoodTypes(response[1].data);
            setEatingWindow(response[2].data);
        } catch (error) {

        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            const func = isEdit ? Api.patch : Api.post;
            const response = await func('/food', data);
            if (response.error) {
                alert(response.error.message || 'Error occured while saving food.')
            }
            else {
                alert('Food successfully added/updated!');
            }

            setSaving(false)
        } catch (error) {
            setSaving(false)
            alert(error?.message || 'Error occured while saving food.')
        }
    }

    // On thumbnail image selected
    const handleOnThumbnailChange = () => {

    }

    // On food full image selected
    const handleOnImageChange = () => {

    }

    // On toggle is budget option 
    const handleOnChangeIsBudget = () => {
        setData({ ...data, is_budget: !data.is_budget })
    }

    // On toggle is budget option 
    const handleOnChangeIsSuppliment = () => {
        setData({ ...data, is_suppliment: !data.is_suppliment })
    }

    // On meta data change
    const onSelectMetaData = (type, e, meta) => {
        const value = meta.find(x => x.id == e.target.value);
        setData({ ...data, [type]: value })
    }

    // On change text inputs
    const onChangeTextInput = (type, e) => {
        setData({ ...data, [type]: e.target.value })
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <Container>
            <Header />
            <Button variant="link" type="button" onClick={goBack}>Go back</Button>
            <Card className={classes.card}>
                <Card.Body>
                    <Card.Title>{isEdit ? `Update food ${data?.name || ''}` : 'Create New Food'}</Card.Title>

                    <FormControl
                        type="text"
                        placeholder="#ID"
                        aria-label="id"
                        disabled
                        className={classes.formRow}
                        value={data?.id || 'Auto-generated'}
                    />

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
                            <Form.File
                                className="position-relative"
                                required
                                name="file"
                                label="Thumnail Image"
                                onChange={handleOnThumbnailChange}
                                feedbackTooltip
                            />
                        </Col>

                        <Col>
                            <Form.File
                                className="position-relative"
                                required
                                name="file"
                                label="Full Food Image"
                                onChange={handleOnImageChange}
                                feedbackTooltip
                            />
                        </Col>
                    </Row>

                    {/* Serving and cost details */}
                    <Row className={classes.formRow}>
                        <Col>
                            <Form.Label>Serving Unit</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="g"
                                value={data?.serving_unit || ''}
                                onChange={(e) => onChangeTextInput('serving_unit', e)}
                            />
                        </Col>

                        <Col>
                            <Form.Label>Serving Size</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.serving_size || ''}
                                onChange={(e) => onChangeTextInput('serving_size', e)}
                            />
                        </Col>

                        <Col>
                            <Form.Label>Cost per day</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.cost || ''}
                                onChange={(e) => onChangeTextInput('cost', e)}
                            />
                        </Col>
                    </Row>

                    {/* Is budget food */}
                    <Row className={classes.formRow}>
                        <Col>
                            <Form.Switch
                                id="switchIsBudget"
                                label="Is Budget Food"
                                checked={data?.is_budget || false}
                                onChange={handleOnChangeIsBudget}
                            />
                        </Col>

                        <Col>
                            <Form.Switch
                                id="switchIsSuppliment"
                                label="Is Suppliment"
                                checked={data?.is_suppliment || false}
                                onChange={handleOnChangeIsSuppliment}
                            />
                        </Col>
                    </Row>

                    {/* Micros */}
                    <Row className={classes.formRow}>
                        <Col>
                            <Form.Label>Total calories</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.calories || ''}
                                onChange={(e) => onChangeTextInput('calories', e)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Protiens</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.protein || ''}
                                onChange={(e) => onChangeTextInput('protein', e)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Carbs</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.carb || ''}
                                onChange={(e) => onChangeTextInput('carb', e)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Fats</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="0"
                                value={data?.fat || ''}
                                onChange={(e) => onChangeTextInput('fat', e)}
                            />
                        </Col>
                    </Row>

                    {/* Meta data */}
                    <label>Meta data</label>
                    <Row className={classes.formRow}>
                        <Col>
                            <Form.Label>Nutrition Type</Form.Label>
                            <Form.Control value={data?.nutrition_type?.id || "Select"} as="select" onChange={(e) => onSelectMetaData('nutrition_type', e, nutritionTypes)}>
                                <option key={0}>Select</option>
                                {
                                    nutritionTypes.map(type => <option value={type.id} key={type.id}>{type?.name}</option>)
                                }
                            </Form.Control>
                        </Col>
                        {/* 
                        <Col>
                            <Form.Label>Food Type</Form.Label>
                            <Form.Control defaultValue="Select" as="select" onChange={(e) => onSelectMetaData('food_type', e, foodTypes)}>
                                <option key={0}>Select</option>
                                {
                                    foodTypes.map(type => <option value={type.id} key={type.id}>{type?.name}</option>)
                                }
                            </Form.Control>
                        </Col> */}

                        <Col>
                            <Form.Label>Eating Window</Form.Label>
                            <Form.Control value={data?.eating_window?.id || "Select"} as="select" onChange={(e) => onSelectMetaData('eating_window', e, eatingWindow)}>
                                <option key={0}>Select</option>
                                {
                                    eatingWindow.map(type => <option value={type.id} key={type.id}>{type?.name}</option>)
                                }
                            </Form.Control>
                        </Col>
                    </Row>

                    <Button className={classes.saveBtn} onClick={handleSave} type="button" variant="info" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default withAuth(CreateFood);
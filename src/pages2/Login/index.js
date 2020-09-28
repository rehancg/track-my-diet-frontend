import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Api from '../../api';
import withAuth from '../../hoc/withAuth';
import classes from './style.module.css';

const Login = () => {
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [isLoging, setIsLoging] = useState(false);

    const onClickLogin = async () => {
        try {
            setIsLoging(true);
            const response = await Api.post('auth/admin/login', { password });
            if (response.error) {
                throw new Error('Unexpected error occured!');
            }

            localStorage.setItem('jwt', response.data.accessToken);
            history.replace('/dashboard')
            // Load meta data;

        } catch (error) {
            setIsLoging(false);
            alert('Login failed')
        }
    }

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button disabled={password.length === 0 || isLoging} variant="primary" type="button" onClick={onClickLogin}>
                        {isLoging ? '...' : 'Login'}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default withAuth(Login);
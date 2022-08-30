import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, Container, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {forgotPassword, login} from '../actions/userActions'

function ForgotPasswordScreen({location, history}) {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    //Check if user login --> redirect to home page
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Get forgot password
    const userForgotPasswordSelector = useSelector(state => state.userForgotPassword)
    const {error: errorForgotPassword, loading: loadingForgotPassword, userForgotPassword} = userForgotPasswordSelector

    //set show everytime when userForgotPassword is updated
    useEffect(() => {
        console.log('userForgotPassword', userForgotPassword)
        if (userForgotPassword != undefined && userForgotPassword.status == 'OK') {
            setShow(true)
        } else setShow(false)
    }, [userForgotPasswordSelector])

    return (
        <Container>
            <FormContainer>
                <h1>Reset password</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    {/*<Form.Group controlId='password'>*/}
                    {/*    <Form.Label>Password</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        type='password'*/}
                    {/*        placeholder='Enter Password'*/}
                    {/*        value={password}*/}
                    {/*        onChange={(e) => setPassword(e.target.value)}*/}
                    {/*    >*/}
                    {/*    </Form.Control>*/}
                    {/*</Form.Group>*/}

                    <Button type='submit' variant='primary'>
                        Reset Password
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                    </Col>
                </Row>

            </FormContainer>
            {loadingForgotPassword && <Loader/>}
            {errorForgotPassword && <Message variant='danger'>{errorForgotPassword}</Message>}
            {(userForgotPassword != undefined && userForgotPassword.status == 'OK') ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Check Your Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>If we have an account for the username or email address you provided, we have emailed a link to reset your password. The link will be valid for one day.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            ) : <></>}
        </Container>
    )
}

export default ForgotPasswordScreen

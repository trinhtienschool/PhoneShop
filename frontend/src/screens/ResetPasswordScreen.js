import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Form, Button, Row, Col, Container, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {forgotPassword, login, resetPassword} from '../actions/userActions'

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function ForgotPasswordScreen({location, history}) {
    const [email, setEmail] = useState('')

    const {token} = useParams();

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


    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mandatory')
            .min(3, 'Password must be at 3 char long'),
        confirmPwd: Yup.string()
            .required('Password is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = {resolver: yupResolver(formSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const {errors} = formState

    function onSubmit(data) {
        console.log("Data submitted")
        console.log(JSON.stringify(data, null, 4))
        console.log(data.password)
        console.log(token)
        dispatch(resetPassword(token, data.password))
        return false
    }


    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     dispatch(forgotPassword(email))
    // }
    //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Get forgot password
    const userResetPasswordSelector = useSelector(state => state.userResetPassword)
    const {error: errorResetPassword, loading: loadingResetPassword, userResetPassword} = userResetPasswordSelector

    //set show everytime when userForgotPassword is updated
    useEffect(() => {
        console.log('userResetPassword', userResetPassword)
        if (userResetPassword != undefined && userResetPassword.status == 'OK') {
            setShow(true)
        } else setShow(false)
    }, [userResetPasswordSelector])

    return (
        <Container>
            <FormContainer>
                <h2>Reset password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            name="confirmPwd"
                            type="password"
                            {...register('confirmPwd')}
                            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </FormContainer>
            {/*<FormContainer>*/}
            {/*    <h1>Reset password</h1>*/}
            {/*    {error && <Message variant='danger'>{error}</Message>}*/}
            {/*    {loading && <Loader/>}*/}
            {/*    <Form onSubmit={submitHandler}>*/}

            {/*        <Form.Group controlId='email'>*/}
            {/*            <Form.Label>Email Address</Form.Label>*/}
            {/*            <Form.Control*/}
            {/*                type='email'*/}
            {/*                placeholder='Enter Email'*/}
            {/*                value={email}*/}
            {/*                onChange={(e) => setEmail(e.target.value)}*/}
            {/*            >*/}
            {/*            </Form.Control>*/}
            {/*        </Form.Group>*/}


            {/*        /!*<Form.Group controlId='password'>*!/*/}
            {/*        /!*    <Form.Label>Password</Form.Label>*!/*/}
            {/*        /!*    <Form.Control*!/*/}
            {/*        /!*        type='password'*!/*/}
            {/*        /!*        placeholder='Enter Password'*!/*/}
            {/*        /!*        value={password}*!/*/}
            {/*        /!*        onChange={(e) => setPassword(e.target.value)}*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*    </Form.Control>*!/*/}
            {/*        /!*</Form.Group>*!/*/}

            {/*        <Button type='submit' variant='primary'>*/}
            {/*            Reset Password*/}
            {/*        </Button>*/}
            {/*    </Form>*/}

            {/*    <Row className='py-3'>*/}
            {/*        <Col>*/}
            {/*            New Customer? <Link*/}
            {/*            to={redirect ? `/register?redirect=${redirect}` : '/register'}>*/}
            {/*            Register*/}
            {/*        </Link>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}

            {/*</FormContainer>*/}


            {loadingResetPassword && <Loader/>}
            {errorResetPassword && <Message variant='danger'>{errorResetPassword}</Message>}
            {(userResetPassword != undefined && userResetPassword.status == 'OK') ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Password Reset Successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Password Reset Successfully</p>
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

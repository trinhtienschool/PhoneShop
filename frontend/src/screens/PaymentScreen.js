import React, { useState, useEffect } from 'react'
import {Form, Button, Col, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [cashPayment, setCashPayment] = useState(true)
    const [paypalPayment, setPaypalPayment] = useState(false)


    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    const submitHandler = (e) => {
        e.preventDefault()
        let paymentMethod = cashPayment ? 'Cash' : 'PayPal'
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Container>
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Cash'
                            id='Cash'
                            name='paymentMethod'
                            value='Cash'
                            checked={cashPayment}
                            onChange={(e) =>{
                                 console.log('Cash payment: ', e.target.checked)
                                setPaypalPayment(!e.target.checked)
                                setCashPayment(e.target.checked)
                            }}
                        >
                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal'
                            checked = {paypalPayment}
                          onChange={(e) => {
                              console.log('Paypal payment: ', e.target.checked)
                              setCashPayment(!e.target.checked)
                              setPaypalPayment(e.target.checked)
                          }}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
             </Container>
    )
}

export default PaymentScreen

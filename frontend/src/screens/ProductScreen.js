import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form, Container} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, createProductReview, userBuyProduct} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import {domain} from "../env";

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userBuyProductSelection = useSelector(state => state.userBuyProduct)
    const {loading: loadingUserBuyProduct, error: errorUserBuyProduct, products} = userBuyProductSelection

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview])

    //Load user buy product
    useEffect(() => {
        if (userInfo) {
            dispatch(userBuyProduct(userInfo._id, product._id))
        }
    }, [dispatch, userInfo, product])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment
            }
        ))
    }
    if (product.image !== undefined) {
        if (!product.image.includes('http')) {
            console.log('here');
            product.image = domain + product.image
        } else {
            product.image = product.image.replace("/images/https%3A/", "https://")
        }
    }
    return (
        <Container>
            <div style={{margin: "0px"}}>

                {loading ?
                    <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <div>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Image src={product.image} alt={product.name} fluid/>
                                    </Col>


                                    {/*<Col md={3}>*/}
                                    {/*    <ListGroup variant="flush">*/}
                                    {/*        <ListGroup.Item>*/}
                                    {/*            <h3>{product.name}</h3>*/}
                                    {/*        </ListGroup.Item>*/}

                                    {/*        <ListGroup.Item>*/}
                                    {/*            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />*/}
                                    {/*        </ListGroup.Item>*/}

                                    {/*        <ListGroup.Item>*/}
                                    {/*            Price: ${product.price}*/}
                                    {/*        </ListGroup.Item>*/}

                                    {/*        <ListGroup.Item>*/}
                                    {/*            Description: {product.description}*/}
                                    {/*        </ListGroup.Item>*/}
                                    {/*    </ListGroup>*/}
                                    {/*</Col>*/}
                                    {/*<Col md={3}>*/}
                                    {/*    <Card>*/}
                                    {/*        <ListGroup variant='flush'>*/}
                                    {/*            <ListGroup.Item>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>Price:</Col>*/}
                                    {/*                    <Col>*/}
                                    {/*                        <strong>${product.price}</strong>*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </ListGroup.Item>*/}
                                    {/*            <ListGroup.Item>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>Status:</Col>*/}
                                    {/*                    <Col>*/}
                                    {/*                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </ListGroup.Item>*/}

                                    {/*            {product.countInStock > 0 && (*/}
                                    {/*                <ListGroup.Item>*/}
                                    {/*                    <Row>*/}
                                    {/*                        <Col>Qty</Col>*/}
                                    {/*                        <Col xs='auto' className='my-1'>*/}
                                    {/*                            <Form.Control*/}
                                    {/*                                as="select"*/}
                                    {/*                                value={qty}*/}
                                    {/*                                onChange={(e) => setQty(e.target.value)}*/}
                                    {/*                            >*/}
                                    {/*                                {*/}

                                    {/*                                    [...Array(product.countInStock).keys()].map((x) => (*/}
                                    {/*                                        <option key={x + 1} value={x + 1}>*/}
                                    {/*                                            {x + 1}*/}
                                    {/*                                        </option>*/}
                                    {/*                                    ))*/}
                                    {/*                                }*/}

                                    {/*                            </Form.Control>*/}
                                    {/*                        </Col>*/}
                                    {/*                    </Row>*/}
                                    {/*                </ListGroup.Item>*/}
                                    {/*            )}*/}


                                    {/*            <ListGroup.Item>*/}
                                    {/*                <Button*/}
                                    {/*                    onClick={addToCartHandler}*/}
                                    {/*                    className='btn-block'*/}
                                    {/*                    disabled={product.countInStock == 0}*/}
                                    {/*                    type='button'>*/}
                                    {/*                    Add to Cart*/}
                                    {/*                </Button>*/}
                                    {/*            </ListGroup.Item>*/}
                                    {/*        </ListGroup>*/}
                                    {/*    </Card>*/}
                                    {/*</Col>*/}
                                    <Col md={6}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h4>{product.name}</h4>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                        color={'#f8e825'}/>
                                            </ListGroup.Item>

                                            <ListGroup.Item>

                                                <Row>
                                                    <Col md={3}>
                                                        Price:
                                                    </Col>
                                                    <Col md={3}>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                    <Col md={3}>Status:</Col>
                                                    <Col md={3}>
                                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                    </Col>
                                                </Row>


                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <p className="mb-0">Desc: {product.description}</p>
                                            </ListGroup.Item>


                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Quantity</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {
                                                                    //[0,1,2]
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button variant="outline-primary" onClick={addToCartHandler}
                                                        className='btn-block' disabled={product.countInStock == 0}
                                                        type='button'>Add to Cart</Button>
                                            </ListGroup.Item>


                                        </ListGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <h4>Reviews</h4>
                                        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                        <ListGroup variant='flush'>
                                            {product.reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='#f8e825'/>
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                    {/*<p className={bg-success text-white}></p>*/}
                                                    {review.comment.length !=0 ?(
                                                        <>
                                                    <p style={{lineHeight: "0px"}}
                                                       className={review.sentiment == 2 ? "btn btn-outline-success" : 'd-none'}>
                                                        <i className="fa fa-thumbs-up"></i> Positive ({review.positive}%)</p>
                                                    <p style={{lineHeight: "0px"}}
                                                       className={review.sentiment == 1 ? "btn btn-outline-warning" : 'd-none'}>
                                                        <i className="fas fa-hand-paper"></i> Neutral ({review.neutral}%)</p>
                                                    <p style={{lineHeight: "0px"}}
                                                       className={review.sentiment == 0 ? "btn btn-outline-danger" : 'd-none'}>
                                                        <i
                                                            className="fa fa-thumbs-down"></i> Negative ({review.negative}%)</p>
                                                    </>
                                                        ):(<></>)}

                                                </ListGroup.Item>
                                            ))}

                                            <ListGroup.Item>
                                                {loadingProductReview && <Loader/>}
                                                {loadingUserBuyProduct && <Loader/>}

                                                {successProductReview &&
                                                    <Message variant='success'>Review Submitted</Message>}
                                                {errorProductReview &&
                                                    <Message variant='danger'>{errorProductReview}</Message>}

                                                {userInfo && products != undefined && products.length != 0 ? (
                                                    <>
                                                        <h4>Write a review</h4>
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>Select...</option>
                                                                    <option value='1'>1 - Poor</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very Good</option>
                                                                    <option value='5'>5 - Excellent</option>
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    row='5'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                ></Form.Control>
                                                            </Form.Group>

                                                            <Button
                                                                disabled={loadingProductReview}
                                                                type='submit'
                                                                variant='primary'
                                                            >
                                                                Submit
                                                            </Button>

                                                        </Form>
                                                    </>
                                                ) : (
                                                    // <Message variant='info'>Please <Link to='/login'>login</Link> and buy product to write a review</Message>
                                                    <></>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                        )

                }


            </div>
        </Container>
    )
}

export default ProductScreen
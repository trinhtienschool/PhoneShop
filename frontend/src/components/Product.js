import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import {domain} from "../env";

function Product({ product }) {

    if(!product.image.includes('http')) {
        console.log('here');
        product.image = domain+product.image
    }else{
        product.image = product.image.replace("/images/https%3A/","https://")
    }

    return (
        // <Card className="my-3 p-3 rounded">
        //     <Link to={`/product/${product._id}`}>
        //         <Card.Img src={product.image} />
        //     </Link>
        //
        //     <Card.Body>
        //         <Link to={`/product/${product._id}`}>
        //             <Card.Title as="div">
        //                 <strong>{product.name}</strong>
        //             </Card.Title>
        //         </Link>
        //
        //         <Card.Text as="div">
        //             <div className="my-3">
        //                 <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
        //             </div>
        //         </Card.Text>
        //
        //
        //         <Card.Text as="h3">
        //             ${product.price}
        //         </Card.Text>
        //     </Card.Body>
        // </Card>
        <div className="card card-ecommerce">


            <div className="view overlay">

                <img src={product.image}
                     className="img-fluid"
                     alt="" style={{margin: "10px 32% 0 32%",width: "120px",height: "250px"}}/>


                <Link to={`/product/${product._id}`}>

                    <div className="mask rgba-white-slight"></div>

                </Link>

            </div>


            <div className="card-body">


                <h5 className="card-title mb-1"><strong><Link to={`/product/${product._id}`} className="dark-grey-text">{product.name}</Link></strong>
                </h5>
                <span className="badge badge-danger mb-2">bestseller</span>


                <ul className="rating">

                    {/*<li><i className="fas fa-star blue-text"></i></li>*/}

                    {/*<li><i className="fas fa-star blue-text"></i></li>*/}

                    {/*<li><i className="fas fa-star blue-text"></i></li>*/}

                    {/*<li><i className="fas fa-star blue-text"></i></li>*/}

                    {/*<li><i className="fas fa-star blue-text"></i></li>*/}
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />

                </ul>


                <div className="card-footer pb-0">

                    <div className="row mb-0">

                        <span className="float-left"><strong>${product.price}</strong></span>

                        {/*<span className="float-right">*/}

                        {/*<a className="" data-toggle="tooltip" data-placement="top" title="Add to Cart"><i*/}
                        {/*    className="fas fa-shopping-cart ml-3"></i></a>*/}

                      {/*</span>*/}

                    </div>

                </div>

            </div>


        </div>
    )
}

export default Product

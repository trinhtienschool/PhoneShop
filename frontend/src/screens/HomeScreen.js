import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Carousel, Image} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import {listProductCategories, listProducts, listRandomProducts, listTopProducts} from '../actions/productActions'
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import {domain} from "../env";


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    // const productList = useSelector(state => state.productList)

    // const { error, loading, products, page, pages } = productList

   // const productRandom = useSelector(state => state.productRandom)
   //  const { error, loading, products } = productRandom


  const productRandomNews = useSelector(state => state.productRandom)
    const { error, loading, products } = productRandomNews


  // const productRandom = useSelector(state => state.productRandom)
  //   const { error1, loading1, products1 } = productRandom
    // const productTopRated = useSelector(state => state.productTopRated)
    // const { error, loading, products } = productTopRated
  // console.log('product_random: ',productList)
    let keyword = history.location.search

    // useEffect(() => {
    //     dispatch(listProducts(keyword))
    //
    // }, [dispatch, keyword])

    // useEffect(() => {
    //     dispatch(listTopProducts())
    // }, [dispatch])

      useEffect(() => {
        dispatch(listRandomProducts(18))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(listRandomProducts(10))
    // }, [dispatch])
    products.map(product => {
       if(!product.image.includes('http')) {
        console.log('here');
        product.image = domain+product.image
      }else{
          product.image = product.image.replace("/images/https%3A/","https://")
      }
    })
    const recommend_products = products.slice(0,6)
    const new_products = products.slice(6,9)
    const top_products = products.slice(9,12)
    const random_products = products.slice(12,15)
    const last_product = products.slice(15,18)


    const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

    useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);


    return (
        <div style={{marginTop:"-50px"}}>

        {/*   loading ? <Loader />*/}
        {/*: error*/}
        {/*    ? <Message variant='danger'>{error}</Message>*/}
        {/*    :*/}
        {/*        <Carousel pause='hover' className='bg-dark'>*/}
        {/*            {products.map(product => (*/}
        {/*                <Carousel.Item key={product._id}>*/}
        {/*                    <Link to={`/product/${product._id}`}>*/}
        {/*                        <Image src={product.image} alt={product.name} fluid />*/}
        {/*                        <Carousel.Caption className='carousel.caption'>*/}
        {/*                            <h4>{product.name} (${product.price})</h4>*/}
        {/*                        </Carousel.Caption>*/}
        {/*                    </Link>*/}
        {/*                </Carousel.Item>*/}
        {/*            ))}*/}
        {/*        </Carousel>*/}


        {/*  <div>*/}

        {/*    {productsRandom !=undefined}*/}
        {/*    <h1>Latest Products</h1>*/}
        {/*    {loadingRandom ? <Loader />*/}
        {/*        : errorRandom ? <Message variant='danger'>{errorRandom}</Message>*/}
        {/*            :*/}
        {/*            <div>*/}
        {/*                <Row>*/}
        {/*                    {productsRandom.map(product => (*/}
        {/*                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>*/}
        {/*                            <Product product={product} />*/}
        {/*                        </Col>*/}
        {/*                    ))}*/}
        {/*                </Row>*/}

        {/*            </div>*/}
        {/*    }*/}
        {/*</div>*/}



        {/*<div>*/}
        {/*    {!keyword && <ProductCarousel />}*/}

        {/*    <h1>Latest Products</h1>*/}
        {/*    {loading ? <Loader />*/}
        {/*        : error ? <Message variant='danger'>{error}</Message>*/}
        {/*            :*/}
        {/*            <div>*/}
        {/*                <Row>*/}
        {/*                    {recommend_products.map(product => (*/}

        {/*                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>*/}
        {/*                            <Product product={product} />*/}
        {/*                        </Col>*/}
        {/*                    ))}*/}
        {/*                </Row>*/}

        {/*                /!*<Paginate page={page} pages={pages} keyword={keyword} />*!/*/}
        {/*            </div>*/}
        {/*    }*/}
        {/*</div>*/}



          <div class="container">


    <div class="row pt-4">


      <div class="col-lg-12">


        <section class="section pt-4">


          <div class="row">


            <div class="col-lg-8 col-md-12 mb-3 pb-lg-2">


              <div class="view zoom  z-depth-1">

                <img style={{height:'450px'}} src="https://assets.mspimages.in/wp-content/uploads/2019/07/Vivo-S1-Teaser-Image.jpg" class="img-fluid" alt="sample image"/>

                {/*<div class="mask rgba-white-light">*/}

                {/*  <div class="dark-grey-text d-flex align-items-center pt-3 pl-4">*/}

                {/*    <div>*/}

                {/*      <a><span class="badge badge-danger">bestseller</span></a>*/}

                {/*      <h2 class="card-title font-weight-bold pt-2"><strong>This is news title</strong></h2>*/}

                {/*      <p class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>*/}

                {/*      <a class="btn btn-danger btn-sm btn-rounded clearfix d-none d-md-inline-block">Read more</a>*/}

                {/*    </div>*/}

                {/*  </div>*/}

                {/*</div>*/}

              </div>


            </div>

            <div class="col-lg-4 col-md-12 mb-4">


              <section class="section">

                <ul class="list-group z-depth-1">




            {loadingCategories ? (
              <Loader/>
            ) : errorCategories ? (
              <Message variant="danger">{errorCategories}</Message>
            ) : (
              <div>

                {categories.map((c) => (
                     <li className="list-group-item d-flex justify-content-between align-items-center">

                        <Link to={`search/category/${c.category}`} className="dark-grey-text font-small"><i className="fas fa-laptop dark-grey-text mr-2"
                                                                    aria-hidden="true"></i> {c.category} </Link>
                       <span className="badge badge-danger badge-pill">{c.total}</span>

                      </li>
                ))}
              </div>
            )}

                </ul>

              </section>


            </div>


          </div>


        </section>

        <section>


          <div class="row">


            <div class="col-12">


              <div class="row">

 {recommend_products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} className={'mb-4'}>
                                    <Product product={product} />
                                </Col>
                            ))}
              </div>




            </div>

          </div>


        </section>

        <section>


          <div class="row">


            <div class="col-12">


              <div class="view  z-depth-1">

                <img src="https://mdbootstrap.com/img/Photos/Others/ecommerce6.jpg" class="img-fluid"
                  alt="sample image"/>

                <div class="mask rgba-stylish-slight">

                  <div class="dark-grey-text text-right pt-lg-5 pt-md-1 mr-5 pr-md-4 pr-0">

                    <div>

                      <a>

                        <span class="badge badge-primary">SALE</span>

                      </a>

                      <h2 class="card-title font-weight-bold pt-md-3 pt-1">

                        <strong style={{fontSize:"15px"}}>Sale 20% off on every smartphone!

                        </strong>

                      </h2>

                      {/*<p class="pb-lg-3 pb-md-1 clearfix d-none d-md-block">Lorem ipsum dolor sit amet, consectetur*/}
                      {/*  adipisicing elit. </p>*/}

                      <a class="btn mr-0 btn-primary btn-rounded clearfix d-none d-md-inline-block">Read more</a>

                    </div>

                  </div>

                </div>

              </div>


            </div>


          </div>

          <div class="row mt-4 pt-1">


            <div class="col-lg-8 col-md-12 mb-3 mb-md-4 pb-lg-2">


              <div class="view zoom z-depth-1">

                <img src="https://mdbootstrap.com/img/Photos/Others/product1.jpg" class="img-fluid" alt="sample image"/>

                <div class="mask rgba-white-light">

                  <div class="dark-grey-text d-flex align-items-center pt-4 ml-lg-3 pl-lg-3 pl-md-5">

                    <div>

                      <a><span class="badge badge-danger">bestseller</span></a>

                      <h2 class="card-title font-weight-bold pt-2"><strong>Get new phones</strong></h2>

                      <p class="hidden show-ud-up">Get new phones for National Day </p>

                      <a class="btn btn-danger btn-sm btn-rounded clearfix d-none d-md-inline-block"> Read more</a>

                    </div>

                  </div>

                </div>

              </div>


            </div>

            <div class="col-lg-4 col-md-12 mb-4">


              <div class="view zoom z-depth-1 photo">

                <img src="https://mdbootstrap.com/img/Photos/Others/product3.jpg" class="img-fluid" alt="sample image"/>

                <div class="mask rgba-stylish-strong">

                  <div class="white-text center-element text-center w-75">

                    <div class="">

                      <a><span class="badge badge-info">NEW</span></a>

                      <h2 class="card-title font-weight-bold pt-2"><strong>Best phones for you</strong></h2>

                      {/*<p class="">Lorem ipsum dolor sit amet, consectetur. </p>*/}

                      <a class="btn btn-info btn-sm btn-rounded">Read more</a>

                    </div>

                  </div>

                </div>

              </div>


            </div>


          </div>


        </section>

        <section class="mb-5">

          <div class="row">


            <div class="col-lg-4 col-md-12 col-12 pt-4">

              <hr/>

              <h5 class="text-center font-weight-bold dark-grey-text"><strong>New Products</strong></h5>

              <hr/>

 {new_products.map(product => (
       <Link to={`/product/${product._id}`}>
       <div className="row mt-5 py-2 mb-4 hoverable align-items-center">

       <div className="col-6">

         <img src={product.image} style={{"width":"100px","height":"200px"}}
                 className="img-fluid"/>


       </div>

       <div className="col-6">


        <a className="pt-5"><strong>{product.name}</strong></a>


        <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'} />


         <h6 className="h6-responsive font-weight-bold dark-grey-text"><strong>${product.price}</strong></h6>

       </div>

     </div>
         </Link>
                            ))}




            </div>

            <div class="col-lg-4 col-md-12 pt-4">

              <hr/>

              <h5 class="text-center font-weight-bold dark-grey-text"><strong>Top Sellers</strong></h5>

              <hr/>


             {top_products.map(product => (
       <Link to={`/product/${product._id}`}>
       <div className="row mt-5 py-2 mb-4 hoverable align-items-center">

       <div className="col-6">

         <img src={product.image} style={{"width":"100px","height":"200px"}}
                 className="img-fluid"/>


       </div>

       <div className="col-6">


        <a className="pt-5"><strong>{product.name}</strong></a>


        <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'} />


         <h6 className="h6-responsive font-weight-bold dark-grey-text"><strong>${product.price}</strong></h6>

       </div>

     </div>
         </Link>
                            ))}
              

            </div>
            

            
            <div class="col-lg-4 col-md-12 pt-4">

              <hr/>

              <h5 class="text-center font-weight-bold dark-grey-text"><strong>Random products</strong></h5>

              <hr/>

              
            {random_products.map(product => (
       <Link to={`/product/${product._id}`}>
       <div className="row mt-5 py-2 mb-4 hoverable align-items-center">

       <div className="col-6">

         <img src={product.image} style={{"width":"100px","height":"200px"}}
                 className="img-fluid"/>


       </div>

       <div className="col-6">


        <a className="pt-5"><strong>{product.name}</strong></a>


        <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'} />


         <h6 className="h6-responsive font-weight-bold dark-grey-text"><strong>${product.price}</strong></h6>

       </div>

     </div>
         </Link>
                            ))}
              

            </div>
            

          </div>

        </section>
        

        
        <section>

          <h4 class="font-weight-bold mt-4 dark-grey-text"><strong>LAST ITEMS</strong></h4>

          <hr class="mb-5"/>

          
          <div class="row">
 {last_product.map(product => (
                                <Col key={product._id} md={6} lg={4} sm={12} className={'mb-4'}>
                                    <Product product={product} />
                                </Col>
                            ))}
            

            

          </div>
          

          
          {/*<div class="row justify-content-center mb-4">*/}

          {/*  */}
          {/*  <nav class="mb-4">*/}

          {/*    <ul class="pagination pagination-circle pg-blue mb-0">*/}

          {/*      */}
          {/*      <li class="page-item disabled clearfix d-none d-md-block"><a*/}
          {/*          class="page-link waves-effect waves-effect">First</a></li>*/}

          {/*      */}
          {/*      <li class="page-item disabled">*/}

          {/*        <a class="page-link waves-effect waves-effect" aria-label="Previous">*/}

          {/*          <span aria-hidden="true">«</span>*/}

          {/*          <span class="sr-only">Previous</span>*/}

          {/*        </a>*/}

          {/*      </li>*/}

          {/*      */}
          {/*      <li class="page-item active"><a class="page-link waves-effect waves-effect">1</a></li>*/}

          {/*      <li class="page-item"><a class="page-link waves-effect waves-effect">2</a></li>*/}

          {/*      <li class="page-item"><a class="page-link waves-effect waves-effect">3</a></li>*/}

          {/*      <li class="page-item"><a class="page-link waves-effect waves-effect">4</a></li>*/}

          {/*      <li class="page-item"><a class="page-link waves-effect waves-effect">5</a></li>*/}

          {/*      */}
          {/*      <li class="page-item">*/}

          {/*        <a class="page-link waves-effect waves-effect" aria-label="Next">*/}

          {/*          <span aria-hidden="true">»</span>*/}

          {/*          <span class="sr-only">Next</span>*/}

          {/*        </a>*/}

          {/*      </li>*/}

          {/*      */}
          {/*      <li class="page-item clearfix d-none d-md-block"><a class="page-link waves-effect waves-effect">Last</a>*/}
          {/*      </li>*/}

          {/*    </ul>*/}

          {/*  </nav>*/}
          {/*  */}

          {/*</div>*/}
          

        </section>
        

      </div>
      

    </div>
    

  </div>
          </div>
    )
}

export default HomeScreen

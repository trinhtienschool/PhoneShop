import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import {listProductCategories, listProducts} from '../actions/productActions';
// import LoadingBox from '../components/LoadingBox';
import Loader from '../components/Loader'
import Message from '../components/Message'
// import Message from '../components/Message';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import {Col, Container} from "react-bootstrap";

export default function SearchScreen(props) {

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 1000000,
    rating = 'all',
    order = 'createdAt',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  console.log("PageNumberSearc: ",pageNumber)

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    console.log("PageNumSearchEffect: ", pageNumber)
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating: rating !== 'all' ? rating : '',
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);




  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

    useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);


  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
      <Container>
    <div>




      {/*<div className="row">*/}
      {/*  {loading ? (*/}
      {/*    <Loader/>*/}
      {/*  ) : error ? (*/}
      {/*    <Message variant="danger">{error}</Message>*/}
      {/*  ) : (*/}
      {/*    <div>{products.length} Results</div>*/}
      {/*  )}*/}
      {/*  <div>*/}
      {/*    Sort by{' '}*/}
      {/*    <select*/}
      {/*      value={order}*/}
      {/*      onChange={(e) => {*/}
      {/*        navigate(getFilterUrl({ order: e.target.value }));*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <option value="newest">Newest Arrivals</option>*/}
      {/*      <option value="lowest">Price: Low to High</option>*/}
      {/*      <option value="highest">Price: High to Low</option>*/}
      {/*      <option value="toprated">Avg. Customer Reviews</option>*/}
      {/*    </select>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="row top">*/}
      {/*  <div className="col-1">*/}
      {/*    <h3>Department</h3>*/}
      {/*    <div>*/}
      {/*      {loadingCategories ? (*/}
      {/*        <Loader/>*/}
      {/*      ) : errorCategories ? (*/}
      {/*        <Message variant="danger">{errorCategories}</Message>*/}
      {/*      ) : (*/}
      {/*        <ul>*/}
      {/*          <li>*/}
      {/*            <Link*/}
      {/*              className={'all' === category.category ? 'active' : ''}*/}
      {/*              to={getFilterUrl({ category: 'all' })}*/}
      {/*            >*/}
      {/*              Any*/}
      {/*            </Link>*/}
      {/*          </li>*/}
      {/*          {categories.map((c) => (*/}
      {/*            <li key={c}>*/}
      {/*              <Link*/}
      {/*                className={c.category === category ? 'active' : ''}*/}
      {/*                to={getFilterUrl({ category: c.category })}*/}
      {/*              >*/}
      {/*                {c.category}*/}
      {/*              </Link>*/}
      {/*            </li>*/}
      {/*          ))}*/}
      {/*        </ul>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <h3>Price</h3>*/}
      {/*      <ul>*/}
      {/*        {prices.map((p) => (*/}
      {/*          <li key={p.name}>*/}
      {/*            <Link*/}
      {/*              to={getFilterUrl({ min: p.min, max: p.max })}*/}
      {/*              className={*/}
      {/*                `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {p.name}*/}
      {/*            </Link>*/}
      {/*          </li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <h3>Avg. Customer Review</h3>*/}
      {/*      <ul>*/}
      {/*        {ratings.map((r) => (*/}
      {/*          <li key={r.name}>*/}
      {/*            <Link*/}
      {/*              to={getFilterUrl({ rating: r.rating })}*/}
      {/*              className={`${r.rating}` === `${rating}` ? 'active' : ''}*/}
      {/*            >*/}
      {/*              <Rating caption={' & up'} rating={r.rating}></Rating>*/}
      {/*            </Link>*/}
      {/*          </li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="col-3">*/}
      {/*    {loading ? (*/}
      {/*      <Loader/>*/}
      {/*    ) : error ? (*/}
      {/*      <Message variant="danger">{error}</Message>*/}
      {/*    ) : (*/}
      {/*      <>*/}
      {/*        {products.length === 0 && (*/}
      {/*          <Message>No Product Found</Message>*/}
      {/*        )}*/}
      {/*        <div className="row center">*/}
      {/*          {products.map((product) => (*/}
      {/*            <Product key={product._id} product={product}></Product>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*        <div className="row center pagination">*/}
      {/*          {[...Array(pages).keys()].map((x) => (*/}
      {/*            <Link*/}
      {/*              className={x + 1 === page ? 'active' : ''}*/}
      {/*              key={x + 1}*/}
      {/*              to={getFilterUrl({ page: x + 1 })}*/}
      {/*            >*/}
      {/*              {x + 1}*/}
      {/*            </Link>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}






      <div className="row pt-4">

        
        <div className="col-lg-3">

          <div className="">

            
            <div className="row">

              <div className="col-md-6 col-lg-12 mb-5">

                
                <h5 className="font-weight-bold dark-grey-text"><strong>Order By</strong></h5>

                <div className="divider"></div>


                <div className="form-group ">
                <Link to={getFilterUrl({ order: '-createdAt' })} style={'-createdAt'===order?{color:'#2196f3',fontWeight: 'bold'}:{}} className={`form-check-label`}>Last</Link>
                </div>

                <div className="form-group ">
                  <Link to={getFilterUrl({ order: 'price' })} style={'price'===order?{color:'#2196f3',fontWeight: 'bold'}:{}} className={`form-check-label`}>Price: low to high</Link>
                </div>
                <div className="form-group ">
                  <Link to={getFilterUrl({ order: '-price' })} style={'-price'===order?{color:'#2196f3',fontWeight: 'bold'}:{}} className={`form-check-label`}>Price: high to low</Link>
                </div>


              </div>

              
              <div className="col-md-6 col-lg-12 mb-5">

                <h5 className="font-weight-bold dark-grey-text"><strong>Category</strong></h5>

                <div className="divider"></div>



                 {/*Category*/}
                  <div>
            {loadingCategories ? (
              <Loader/>
            ) : errorCategories ? (
              <Message variant="danger">{errorCategories}</Message>
            ) : (
              <div>
                <div className="form-group ">
                    <Link to={getFilterUrl({ category: 'all' })} style={'all'===category?{color:'#2196f3',fontWeight: 'bold'}:{}}  className={`form-check-label`}>All</Link>
                </div>
                {categories.map((c) => (
                    <div key={c.category} className="form-group ">
                    <Link to={getFilterUrl({ category: c.category })} style={c.category === category?{color:'#2196f3',fontWeight: 'bold'}:{}}  className={`form-check-label`}> {c.category}</Link>
                </div>
                ))}
              </div>
            )}
          </div>
                {/*End Category*/}

                
              </div>

              
            </div>
            

            
            <div className="row">

              
              <div className="col-md-6 col-lg-12 mb-5">

                <h5 className="font-weight-bold dark-grey-text"><strong>Price</strong></h5>

                <div className="divider"></div>

                 <div className='mt-3'>
              {prices.map((p) => (
                   <div key={p.name} className="form-group ">
                    <Link  to={getFilterUrl({ min: p.min, max: p.max })} style={`${p.min}-${p.max}` === `${min}-${max}`?{color:'#2196f3',fontWeight: 'bold'}:{}}  className={`form-check-label`}> {p.name}</Link>
                </div>
              ))}
            </div>

              </div>
              <div className="col-md-6 col-lg-12 mb-5">

                <h5 className="font-weight-bold dark-grey-text"><strong>Rating</strong></h5>

                <div className="divider"></div>


                <div>
              {ratings.map((r) => (
                  <div key={r.name} className="row ml-1">
                      <Link  to={getFilterUrl({ rating: r.rating })} style={`${r.rating}` === `${rating}`?{color:'#2196f3',fontWeight: 'bold'}:{}} className={`form-check-label`}> <Rating caption={' & up'} value={r.rating}></Rating></Link>
                </div>

              ))}
            </div>

              </div>
              

            </div>
            

          </div>

        </div>
        

        
        <div className="col-lg-9">
          <section className="section pt-4">


            <div className="row">

              {loading ? (
            <Loader/>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
              <>
               {products.length === 0 && (
                <Message>No Product Found</Message>
              )}
                {products.map(product => (
                    <Col key={product._id} md={12} lg={4} className={'mb-4'}>
                      <Product product={product}/>
                    </Col>
                ))}
               </>
            )}





            </div>

            <div className="row justify-content-center mb-4">


              <nav className="mb-4">

                <ul className="pagination pagination-circle pg-blue mb-0">


                  {/*<li className="page-item disabled clearfix d-none d-md-block"><a*/}
                  {/*    className="page-link waves-effect waves-effect">First</a></li>*/}


                  <li className="page-item">

                    <Link
                    className="page-link waves-effect waves-effect"

                    to={getFilterUrl({ page: page==1?1:page-1 })}
                  >

                    <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>

                  </Link>

                  </li>


                  {[...Array(pages).keys()].map((x) => (
                      <li className={`page-item ${x + 1 === page ? 'active' : ''}`} >
                  <Link
                    className="page-link waves-effect waves-effect"
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                        </li>
                ))}
                  <li className="page-item">


                     <Link
                    className="page-link waves-effect waves-effect"

                    to={getFilterUrl({ page: page>=pages?pages:page+1 })}
                  >

                    <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>

                  </Link>

                  </li>




                </ul>

              </nav>


            </div>


          </section>
          

        </div>
        

      </div>
    </div>
        </Container>
  );
}

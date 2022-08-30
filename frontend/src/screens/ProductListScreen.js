import React, {useState, useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProducts, deleteProduct, createProduct, listAllProducts} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import {Link, useLocation, useParams} from "react-router-dom";

function ProductListScreen({history, match}) {
    const {
        pageNum = 1
    } = useParams();
    const dispatch = useDispatch()

    console.log(pageNum)
    useEffect(() => {
        console.log("Product List Screen: ", pageNum)
        dispatch(
            listAllProducts(pageNum)
        );
    }, [dispatch, pageNum]);
    // const productList = useSelector(state => state.productList)
    // const { loading, error, products, pages, page } = productList

    // console.log('ProductListScreen: ', productAllList)

    const productAllList = useSelector(state => state.productAllList)
    const {loading, error, products, pages, page} = productAllList


    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listAllProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    const range = (start, end, total_pages) => {

        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        console.log("start: ", start, end, total_pages)
        for (let i = start; i <= end; i += 1) {
            if (i < 1) continue;
            if (i > total_pages) break;
            console.log('i: ', i)
            output.push(i);
        }
        console.log("output: ", output)
        return output;
    };
    return (
        // <div>
        //     <Row className='align-items-center'>
        //         <Col>
        //             <h1>Products</h1>
        //         </Col>
        //
        //         <Col className='text-right'>
        //             <Button className='my-3' onClick={createProductHandler}>
        //                 <i className='fas fa-plus'></i> Create Product
        //             </Button>
        //         </Col>
        //     </Row>
        //
        //     {loadingDelete && <Loader />}
        //     {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        //
        //
        //     {loadingCreate && <Loader />}
        //     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        //
        //     {loading
        //         ? (<Loader />)
        //         : error
        //             ? (<Message variant='danger'>{error}</Message>)
        //             : (
        //                 <div>
        //                     <Table striped bordered hover responsive className='table-sm'>
        //                         <thead>
        //                             <tr>
        //                                 <th>ID</th>
        //                                 <th>NAME</th>
        //                                 <th>PRICE</th>
        //                                 <th>CATEGORY</th>
        //                                 <th>BRAND</th>
        //                                 <th></th>
        //                             </tr>
        //                         </thead>
        //
        //                         <tbody>
        //                             {products.map(product => (
        //                                 <tr key={product._id}>
        //                                     <td>{product._id}</td>
        //                                     <td>{product.name}</td>
        //                                     <td>${product.price}</td>
        //                                     <td>{product.category}</td>
        //                                     <td>{product.brand}</td>
        //
        //                                     <td>
        //                                         <LinkContainer to={`/admin/product/${product._id}/edit`}>
        //                                             <Button variant='light' className='btn-sm'>
        //                                                 <i className='fas fa-edit'></i>
        //                                             </Button>
        //                                         </LinkContainer>
        //
        //                                         <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
        //                                             <i className='fas fa-trash'></i>
        //                                         </Button>
        //                                     </td>
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </Table>
        //                      <div className="row justify-content-center mb-4">
        //
        //
        //       <nav className="mb-4">
        //
        //         <ul className="pagination pagination-circle pg-blue mb-0">
        //
        //           <li className="page-item">
        //
        //             <Link
        //             className="page-link waves-effect waves-effect"
        //
        //             to={`/admin/productlist/page/${page==1?1:page-1}`}
        //           >
        //
        //             <span aria-hidden="true">«</span>
        //               <span className="sr-only">Previous</span>
        //
        //           </Link>
        //
        //           </li>
        //
        //             {
        //                 range(page-3,page+3,pages).map((x) => (
        //                   <li className={`page-item ${x === page ? 'active' : ''}`} >
        //               <Link
        //                 className="page-link waves-effect waves-effect"
        //                 key={x}
        //                  to={`/admin/productlist/page/${x}`}
        //               >
        //                 {x}
        //           </Link>
        //                 </li>
        //         ))}
        //
        //
        //           <li className="page-item">
        //
        //
        //              <Link
        //             className="page-link waves-effect waves-effect"
        //
        //              to={`/admin/productlist/page/${page>=pages?pages:page+1}`}
        //           >
        //
        //             <span aria-hidden="true">»</span>
        //               <span className="sr-only">Next</span>
        //
        //           </Link>
        //
        //           </li>
        //
        //
        //
        //
        //         </ul>
        //
        //       </nav>
        //
        //
        //     </div>
        //                 </div>
        //             )}
        // </div>


        //Break


        <div className="container-for-admin">


            <div className="container-fluid">
                <div className="row ">
                    <div className="col-12 col-md-3 ">


                        <div className="list-group list-group-flush card mb-4 wow fadeIn ">
                            <h4 className="list-group-item list-group-item-action waves-effect" style={{background:'rgba(0,0,0,.05)', textAlign:'center'}}>
                                <span >Admin</span>
                            </h4>
                            <Link to={`/admin/dashboard`} className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-chart-line mr-3"></i>Dashboard
                            </Link>
                            <Link to={`/admin/productlist`} className="list-group-item list-group-item-action waves-effect" style={useLocation().pathname.includes('productlist')?{color:'#2196f3',fontWeight: 'bold'}:{}}>
                                <i className="fa fa-box mr-3"></i>Product</Link>
                            <Link to={`/admin/userlist`} className="list-group-item list-group-item-action waves-effect" style={useLocation().pathname.includes('userlist')?{color:'#2196f3',fontWeight: 'bold'}:{}}>
                                <i className="fa fa-user mr-3"></i>User</Link>
                            <Link to={`/admin/orderlist`} className="list-group-item list-group-item-action waves-effect" style={useLocation().pathname.includes('orderlist')?{color:'#2196f3',fontWeight: 'bold'}:{}}>
                                <i className="fa fa-shopping-cart mr-3"></i>Order</Link>

                        </div>
                    </div>
                    <div className="col-12 col-md-9">

                        <div className="card mb-4 wow fadeIn">
                            <div className="card-body d-sm-flex justify-content-between" style={{padding:'5px'}} >

                                <h3 className="pt-3 pl-3">
                                    Product list
                                </h3>
                                <Col className='d-flex justify-content-end'>
                                    <Button onClick={createProductHandler}>
                                        <i className='fas fa-plus'></i> Create Product
                                    </Button>
                                </Col>


                            </div>
                        </div>

                        {/*Product list*/}

                        <div>


                            {loadingDelete && <Loader/>}
                            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


                            {loadingCreate && <Loader/>}
                            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

                            {loading
                                ? (<Loader/>)
                                : error
                                    ? (<Message variant='danger'>{error}</Message>)
                                    : (
                                        <div>
                                            <Table striped bordered hover responsive className='table-sm'>
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>NAME</th>
                                                    <th>PRICE</th>
                                                    <th>CATEGORY</th>
                                                    <th>BRAND</th>
                                                    <th></th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {products.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product._id}</td>
                                                        <td>{product.name}</td>
                                                        <td>${product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.brand}</td>

                                                        <td>
                                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                                <Button variant='light' className='btn-sm'>
                                                                    <i className='fas fa-edit'></i>
                                                                </Button>
                                                            </LinkContainer>

                                                            <Button variant='danger' className='btn-sm'
                                                                    onClick={() => deleteHandler(product._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                            <div className="row justify-content-center mb-4">


                                                <nav className="mb-4">

                                                    <ul className="pagination pagination-circle pg-blue mb-0">

                                                        <li className="page-item">

                                                            <Link
                                                                className="page-link waves-effect waves-effect"

                                                                to={`/admin/productlist/page/${page == 1 ? 1 : page - 1}`}
                                                            >

                                                                <span aria-hidden="true">«</span>
                                                                <span className="sr-only">Previous</span>

                                                            </Link>

                                                        </li>

                                                        {
                                                            range(page - 3, page + 3, pages).map((x) => (
                                                                <li className={`page-item ${x === page ? 'active' : ''}`}>
                                                                    <Link
                                                                        className="page-link waves-effect waves-effect"
                                                                        key={x}
                                                                        to={`/admin/productlist/page/${x}`}
                                                                    >
                                                                        {x}
                                                                    </Link>
                                                                </li>
                                                            ))}


                                                        <li className="page-item">


                                                            <Link
                                                                className="page-link waves-effect waves-effect"

                                                                to={`/admin/productlist/page/${page >= pages ? pages : page + 1}`}
                                                            >

                                                                <span aria-hidden="true">»</span>
                                                                <span className="sr-only">Next</span>

                                                            </Link>

                                                        </li>


                                                    </ul>

                                                </nav>


                                            </div>
                                        </div>
                                    )}
                        </div>

                        {/*    Product list*/}


                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProductListScreen
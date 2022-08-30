import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'
import {Link, useLocation} from "react-router-dom";

function OrderListScreen({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        // <div>
        //     <h1>Orders</h1>
        //     {loading
        //         ? (<Loader />)
        //         : error
        //             ? (<Message variant='danger'>{error}</Message>)
        //             : (
        //                 <Table striped bordered hover responsive className='table-sm'>
        //                     <thead>
        //                         <tr>
        //                             <th>ID</th>
        //                             <th>USER</th>
        //                             <th>DATE</th>
        //                             <th>Total</th>
        //                             <th>PAID</th>
        //                             <th>DELIVERED</th>
        //                             <th></th>
        //                         </tr>
        //                     </thead>
        //
        //                     <tbody>
        //                         {orders.map(order => (
        //                             <tr key={order._id}>
        //                                 <td>{order._id}</td>
        //                                 <td>{order.user && order.user.name}</td>
        //                                 <td>{order.createdAt.substring(0, 10)}</td>
        //                                 <td>${order.totalPrice}</td>
        //
        //                                 <td>{order.isPaid ? (
        //                                     order.paidAt.substring(0, 10)
        //                                 ) : (
        //                                         <i className='fas fa-check' style={{ color: 'red' }}></i>
        //                                     )}
        //                                 </td>
        //
        //                                 <td>{order.isDelivered ? (
        //                                     order.deliveredAt.substring(0, 10)
        //                                 ) : (
        //                                         <i className='fas fa-check' style={{ color: 'red' }}></i>
        //                                     )}
        //                                 </td>
        //
        //                                 <td>
        //                                     <LinkContainer to={`/order/${order._id}`}>
        //                                         <Button variant='light' className='btn-sm'>
        //                                             Details
        //                                         </Button>
        //                                     </LinkContainer>
        //
        //
        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </Table>
        //             )}
        // </div>



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
                                    Order List
                                </h3>
                            </div>
                        </div>

                        {/*Product list*/}

                      <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>

                        {/*    Product list*/}


                    </div>
                </div>
            </div>


        </div>
    )
}

export default OrderListScreen
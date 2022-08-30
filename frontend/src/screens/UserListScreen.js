import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import {Link, useLocation} from "react-router-dom";

function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    console.log("Dang vao UserListScreen")
    console.log('userInfo', userInfo)
    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        // <div>
        //     <h1>Users</h1>
        //     {loading
        //         ? (<Loader />)
        //         : error
        //             ? (<Message variant='danger'>{error}</Message>)
        //             : (
        //                 <Table striped bordered hover responsive className='table-sm'>
        //                     <thead>
        //                         <tr>
        //                             <th>ID</th>
        //                             <th>NAME</th>
        //                             <th>EMAIL</th>
        //                             <th>ADMIN</th>
        //                             <th></th>
        //                         </tr>
        //                     </thead>
        //
        //                     <tbody>
        //                         {users.map(user => (
        //                             <tr key={user._id}>
        //                                 <td>{user._id}</td>
        //                                 <td>{user.name}</td>
        //                                 <td>{user.email}</td>
        //                                 <td>{user.isAdmin ? (
        //                                     <i className='fas fa-check' style={{ color: 'green' }}></i>
        //                                 ) : (
        //                                         <i className='fas fa-check' style={{ color: 'red' }}></i>
        //                                     )}</td>
        //
        //                                 <td>
        //                                     <LinkContainer to={`/admin/user/${user._id}/edit`}>
        //                                         <Button variant='light' className='btn-sm'>
        //                                             <i className='fas fa-edit'></i>
        //                                         </Button>
        //                                     </LinkContainer>
        //
        //                                     <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
        //                                         <i className='fas fa-trash'></i>
        //                                     </Button>
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
                                    User List
                                </h3>
                            </div>
                        </div>

                        {/*Product list*/}

                       <div>

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
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

export default UserListScreen

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'
import {Link} from "react-router-dom";

function Header() {
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div style={{marginBottom: "100px"}}>
            {/*<header>*/}
            {/*    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>*/}
            {/*        <Container>*/}
            {/*            <LinkContainer to='/'>*/}
            {/*                <Navbar.Brand>Indian Shop</Navbar.Brand>*/}
            {/*            </LinkContainer>*/}

            {/*            <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
            {/*            <Navbar.Collapse id="basic-navbar-nav">*/}
            {/*                <SearchBox />*/}
            {/*                <Nav className="ml-auto">*/}

            {/*                    <LinkContainer to='/cart'>*/}
            {/*                        <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>*/}
            {/*                    </LinkContainer>*/}

            {/*                    {userInfo ? (*/}
            {/*                        <NavDropdown title={userInfo.name} id='username'>*/}
            {/*                            <LinkContainer to='/profile'>*/}
            {/*                                <NavDropdown.Item>Profile</NavDropdown.Item>*/}
            {/*                            </LinkContainer>*/}

            {/*                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>*/}

            {/*                        </NavDropdown>*/}
            {/*                    ) : (*/}
            {/*                            <LinkContainer to='/login'>*/}
            {/*                                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>*/}
            {/*                            </LinkContainer>*/}
            {/*                        )}*/}


            {/*                    {userInfo && userInfo.isAdmin && (*/}
            {/*                        <NavDropdown title='Admin' id='adminmenue'>*/}
            {/*                            <LinkContainer to='/admin/userlist'>*/}
            {/*                                <NavDropdown.Item>Users</NavDropdown.Item>*/}
            {/*                            </LinkContainer>*/}

            {/*                            <LinkContainer to='/admin/productlist'>*/}
            {/*                                <NavDropdown.Item>Products</NavDropdown.Item>*/}
            {/*                            </LinkContainer>*/}

            {/*                            <LinkContainer to='/admin/orderlist'>*/}
            {/*                                <NavDropdown.Item>Orders</NavDropdown.Item>*/}
            {/*                            </LinkContainer>*/}

            {/*                        </NavDropdown>*/}
            {/*                    )}*/}


            {/*                </Nav>*/}
            {/*            </Navbar.Collapse>*/}
            {/*        </Container>*/}
            {/*    </Navbar>*/}
            {/*</header>*/}


            <header>


                <nav className="navbar fixed-top navbar-expand-lg  navbar-light scrolling-navbar white">

                    <div className="container">


                        <a className="navbar-brand font-weight-bold" href="#"><strong>Phone Shop</strong></a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent-4"
                                aria-controls="navbarSupportedContent-4" aria-expanded="false"
                                aria-label="Toggle navigation">

                            <span className="navbar-toggler-icon"></span>

                        </button>


                        <div className="collapse navbar-collapse" id="navbarSupportedContent-4">

                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item ml-lg-3">

                                    <SearchBox/>

                                </li>


                                <li className="nav-item ml-lg-3">


                                    <Link to={`/cart`} className="nav-link dark-grey-text font-weight-bold"><i
                                        className="fas fa-shopping-cart blue-text"></i>


                                        {cartItems.length > 0 && (
                                            <span className="badge badge-danger badge-pill">{cartItems.length}</span>
                                        )}
                                        {/*<span className="badge badge-danger badge-pill">43</span>*/}
                                    </Link>


                                    {/*                   {cartItems.length > 0 && (*/}
                                    {/*  <span className="badge">{cartItems.length}</span>*/}
                                    {/*)}*/}


                                </li>

                                <li className="nav-item dropdown ml-lg-3">

                                    {/*    {userInfo ? (*/}
                                    {/*    <NavDropdown title={userInfo.name} id='username'>*/}
                                    {/*        <LinkContainer to='/profile'>*/}
                                    {/*            <NavDropdown.Item>Profile</NavDropdown.Item>*/}
                                    {/*        </LinkContainer>*/}

                                    {/*        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>*/}

                                    {/*    </NavDropdown>*/}
                                    {/*) : (*/}
                                    {/*        <LinkContainer to='/login'>*/}
                                    {/*            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>*/}
                                    {/*        </LinkContainer>*/}
                                    {/*    )}*/}
                                    {/*    */}
                                    {/*    {userInfo && userInfo.isAdmin && (*/}
                                    {/*    <NavDropdown title='Admin' id='adminmenue'>*/}
                                    {/*        <LinkContainer to='/admin/userlist'>*/}
                                    {/*            <NavDropdown.Item>Users</NavDropdown.Item>*/}
                                    {/*        </LinkContainer>*/}

                                    {/*        <LinkContainer to='/admin/productlist'>*/}
                                    {/*            <NavDropdown.Item>Products</NavDropdown.Item>*/}
                                    {/*        </LinkContainer>*/}

                                    {/*        <LinkContainer to='/admin/orderlist'>*/}
                                    {/*            <NavDropdown.Item>Orders</NavDropdown.Item>*/}
                                    {/*        </LinkContainer>*/}

                                    {/*    </NavDropdown>*/}
                                    {/*)}*/}


                                    {userInfo ? (
                                        <div>
                                            <a className="nav-link dropdown-toggle dark-grey-text font-weight-bold"
                                               id="navbarDropdownMenuLink-4"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-user blue-text"></i>
                                                {userInfo.name} </a>

                                            <div className="dropdown-menu dropdown-menu-right dropdown-cyan"
                                                 aria-labelledby="navbarDropdownMenuLink-4">

                                                <Link to={`/profile`}
                                                      className="dropdown-item waves-effect waves-light">My
                                                    account</Link>



                                                {userInfo.isAdmin && (
                                                    <div>
                                                        <Link to={`/admin/dashboard`}
                                                              className="dropdown-item waves-effect waves-light">Dashboard</Link>
                                                    </div>
                                                )}
                                                <div to={''} className="dropdown-item waves-effect waves-light"
                                                     onClick={logoutHandler}>Log out
                                                </div>


                                            </div>
                                        </div>
                                    ) : (

                                        <Link to={`/login`} className="nav-link dark-grey-text font-weight-bold"> <i
                                            className="fas fa-user blue-text"></i>

                                            Login
                                        </Link>


                                    )}

                                </li>

                            </ul>

                        </div>

                    </div>

                </nav>


            </header>
        </div>
    )
}

export default Header

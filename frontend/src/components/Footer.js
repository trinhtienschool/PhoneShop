import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
    return (
        <footer className="page-footer text-center text-md-left stylish-color-dark pt-0">

            <div style={{"background-color": "#4285f4"}}>

                <div className="container">


                    <div className="row py-4 d-flex align-items-center">


                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">

                            <h6 className="mb-0 white-text">Get connected with us on social networks!</h6>

                        </div>


                        <div className="col-md-6 col-lg-7 text-center text-md-right">


                            <a className="fb-ic ml-0 px-2"><i className="fab fa-facebook-f white-text"> </i></a>


                            <a className="tw-ic px-2"><i className="fab fa-twitter white-text"> </i></a>


                            <a className="gplus-ic px-2"><i className="fab fa-google-plus-g white-text"> </i></a>


                            <a className="li-ic px-2"><i className="fab fa-linkedin-in white-text"> </i></a>


                            <a className="ins-ic px-2"><i className="fab fa-instagram white-text"> </i></a>

                        </div>


                    </div>


                </div>

            </div>

            <div class="container mt-5 text-center text-md-left">

                <div class="row mt-3">


                    <div class="col-md-3 col-lg-4 col-xl-3 mb-4">

                        <h6 class="text-uppercase font-weight-bold" style={{color: "white"}}><strong>Company name</strong></h6>

                        <hr class="blue mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>

                        <p>Phone shop</p>

                    </div>


                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                        <h6 class="text-uppercase font-weight-bold" style={{color: "white"}}><strong>Products</strong></h6>

                        <hr class="blue mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>

                        <p><a href="http://localhost:3000/#/search/name/apple">APPLE</a></p>
                        <p><a href="http://localhost:3000/#/search/name/samsung">SAMSUNG</a></p>
                        <p><a href="http://localhost:3000/#/search/name/vivo">vivo</a></p>
                        <p><a href="http://localhost:3000/#/search/name/oppo">Oppo</a></p>



                    </div>


                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                        <h6 class="text-uppercase font-weight-bold" style={{color: "white"}}><strong>Useful links</strong></h6>

                        <hr class="blue mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>

                        <p><a href="https://www.fb.com">Facebook</a></p>

                        <p><a href="https://www.youtube.com">Youtube</a></p>

                        <p><a href="https://www.instagram.com/">Instagram</a></p>



                    </div>


                    <div class="col-md-4 col-lg-3 col-xl-3">

                        <h6 class="text-uppercase font-weight-bold" style={{color: "white"}}><strong>Contact</strong></h6>

                        <hr class="blue mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>

                        <p><i class="fas fa-home mr-3"></i> Nong Lam University</p>

                        <p><i class="fas fa-envelope mr-3"></i> trinhtien6236@gmail.com</p>

                        <p><i class="fas fa-phone mr-3"></i> + 84335361398</p>

                        <p><i class="fas fa-print mr-3"></i> + 84335361398</p>

                    </div>

                </div>

            </div>



        </footer>
    )
}

export default Footer

import { Container } from 'react-bootstrap'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import SearchScreen from "./screens/SearchScreen";
import DashboardScreen from "./screens/DashboardScreen";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/SentimentCircleChart";
import HorizontalBarChart from "./components/SentimentHorizontalBarChart";
import LineChart from "./components/SentimentLineChart";
import SimilarWordCloud from "./components/SimilarWordCloud";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ReviewListScreen from "./screens/ReviewListScreen";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">

            <Switch>

          <Route path='/' component={HomeScreen} exact />
                <Route path='/chart' component={SimilarWordCloud} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/forgot-password' component={ForgotPasswordScreen} />
          <Route path='/reset-password/:token' component={ResetPasswordScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />


          
          
           <Route path="/search/name" component={SearchScreen } exact></Route>
            <Route
              path="/search/name/:name"
              component={SearchScreen }
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen }
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen }
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={SearchScreen }
              exact
            ></Route>


                          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen}  exact/>

          <Route path='/admin/productlist/page/:pageNum' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/admin/orderlist' component={OrderListScreen} />
                <Route path='/admin/dashboard' component={DashboardScreen} />
                <Route path='/admin/reviewlist' component={ReviewListScreen}  exact/>
                <Route path='/admin/reviewlist/page/:pageNum' component={ReviewListScreen}/>


                </Switch>

      </main>
      <Footer />
    </Router>
  );
}

export default App;
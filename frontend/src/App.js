import './App.css';
import {BrowserRouter,Route,NavLink, Switch} from 'react-router-dom';
import Product from './routes/Product';
import Home from './routes/Home';
import Cart from './routes/Cart';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Error404 from './routes/Error404';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {userSignOut} from './actions/userActions'
import AddAddreass from './routes/AddAddress';
import Payment from './routes/payment';
import PaymentSuccess from './routes/PaymentSuccess';

function App() {
    const user = useSelector(state => state.userSignIn);
    const {userInfo} = user;
    const cartItems = userInfo ? userInfo.cart : 0;
    const dispatch = useDispatch();
    const openMenu=()=>{
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu=()=>{
        document.querySelector(".sidebar").classList.remove("open");
    }
    const signOut = () =>{
        userSignOut(dispatch);
    }

  return (
       <>
       <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <span id='ecommerce'>e-commerce</span>
        </div>
        <div className="header-link">
        <NavLink to='/'>Home</NavLink>
            <NavLink to="/cart">Cart
            {cartItems.length>0 && (
                <span className='badge'>{cartItems.length}</span>
            )}</NavLink>   
            { userInfo ? (<div className='drop-down'>
                <NavLink to='#' >
                    {userInfo.name}<i class="bi bi-caret-down-fill"></i>
            </NavLink>
                <ul className='list-ele'>
                    <li>
                        <NavLink to= '/' onClick={signOut}>Sign out</NavLink>
                    </li>
                </ul>
                </div>
            ) :
            <NavLink to="/signin">SignIn</NavLink> }
        </div>
    </header>
    <main className="main">
        <Switch>
            
            <Route exact path='/signin' component={SignIn} />
            <Route exact path= '/signup' component={SignUp} />
            <Route exact path='/cart/:id?' component={Cart} />
            <Route exact path="/" component={Home} />
            <Route exact path="/address" component={AddAddreass} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path='/payment/success' component={PaymentSuccess} />
            <Route path='*' component={Error404} />
            </Switch>
    </main>
    
    <footer className="footer">
        All right reserved
    </footer>
</div>
</BrowserRouter>
</>
  );
}

export default App;

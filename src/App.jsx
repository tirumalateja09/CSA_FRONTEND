import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

const Login = lazy(() => import("./components/Auth/Login"));
const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));
const Offers = lazy(() => import('./components/Offers'));
const Cart= lazy(() => import('./components/Cart'));
const Signup =lazy(()=>import ('./components/Auth/Signup'))
const ProductMenu =lazy(()=>import('./components/Products/ProductMenu'))

const App = () => {

  // Authorize routing
   const [check,setcheck]=useState(false)
   const [loginData,setLoginData]=useState(null)
 useEffect(()=>{
  const data=()=>{
    const token=localStorage.getItem('token')
    setLoginData(token)
    setcheck(!check)
  }
  data();
 },[check])
 
 
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Navbar  />
        <Routes>
        
          <Route path='/' element={ loginData ?  <Navigate to={'/home'} /> : <Login/> }/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/:productId" element={<ProductMenu/>} />
          <Route path="/home" element={ loginData ?  <Home /> : <Login/> } />
          <Route path="/offers" element={ loginData ? <Offers /> : <Login/>} />
          <Route path="/cart" element={ loginData ? <Cart /> : <Login/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
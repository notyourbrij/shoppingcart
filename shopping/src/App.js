import {BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Login from "./Login";
import Signup from "./Signup";
import Admindash from "./Admindash";
import Frontendpage from "./Frontendpage";
import Header from "./Components/Header";
import Adminproductpage from "./Adminproductpage";
import Addadminproduct from "./Addadminproduct";
import Adminupdateproduct from "./Adminupdateproduct";
import { Contextapi } from "./Contextapi";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Myorders from "./Myorders";
import Ordersgotadmin from "./Ordersgotadminpage";
import Updateorderstatus from "./Updateorderstatus";

function App() {

  const[LoginName, setLoginname]=useState(localStorage.getItem("Username"))

 let [cart, setCart] = useState(() => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { items: {}, totalItems: 0 };
});


  useEffect(()=>{

    localStorage.setItem("cart", JSON.stringify(cart))

  },[cart])
 
  return ( 
    <>

    <Router>

      <Contextapi.Provider value={{LoginName, setLoginname, cart, setCart}}>
      <Header/>

      <Routes>

        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/admindash"element={<Admindash/>}></Route>
        <Route path="/products" element={<Frontendpage/>}></Route>
        <Route path="/adminproductpage" element={<Adminproductpage/>}></Route>
        <Route path="/addadminproduct" element={<Addadminproduct/>}></Route>
        <Route path="/updateproduct/:id" element={<Adminupdateproduct/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/myorders" element={<Myorders/>}></Route>
        <Route path="/ordergot" element={<Ordersgotadmin/>}></Route>
        <Route path="/updateorderstatus/:id" element={<Updateorderstatus/>}></Route>


      </Routes>
      <Footer/>
    </Contextapi.Provider>
    </Router>
    
    
    </>
   );
}

export default App;
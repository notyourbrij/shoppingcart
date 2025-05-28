import { useContext } from "react";
import { Contextapi } from "../Contextapi";
import { Link, useNavigate } from "react-router-dom";

function Header() {

    const{LoginName, setLoginname, cart, setCart }=useContext(Contextapi)
    const navigate=useNavigate()

    function handlelogout(e){

        localStorage.removeItem("Username")

        setLoginname(localStorage.getItem("Username"))

        localStorage.removeItem("cart")

        setCart({ items: {}, totalItems: 0 })

        navigate("/")
    }
    

    return (
        <>
        {LoginName? 
        <section id="head">

            <div className="container">
                <div className="row">
                    <div className="col-md-8"><h6>Welcome: {LoginName}</h6> </div>
                    <div className="col-md-4">
                        
                        <button onClick={(e)=>{handlelogout(e)}} className="btn btn-danger">Logout</button>

                        <Link to="/cart"><button className="btn btn-dark me-2"><i className="bi bi-cart-fill"></i> Cart:{!cart.totalItems?0:cart.totalItems} </button></Link>

                        <Link to="/products"><button className="btn btn-primary me-2">Products</button></Link> 

                        <Link to="/myorders"><button className="btn btn-secondary me-2"><i className="bi bi-box2"> My Orders</i></button></Link>
                        
                        </div>
                </div>
            </div>
        </section>

        :<></>}

        </>
      );
}

export default Header;
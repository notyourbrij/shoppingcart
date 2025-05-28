import { useContext } from "react";
import { Link } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Productstr(props) {

    const { pdata } = props

    const{cart, setCart}=useContext(Contextapi)

   function handleaddcart(id, qty) {
    // Clone the existing cart
    let _cart = { ...cart }

    // Initialize items if not present
    if (!_cart.items) {
        _cart.items = {}
    }

    // Add or increment the item
    if (!_cart.items[id]) {
        _cart.items[id] = 1
    } else {

        if(_cart.items[id]>qty){

            alert("Max product limit Reached")

        }else{
        _cart.items[id] += 1
        }
    }

    // Initialize or increment totalItems
    if (!_cart.totalItems) {
        _cart.totalItems = 1
    } else {
        _cart.totalItems += 1
    }

    // Update cart state
    setCart(_cart)

    // Debug output
    //console.log(_cart)
}


    return (
        <>
            <div className="col-md-4 mt-2">

                <div className="card" style={{ "width": "18rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center">{pdata.name}</h5>
                        <div className="text-center"><img style={{width:"250px"}} src={`/upload/${pdata.img}`}  alt=""/></div>
                        <p className="card-text">{pdata.des}</p>
                        <button className="btn btn-danger" onClick={()=>{handleaddcart(pdata._id, pdata.quantity)}}><i className="bi bi-cart-plus"></i> Add Cart</button>
                        <Link to="/" className="btn btn-info ms-2">More Info</Link>
                    </div>
                </div>


            </div>


        </>
    );
}

export default Productstr;
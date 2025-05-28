import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Cart() {

    const{cart, setCart}=useContext(Contextapi)

    const[productData, setProductdata]=useState([])
    
    const navigate=useNavigate()

    useEffect(()=>{

        fetch("/api/cart", {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ids:Object.keys(cart.items)})

        }).then((result)=>{return result.json()}).then((data)=>{

           // console.log(data)
            if(data.status===200){

                setProductdata(data.apiData)
            }else{

                console.log(data.message)
            }
        })

    },[cart])

    //quantity
    function handleqty(id){

       return cart.items[id]

    }

    //price
    function handleprice(id, price){

    let currentqty=handleqty(id)

     let productprice= currentqty*price

      return productprice

    }

    //calculating total
   let totalamount = 0

    productData.forEach((result) => {
        
        totalamount += handleprice(result._id, result.price)   // Add product prices to total
    })


    //function delete
    function handledelete(id){

        let currentqty=handleqty(id)

        let _cart={...cart}

        delete _cart.items[id]

        _cart.totalItems=cart.totalItems-currentqty

        setCart(_cart)

    }

    //function handleincrement
    function handleincrement(id, qty){

        let currentqty=handleqty(id)

        let _cart={...cart}

        if(currentqty>qty){

            alert("Product Max limit reached")

            return
        }

        _cart.items[id]=currentqty+1

        _cart.totalItems +=1

        setCart(_cart)
    }

    function handledecrement(id){

        let currentqty=handleqty(id)

        let _cart={...cart}

        if(currentqty===1){

            return
        }

        _cart.items[id]= currentqty-1 
        _cart.totalItems -=1

        setCart(_cart)

    }

    //checkout
    function handlecheckout(e){

        let username=localStorage.getItem("Username")

        fetch(`/api/cartcheck/${username}`, {

            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(cart)

        }).then((result)=>{return result.json()}).then((data)=>{

           // console.log(data)

            if(data.status===201){

                alert("Your Order is placed")

                navigate("/products")

                setCart({items:{}, totalItems:0})


            }else{

                console.log(data.message)
            }
        })
    }
    return ( 


        <>
        {productData.length>0?
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>sr.No</th>
                                    <th>Product Name</th>
                                    <th>Product Quantity</th>
                                    <th>Product Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {productData.map((result, dd)=>(
                                <tr key={result._id}>
                                    <td>{dd+1}</td>
                                    <td>{result.name}</td>
                                    <td><button onClick={()=>{handleincrement(result._id, result.quantity)}}>+</button>{handleqty(result._id)}<button onClick={()=>{handledecrement(result._id)}}>-</button></td>
                                    <td>{handleprice(result._id, result.price)}</td>
                                    <td><i className="btn btn-warning bi bi-trash-fill" onClick={()=>{handledelete(result._id)}}></i></td>
                                </tr>
                                ))}
                                <tr>
                                    <td colSpan="3"></td>
                                    <td>Total Amount: {totalamount}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4"></td>
                                    <td><i className="btn btn-primary bi bi-paypal" onClick={(e)=>{handlecheckout(e)}}> CheckOut</i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
            :<div className="text-center mt-3 mb-3"><img style={{width:"250px"}} src="/upload/emptycart.png" alt=""/></div>}
        </>
     );
}

export default Cart;
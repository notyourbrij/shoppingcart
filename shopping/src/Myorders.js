import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Myorders() {


    const{LoginName}=useContext(Contextapi)

    const[orderData, setOrderdata]=useState([])

    useEffect(()=>{

        fetch(`/api/myorders/${LoginName}`).then((result)=>{return result.json()}).then((data)=>{

           // console.log(data)

            if(data.status===200){

                setOrderdata(data.apiData)

            }else{

                console.log(data.message)
            }
        })
        


        },[])

    return (  
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h4>My Orders</h4>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>sr.No</th>
                                    <th>Product Name</th>
                                    <th>Product Quantity</th>
                                    <th>Product Price</th>
                                    <th>Username</th>
                                    <th>Order Placed Date</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {orderData.map((result, index)=>(
                                <tr key={result._id}>

                                    <td>{index+1}</td>
                                    <td>{result.name}</td>
                                    <td>{result.quantity}</td>
                                    <td>{result.price}</td>
                                    <td>{result.username}</td>
                                    <td>{new Date(result.date).toLocaleString()}</td>
                                    <td><i className="bi bi-truck"> {result.orderstatus}</i></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Myorders;
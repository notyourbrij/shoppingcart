import { useEffect, useState } from "react";
import Left from "./Components/Left";
import { Link } from "react-router-dom";

function Ordersgotadmin() {

    const[orderData, setOrderdata]=useState([])

    useEffect(()=>{

        fetch("/api/allorders").then((result)=>{return result.json()}).then((data)=>{

            //console.log(data)

            if(data.status===200){

                setOrderdata(data.apiData)

            }else{

                console.log(data.message)
            }
        })


    },[])
    return ( 
        <section id="mid">

            <div className="container">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">

                        <h4 className="text-center">Check Latest Order Received Below</h4>
                        
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Username Ordered</th>
                                    <th>Product Name</th>
                                    <th>Product Quantity</th>
                                    <th>Price</th>
                                    <th>Ordered Date</th>
                                    <th>Status</th>
                                    <th>Update Order Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orderData.map((result, index)=>(
                                <tr key={result._id}>
                                    <td>{index+1}</td>
                                    <td>{result.username}</td>
                                    <td>{result.name}</td>
                                    <td>{result.quantity}</td>
                                    <td>{result.price}</td>
                                    <td>{new Date(result.date).toLocaleString()}</td>
                                    <td><i className="bi bi-truck"></i> {result.orderstatus}</td>
                                    <td><Link to={`/updateorderstatus/${result._id}`}><button className="btn btn-primary"><i className="bi bi-pencil-square"></i></button> </Link></td>
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

export default Ordersgotadmin;
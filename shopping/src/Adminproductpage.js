import { Link } from "react-router-dom";
import Left from "./Components/Left";
import { useEffect, useState } from "react";

function Adminproductpage() {


    const[productData, setProductdata]=useState([])

    useEffect(()=>{

        fetch("/api/displayproduct").then((result)=>{return result.json()}).then((data)=>{

            //console.log(data)

            if(data.status===200){

                setProductdata(data.apiData)

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

                        <h4 className="text-center">Manage Product Below</h4>

                        <Link to="/addadminproduct"><button className="btn btn-primary"><i className="bi bi-cart-plus-fill"></i> Add Product</button> </Link>

                       <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Total Products: </th>
                                <th>In Stock Products: </th>
                                <th>Out of Stock Products: </th>
                            </tr>
                        </thead>
                       </table>
                       
                       
                        <table className="table table-hover">

                            <thead>
                                <tr>
                                    <th>sr.no</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Info</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                    <th>CreatedDate</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productData.map((result, dd)=>(
                                <tr key={result._id}>
                                    <td>{dd+1}</td>
                                    <td>{result.name}</td>
                                    <td>{result.des}</td>
                                    <td>{result.info}</td>
                                    <td>{result.price}</td>
                                    <td>{result.quantity}</td>
                                    <td>{!result.img ? "no image found" : <img style={{ width: "50px" }} src={`upload/${result.img}`} alt="product" />}</td>
                                    <td>{new Date(result.createddate).toLocaleString()}</td>
                                    <td>{result.productstatus}</td>
                                    <td><Link to={`/updateproduct/${result._id}`}><button className="btn btn-danger"><i className="bi bi-pencil-square"></i></button></Link></td>
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

export default Adminproductpage;
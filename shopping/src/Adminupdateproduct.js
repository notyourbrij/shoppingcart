import { useParams } from "react-router-dom";
import Left from "./Components/Left";
import { useEffect, useState } from "react";

function Adminupdateproduct() {

    const {id}=useParams()

    const[name, setName]=useState("")
    const[des, setDes]=useState("")
    const[info, setInfo]=useState("")
    const[price, setPrice]=useState("")
    const[qty, setQty]=useState("")
    const[img, setImg]=useState(null)
    const[message, setMessage]=useState("")
    const[productStatus, setProductStatus]=useState("")
   

    useEffect(()=>{

        fetch(`/api/singleproduct/${id}`).then((result)=>{return result.json()}).then((data)=>{

          //  console.log(data)

            if(data.status===200){
                setName(data.apiData.name)
                setDes(data.apiData.des)
                setInfo(data.apiData.info)
                setPrice(data.apiData.price)
                setQty(data.apiData.quantity)
                setImg(data.apiData.img)
                setProductStatus(data.apiData.productstatus)
            
            }else{

                console.log(data.message)
            }
        })

    },[])

    function handleform(e){

        e.preventDefault()

        const updateform=new FormData()

        updateform.append("name", name)
        updateform.append("des", des)
        updateform.append("info", info)
        updateform.append("price", price) 
        updateform.append("quantity", qty) 
        updateform.append("productstatus", productStatus)
        
        if(img){
            updateform.append("img", img)
        }


        fetch(`/api/productupdate/${id}`, {

            method:"PUT",
            body: updateform

        }).then((result)=>{return result.json()}).then((data)=>{

            console.log(data)

            if(data.status===200){

                setMessage(data.message)

            }else{

                console.log(data.message)
            }
        })
    }

    return ( 
        <section id="mid">

            <div className="container">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">

                        <h4 className="text-center">Update Below</h4>

                        <p>id is: {id}</p>
                        
                        {message &&
                        <div className="alert alert-success mt-1 text-center form-control">{message}</div>
                        }

                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Update Product Name</label>
                            <input type="text" className="form-control" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />

                            <label>Update Product Description</label>
                            <input type="text" className="form-control" 
                            value={des}
                            onChange={(e)=>{setDes(e.target.value)}}
                            />

                            <label>Update Info</label>
                            <textarea className="form-control"
                            value={info}
                            onChange={(e)=>{setInfo(e.target.value)}}
                            ></textarea>

                            <label>Update Product Price</label>
                            <input type="number" className="form-control" 
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}} 
                            />

                            <label>Update Product Quantity</label>
                            <input type="number" className="form-control"
                            value={qty}
                            onChange={(e)=>{setQty(e.target.value)}}
                            />

                            <label>Update Status</label>
                            <select className="form-select" value={productStatus} onChange={(e)=>{setProductStatus(e.target.value)}}>
                                <option value="In Stock">In Stock</option>
                                <option value="Out Stock">Out Of Stock</option>
                            </select>

                            <div>{img?<img style={{width:"50px"}} src={`/upload/${img}`} alt="" />:"No Image Found"} </div>
                            <label>Update Product Image</label>
                            <input type="file" className="form-control" 
                            
                            onChange={(e)=>{setImg(e.target.files[0])}}
                            />

                            <button type="submit" className="btn btn-success form-control mt-2"> <i className="bi bi-cart-check-fill"></i>Update Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Adminupdateproduct;
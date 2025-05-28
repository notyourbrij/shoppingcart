import { useState } from "react";
import Left from "./Components/Left";

function Addadminproduct() {


    const[name, setName]=useState("")
    const[des, setDes]=useState("")
    const[info, setInfo]=useState("")
    const[price, setPrice]=useState("")
    const[qty, setQty]=useState("")
    const[img, setImg]=useState(null)
    const[message, setMessage]=useState("")
    function handleform(e){

        e.preventDefault()

        //console.log(name,des,info,price,qty,img)

        const productData=new FormData()
       
        productData.append("name", name)
        productData.append("des", des)
        productData.append("info", info)
        productData.append("price", price)
        productData.append("quantity", qty)

        if(img){
            productData.append("img", img)
        }


        fetch("/api/productaddition", {

            method:"POST",
            body:productData

        }).then((result)=>{return result.json()}).then((data)=>{

           // console.log(data)

            if(data.status===201){

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

                        <h4>Add Products Below</h4>


                        {message &&
                        <div className="alert alert-success mt-1 form-control text-center">{message}</div>
                        }

                        <form onSubmit={(e)=>{handleform(e)}}>
                            <label>Product Name</label>
                            <input type="text" className="form-control"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />

                            <label>Product Description</label>
                            <input type="text" className="form-control"
                            value={des}
                            onChange={(e)=>{setDes(e.target.value)}}
                            />

                            <label>More Info</label>
                            <textarea className="form-control"
                            value={info}
                            onChange={(e)=>{setInfo(e.target.value)}}
                            ></textarea>

                            <label>Product Price</label>
                            <input type="number" className="form-control" 
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                            />

                            
                            <label>Product Quantity</label>
                             <input type="number" className="form-control" 
                             value={qty}
                             onChange={(e)=>{setQty(e.target.value)}}
                             />

                            <label>Product Image</label>
                            <input type="file" className="form-control" 
                            onChange={(e)=>{setImg(e.target.files[0])}}
                            />

                            <button type="submit" className="btn btn-danger mt-2 form-control"> <i className="bi bi-cart-plus-fill"></i> Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Addadminproduct;
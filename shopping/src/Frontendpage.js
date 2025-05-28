import { useEffect, useState } from "react";
import Productstr from "./Productstr";

function Frontendproducts() {

    const[productData, setProductdata]=useState([])

    useEffect(()=>{

       fetch("/api/instock").then((result)=>{return result.json()}).then((data)=>{

       // console.log(data)
        if(data.status===200){

            setProductdata(data.apiData)

        }else{

            console.log(data.message)
        }
    })

    },[])

    return ( 
        <div id="frontend">

            <div className="container">
                <div className="row">

                    {productData.map((result, dd)=>(
                    <Productstr key={dd} pdata={result}/>
                
                    ))}
                </div>
            </div>

        </div>
     );
}

export default Frontendproducts;
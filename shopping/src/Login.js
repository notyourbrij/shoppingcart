import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Login() {

    const{ setLoginname}=useContext(Contextapi)

    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[message,  setMessage]=useState("")
    const navigate=useNavigate()

    function handlelogin(e){

        e.preventDefault()

        //console.log(username, password)

        const data={username, password}

        fetch("/api/login", {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{

            //console.log(data)

            if(data.status===200 && data.username==="admin"){

                localStorage.setItem("Username", data.username)

                setLoginname(localStorage.getItem("Username"))

                navigate("/admindash")


            }else if(data.status===200 && data.username!=="admin"){

                  localStorage.setItem("Username", data.username)

                   setLoginname(localStorage.getItem("Username"))

                navigate("/products")

            }else{

                setMessage(data.message)
            }
        })
    }

    return ( 
        <section id="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">

                        {message &&
                        <div className="alert alert-danger mt-2 form-control text-center">{message}</div>
                        }

                        <div className="text-center"><i className="bi bi-lock"></i></div>

                        <form onSubmit={(e)=>{handlelogin(e)}}>

                            <h4 className="text-center">Login Below</h4>
                            <label>Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>

                            <label>Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                            <button type="submit" className="btn btn-danger form-control mt-2">Login</button>
                        </form>
                        <p className="text-center">

                            <Link to="/signup">No Account ? Create 1 Now!</Link>
                        </p>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
     );
}

export default Login;
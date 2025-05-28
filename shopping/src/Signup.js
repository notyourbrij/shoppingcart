import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[message, setMessage]=useState("")

    function handleform(e){
        e.preventDefault()

        console.log(username,password)

        const data={username, password}

        fetch("/api/signup", {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)

        }).then((result)=>{return result.json()}).then((data)=>{

            console.log(data)
            if(data.status===201){

                setMessage(data.message)

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
                        <div className="alert alert-info mt-2 form-control text-center">{message}</div>
                        }

                        <form onSubmit={(e)=>{handleform(e)}}>

                            <h4 className="text-center">Create an Account!</h4>
                            <label>Username</label>
                            <input type="text" className="form-control"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            />

                            <label>Password</label>
                            <input type="password" className="form-control"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />

                            <button type="submit" className="btn btn-primary form-control mt-2">Create Account</button>
                        </form>
                        <p className="text-center">

                            <Link to="/">Login Now, if already have an account!</Link>
                        </p>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </section>
     );
}

export default Signup;
import { Link } from "react-router-dom";

function Left() {
    return ( 
        <>
        
        <div className="col-md-3">

            <Link to="/admindash"><button className="btn btn-dark mt-1 form-control">Dashboard</button></Link>

            <Link to="/adminproductpage"><button className="btn btn-success mt-1 form-control">Product Management</button></Link>

             <Link to="/ordergot"><button className="btn btn-primary mt-1 form-control">Order Recieved</button></Link>










        </div>
        
        
        
        </>
     );
}

export default Left;
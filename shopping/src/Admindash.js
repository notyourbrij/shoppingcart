import Left from "./Components/Left";

function Admindash() {

    return ( 
        <section id="mid">

            <div className="container">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">

                        <h4 className="text-center">Welcome To AdminDashBoard</h4>

                        <div className="text-center mt-3 "><img style={{width:"250px"}} src={`/upload/welcome.jpg`} alt=""/></div>

                        <p className="text-center" style={{fontSize:"18px"}}><i className="bi bi-arrow-left-circle-fill"></i> Manage service from left Side</p>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Admindash;
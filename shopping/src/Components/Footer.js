import { useContext } from "react";
import { Contextapi } from "../Contextapi";

function Footer() {

    const{LoginName}=useContext(Contextapi)

    return ( 
        <>
        {LoginName? 
        <section id="foot">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">© Copyright 2025, Brij Shopping Cart Project</div>
                </div>
            </div>
        </section>

        :<> </>}

        </>
     );
}

export default Footer;
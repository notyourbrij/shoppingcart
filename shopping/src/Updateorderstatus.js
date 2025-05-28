import { useParams } from "react-router-dom"
import Left from "./Components/Left"
import { useEffect, useState } from "react"

function Updateorderstatus() {
    const { id } = useParams()

    const [orderstatus, setOrderStatus] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch(`/api/singleorder/${id}`).then(result => result.json()).then(data => {

                //console.log(data)
                if (data.status === 200 && data.apiData) {

                    setOrderStatus(data.apiData.orderstatus)

                } else {

                    console.error(data.message)
                }
            })
           
    }, [id])

    function handleForm(e) {
        e.preventDefault()

       // console.log(orderstatus)

        const data = { orderstatus }

        fetch(`/api/updateorderstatus/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(result => result.json()) .then(data => {
               // console.log(data)

                if (data.status === 201) {

                    setMessage(data.message)

                } else {

                    console.error(data.message)
                }
            })
            
    }

    return (
        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h4 className="text-center">Update Order Status Below</h4>

                        

                        {message &&
                            <div className="alert alert-success form-control text-center">
                                {message}
                            </div>
                        }

                        <form onSubmit={handleForm}>
                            <label>Update Order Status</label>

                            <select
                                className="form-select"
                                value={orderstatus}
                                onChange={e => setOrderStatus(e.target.value)}
                            >
                                <option value="Order Placed">Order Placed</option>
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="Order Dispatched">Order Dispatched</option>
                                <option value="Order Delivered">Order Delivered</option>
                            </select>

                            <button type="submit" className="btn btn-danger form-control">
                                Update Status
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Updateorderstatus

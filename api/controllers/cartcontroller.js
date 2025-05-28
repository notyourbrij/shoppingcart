const cartTable=require("../model/cart")
const producttable = require("../model/producttable")



exports.cartcheck = async (req, res) => {

    try {

        let newdate= Date.now()
        let username = req.params.username

        const { items } = req.body

        for (let keys in items) {


            const record = await producttable.findById(keys)

            const newRecord = new cartTable({
                name: record.name,
                price: record.price,
                quantity: items[keys],
                username: username,
                date: newdate

            })

            await newRecord.save() // ✅ Actually save to DB
           // console.log(newRecord)
        }

        // ✅ Send response only after the loop finishes
        res.status(201).json({

            status: 201,
           
        })

    } catch (error) {

        res.status(500).json({

            status: 500,

            message: error.message
        })
    }
}



//username based myorders api
exports.orderdetails=async(req,res)=>{

    try{

    let username=req.params.username
    
    const record=await cartTable.find({username:username}).sort({date: -1})

    //console.log(record)

    res.status(200).json({

        status:200,
        apiData:record
    })

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }
}


//all data orders api
exports.gotorders=async(req,res)=>{

    try{

    const record=await cartTable.find().sort({date: -1})


    res.status(200).json({

        status:200,
        apiData:record
    })

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }
}


//single order by id find

exports.singleorder=async(req,res)=>{

    try{
    const id=req.params.id

    const record=await cartTable.findById(id)

    res.status(200).json({

        status:200,
        apiData:record
    })

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }

}

//update order status

exports.updating = async (req, res) => {
    try {

        const { id } = req.params
        const { orderstatus } = req.body  // ✅ extract the actual value

        await cartTable.findByIdAndUpdate(id, { orderstatus })

        res.status(201).json({
            status: 201,
            message: "Order status is updated"
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

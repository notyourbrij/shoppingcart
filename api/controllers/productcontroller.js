const producttable=require("../model/producttable")

//product adding api 100% working now
exports.addingproduct=(req,res)=>{

    try{
   const{name,des,info,price,quantity}= req.body

    if(req.file){
        

        const filename=req.file.filename

       const record= new producttable({ name: name, des: des, info: info, price: price, quantity: quantity, img: filename })

       record.save()

       res.status(201).json({

        status:201,
        message:"product is added"

       })

    }else{

        const record= new producttable({ name: name, des: des, info: info, price: price, quantity: quantity})

        record.save()

          res.status(201).json({

        status:201,
        message:"product is added without image"
        
       })

    }

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }
}

//product display api (100% working)
exports.showproduct=async(req,res)=>{

    try{

    const record=await producttable.find().sort({createddate:-1})
    

    res.status(200).json({
        status:200,
        apiData:record, 
    })

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }
}

//single product api by id(100% working)
exports.productbyid=async(req,res)=>{

    try{
    const id=req.params.id

    const record=await producttable.findById(id)

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

//updating api using put(100% WORKING)
exports.updating = async (req, res) => {

    const id = req.params.id
    const { name, des, info, price, quantity, productstatus } = req.body


        if (req.file) {
            const filename = req.file.filename

            await producttable.findByIdAndUpdate(id, {  name: name,  des: des, info: info, price: price, quantity: quantity, img: filename, productstatus: productstatus })
            
            res.status(200).json({

                status:200,
                message:"Updated Successfully"
            })
        
        } else {

            await producttable.findByIdAndUpdate(id, { name: name,des: des,info: info,price: price,quantity: quantity,productstatus: productstatus})
            
            res.status(200).json({

                status:200,
                message:"Updated Successfully without Image"
            })

        }

      
}

//instock api (100% working)
exports.instock=async(req,res)=>{

    try{

    const record=await producttable.find({productstatus: "In Stock"})

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

//100% working cart page api(100%)
exports.cartpage=async(req,res)=>{

    try{
    const{ids}=req.body

    const record=await producttable.find({_id:{$in:ids}})

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
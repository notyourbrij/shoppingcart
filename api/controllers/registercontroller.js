const regtable=require("../model/register")

const bcrypt=require("bcrypt")

//signup api (working 100%)
exports.registering=async(req,res)=>{

    try{

    const{username, password}=req.body

    const usercheck=await regtable.findOne({username:username})

    if(usercheck==null){

        const convertedpass=await bcrypt.hash(password,10)

        //console.log(convertedpass)

    const record=new regtable({username:username, password:convertedpass})

    record.save()

    res.status(201).json({

        status:201,
        message:"registeration successful"
    })

    }else{

        res.status(400).json({

            status:400,
            message:`${username} is already taken, try different`
        })
    }

    }catch(error){

        res.status(500).json({

            status:500,
            message:error.message
        })
    }

}


//loginapi (working 100%)
exports.login=async(req,res)=>{

    const{username, password}=req.body

    const record=await regtable.findOne({username})

    if(record!==null){

        const compared=await bcrypt.compare(password, record.password)

        if(compared){

        res.status(200).json({

            status:200,
            username:record.username
        })

        }else{

            res.status(400).json({

                status:400,
                message:"wrong Credentials"
            })

        }

    }else{


        res.status(400).json({

            status:400,
            message:"wrong Credentials"
        })
    }
}


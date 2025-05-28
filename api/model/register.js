const mongoose=require("mongoose")

const regschema=mongoose.Schema({

    username:{type:String,required:true},
    password:{type:String, required:true}
    
})

module.exports=mongoose.model("reg", regschema)
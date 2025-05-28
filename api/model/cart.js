const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({

    name: String,
    price: Number,
    quantity: Number,
    username: String,
    date: { type: Date, default: Date.now },
    orderstatus:{type:String, default:"Order Placed"}
})

module.exports=mongoose.model("cart", cartSchema)
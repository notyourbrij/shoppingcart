const express=require("express")

const app=express()

require("dotenv").config()

app.use(express.json())


const apirouter=require("./routers/apirouter")


const mongoose=require("mongoose")

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)





//ref
app.use(express.static("public"))
app.use("/api", apirouter)
app.listen(5000,(()=>{console.log(`server running on port 5000`)}))
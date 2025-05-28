const mongoose = require("mongoose");

const ProdSchema = new mongoose.Schema({
    name: { type: String, required: true },
    des: { type: String, required: true },
    info: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    img: { type: String },
    createddate: { type: Date, default: Date.now },
    productstatus: { type: String, default: "In Stock" }
});

module.exports = mongoose.model("Product", ProdSchema);

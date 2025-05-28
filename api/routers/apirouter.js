const router=require("express").Router()

const upload=require("../helpers/multer")


const regc=require("../controllers/registercontroller")
const productC=require("../controllers/productcontroller")
const cartC=require("../controllers/cartcontroller")


//signup api and login api
router.post("/signup", regc.registering)
router.post("/login", regc.login)

//product apis
router.post("/productaddition", upload.single("img"), productC.addingproduct )
router.get("/displayproduct",productC.showproduct)
router.get("/singleproduct/:id", productC.productbyid)
router.put("/productupdate/:id", upload.single("img") ,productC.updating)
router.get("/instock", productC.instock)

router.post("/cart", productC.cartpage)

router.post("/cartcheck/:username", cartC.cartcheck)

router.get("/myorders/:username", cartC.orderdetails)

router.get("/allorders", cartC.gotorders )

router.get("/singleorder/:id", cartC.singleorder)

router.put("/updateorderstatus/:id", cartC.updating)

module.exports=router
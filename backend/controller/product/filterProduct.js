const filterProductController = async(req,res) =>{
const productModel = require("../../models/productModel")
    try {

      const categoryList = req?.body?.category
        const  product = await productModel.find({
            category : {
                "$in" : categoryList 
            }
        })

        res.json({
            data : product,
            message : "product",
            error : false,
            success : true
        })
        
    } catch (err) {
        res.json({
            message: err.message || err,
            success:false,
            error: true
        })
        
    }

}

module.exports = filterProductController
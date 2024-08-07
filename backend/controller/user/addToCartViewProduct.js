const addToCartModel = require("../../models/cartModule")

const addTocartViewProduct = async (req,res)=>{
    try {
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")


        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    } catch (err) {
        res.json({
            message: err.messgae || err , 
            success : false,
            error : true

        })
    }

  
}

module.exports = addTocartViewProduct
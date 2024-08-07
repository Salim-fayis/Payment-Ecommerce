const addToCartModel = require("../../models/cartModule")

const countAddToCart=async (req,res)=>{
    try {
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.json({
            data:{
                count : count
            },
            message:"OK",
            error : false,
            success : true
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            success:false,
            error:false,
        })
        
    }
}

module.exports = countAddToCart
const userModel = require("../../models/UserModel");

async function AllUsers(req,res){
    try {

        console.log("userId",req.userId);

        const allUsers = await userModel.find()

        res.json({
            message:"All Users",
            data: allUsers,
            success: true,
            error : false
        })
        
    } catch (error) {
        res.json({
            message : err.message || err ,
            error : true,
            success : false,
        })
    }
}

module.exports = AllUsers
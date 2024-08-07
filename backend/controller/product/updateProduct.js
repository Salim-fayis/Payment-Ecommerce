const productModel = require("../../models/productModel")
const uploadProductPermission = require('../../utils/permission');

async function updateProductController(req, res) {
    try {
        // Check for upload permission
        if (!await uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req.body;

        // Update product and return the updated document
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        if (!updateProduct) {
            throw new Error("Product not found");
        }

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateProductController;

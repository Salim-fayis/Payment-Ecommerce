const express = require('express');
const router = express.Router();

// User routes
const UserSignUpController = require('../controller/user/userSignUp');
const UserSignInController = require('../controller/user/userSignIn');
const UserDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const UserLogout = require('../controller/user/userLogout');
const AllUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');

// Product routes
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProductOne = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

// Cart routes
const addToCartController = require('../controller/user/addToCartController');
const countAddToCart = require('../controller/user/countAddToCartProduct');
const addTocartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deteleAddToCartProduct');

// Order and payment routes
const paymentController = require('../controller/order/paymentController');
const webhook = require('../controller/order/webhook');
const orderController = require('../controller/order/orderController');
const allOrderController = require('../controller/order/allOrderController');

// User routes
router.post("/signup", UserSignUpController);
router.post("/signin", UserSignInController);
router.get("/user-details", authToken, UserDetailsController);
router.get("/userLogout", UserLogout);

// Admin panel
router.get("/all-users", authToken, AllUsers);
router.post("/update-user", authToken, updateUser);

// Product routes
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryproduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Cart routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countaddtocart", authToken, countAddToCart);
router.get("/view-card-prodcut", authToken, addTocartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Payment and order routes
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhook);
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);

module.exports = router;

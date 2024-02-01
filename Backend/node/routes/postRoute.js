const express = require('express');
const {
    getAllPosts,
    getPostDetails,
    updateProduct,
    deletePost,
    // getProductReviews, 
    // deleteReview, 
    // createProductReview, 
    createPost,
    // getAdminProducts, 
    // getProducts, 
    // getHomeReviews, 
    // createContact 
} = require('../controllers/postController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const imageupload = require("../utils/lib/imageUpload");

const router = express.Router();

router.route('/posts').get(getAllPosts);
router.route('/post/:id').get(getPostDetails);
router.route('/admin/post/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePost);
router.route('/admin/post/new').post(isAuthenticatedUser, authorizeRoles("admin"), createPost); 

// router.post("/addstory" ,[isAuthenticatedUser, imageupload.single("image")],addStory)


// router.route('/products/all').get(getProducts);

// router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);




// router.route('/review').put(isAuthenticatedUser, createProductReview);
// router.route('/review').get(getHomeReviews);
// router.route('/admin/reviews')
//     .get(getProductReviews)
//     .delete(isAuthenticatedUser, deleteReview);

// router.route('/contact').post(createContact);

module.exports = router;
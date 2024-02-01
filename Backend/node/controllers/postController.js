const Post = require('../models/postModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products
exports.getAllPosts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const postsCount = await Post.countDocuments();

    const searchFeature = new SearchFeatures(Post.find(), req.query)
        .search()
        .filter();

    let posts = await searchFeature.query;
    let filteredPostsCount = posts.length;

    searchFeature.pagination(resultPerPage);

    posts = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        posts,
        postsCount,
        resultPerPage,
        filteredPostsCount
    });
});


// Get Product Details
exports.getPostDetails = asyncErrorHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    
    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }
    
    res.status(200).json({
        success: true,
        post
    });
});

// Create Product ---ADMIN
exports.createPost = asyncErrorHandler(async (req, res, next) => {
    try {
        
        let body = req.body;
        let user = req.user;

        
        let imageLink;
        
        try {
            const result = await cloudinary.v2.uploader.upload(body.image, {
                folder: 'posts',
            });
            console.log('Image uploaded to Cloudinary:', result);
            // Handle the result of the upload (e.g., store the returned image URL)
            imageLink = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }

        body.image = imageLink;
        body.user = user.id;

        const post = await Post.create(body);


        console.log('product created');

        res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        // console.error('Error creating post:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating post'
        });
    }
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    
    let body = req.body
    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    console.log('Reached', body);

    let word = /data:image/
    if (word.test(body.image)) {

        try {
            const result = await cloudinary.v2.uploader.destroy(post.image.public_id);
            // const result = await cloudinary.v2.uploader.upload(body.image, {
                //     folder: 'posts',
                // });
                console.log('Image deleted from Cloudinary:', result);
            // Handle the result of the upload (e.g., store the returned image URL)
            
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }

        try {
            // const result = await cloudinary.v2.uploader.destroy(post.image.public_id);
            const result = await cloudinary.v2.uploader.upload(body.image, {
                folder: 'posts',
            });
            console.log('Image uploaded Cloudinary:', result);
            // Handle the result of the upload (e.g., store the returned image URL)

            let imageLink = {
                public_id: result.public_id,
                url: result.secure_url,
            };

            body.image = imageLink
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    }

    body.user = req.user.id;
    
    post = await Post.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(201).json({
        success: true,
        post
    });
});

// Delete Product ---ADMIN
exports.deletePost = asyncErrorHandler(async (req, res, next) => {
    
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log('Post:', post);
        if (post) {
            try {
                const result = await cloudinary.v2.uploader.destroy(post.image.public_id);;
                console.log('Image deleted from Cloudinary:', result);
            } catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
            }
            const result = await Post.deleteOne({ _id: req.params.id })
            if (result.acknowledged) {
                res.status(201).json({
                    success: true
                });
            }
        } else {
            return next(new ErrorHandler("Product Not Found(Bachayi)", 404));
        }
    } catch (error) {
        return next(new ErrorHandler("Error While deleteing", 404));
    }

});


// // Get All Products ---ADMIN
// exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//         success: true,
//         products,
//     });
// })


// // Create OR Update Reviews
// exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

//     const { rating, comment, productId } = req.body;

//     const review = {
//         user: req.user._id,
//         product: req.body.productId,
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }
//     const isReviewed = await Review.countDocuments({ product: productId });

//     // const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

//     if (isReviewed) {
    
    //         const reviews = await Review.find({ product: productId, user: userId });
    //         reviews.forEach((rev) => {
        //             if (rev.user.toString() === req.user._id.toString())
//                 (rev.rating = rating, rev.comment = comment);
//         })
//         // product.reviews.forEach((rev) => { 
//         //     if (rev.user.toString() === req.user._id.toString())
//         //         (rev.rating = rating, rev.comment = comment);
//         // });
//     } else {
//         await Review.create(review);
//         product.numOfReviews = await Review.countDocuments({ product: productId })
//     }

//     let avg = 0;

//     const reviews = await Review.find({ product: productId })
//     reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     product.ratings = avg / reviews.length;

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true
//     });
// });

// // Get All Reviews of Product
// exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    //     const reviews = await Review.find({ product: req.query.id });
    
//     if (!reviews) {
//         return next(new ErrorHandler("Reviews Not Found", 404));
//     }

//     res.status(200).json({
    //         success: true,
    //         reviews: reviews
    //     });
    // });
    
    // // Get All Reviews of Product
    // exports.getHomeReviews = asyncErrorHandler(async (req, res, next) => {
        
        //     const reviews = await Review.find({ position: 'home' });

//     if (!reviews) {
    //         return next(new ErrorHandler("Reviews Not Found", 404));
    //     }
    
    //     res.status(200).json({
//         success: true,
//         reviews: reviews
//     });
// });
// // Delete Reveiws
// exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    //     await Review.findByIdAndDelete(req.query.id)
    //     let reviews = await Review.find({ product: req.query.productId });
    
//     if (!reviews) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     // reviews = reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

//     let avg = 0;

//     reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     let ratings = 0;

//     if (reviews.length === 0) {
    //         ratings = 0;
//     } else {
    //         ratings = avg / reviews.length;
    //     }

    //     const numOfReviews = reviews.length;
    
    //     await Product.findByIdAndUpdate(req.query.productId, {
        //         ratings: Number(ratings),
//         numOfReviews,
//     }, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });


//     res.status(200).json({
    //         success: true,
    //     });
// });


// // For Capturing Contact Info
// // Create Product ---ADMIN
// exports.createContact = asyncErrorHandler(async (req, res, next) => {
    
    //     // console.log('Working Contact\n', req.body);

//     const data = {
//         ...req.body
//     }
//     const contact = await Contact.create(data);

//     // console.log('Created!');

//     // console.log('Inside Create Product Near to res');
//     res.status(201).json({
    //         success: true,
    //         contact
    //     });
    // });
    
    
    // Get All Products ---Product Sliders
    // exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    //     const products = await Product.find();
    
    //     res.status(200).json({
    //         success: true,
    //         products,
    //     });
    // });
const SubImages = require("../models/subImagesModel");
const Category = require("../models/categoryModel");
const Color = require("../models/colorModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeture = require("../utils/apifeature");

//create product-->admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id;
    var subImages = null;
    
    if (req.body.subImages_id){
        subImages = await SubImages.create(req.body.subImages_id);
        req.body.subImages_id = subImages._id;
        await subImages.save()
    }
    const product = await Product.create(req.body);
    product.product_id = product._id;

    if (subImages){
        console.log(subImages)
        product.subImages = {
            subImages_id: subImages._id,
            product_subImages : subImages
        };
    }

    res.status(201).json({
        success:true,
        product
    })
});
//get all product
exports.getAllProducts =catchAsyncErrors(async(req,res)=>{
    const apifeature = new ApiFeture(Product.find(),req.query).search().filter();
    const products=await apifeature.query;
    res.status(200).json({
        success:true,
        products
    })
})
//get product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        
        return next(new ErrorHander("product not found",404));

        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }
    
    res.status(200).json({
        success:true,
        product
    })
})

//Update product -- admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product delete success fully"
    })
})


//testing route
// exports.getAllProducts =(req,res)=>{
//     res.status(200).json({message:"route is working fine"})
// }

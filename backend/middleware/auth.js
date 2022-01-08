const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHander("pls login to access this resourced",401))
    }
    const decodeData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodeData.id);
    next();

    //console.log(token);
})
exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHander(
            `Role:${req.user.role} is not allowed to access this resources`,403)
            );
        }
        next();
    };
};
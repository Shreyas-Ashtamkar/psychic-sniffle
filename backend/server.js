const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);

    console.log(`Shuttng down the server due to uncaughtException`);
    process.exit(1)

})
//config
dotenv.config({path:"config/config.env"})
//db
connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//console.log(youtube)
//unhandled Promise Rejection
process.on("unhandleRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shuttng down the server due to unhandled Promise Rejections`);
    server.close(()=>{
        process.exit(1);
    });
});
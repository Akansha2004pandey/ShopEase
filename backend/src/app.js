import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cartRouter from "./routes/cart.routes.js"
import productRouter from "./routes/product.routes.js"
import checkoutRouter from "./routes/checkout.routes.js"

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials:true

}))

//initially we had to use body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))
app.use(cookieParser());


// for files we use third party package multer
// when I have data from url then all use it
// routes import
app.get("/",(req,res)=>{
   res.send("hello world")
})

//routes declaration
//now we need middlewareWrapper
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/checkout", checkoutRouter);


// http://localhost:8000/users/register
export {app}
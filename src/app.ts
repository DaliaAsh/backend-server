import express from "express"; 
import categoriesRoutes from "./api/routes/categories"; 
import productsRoutes from "./api/routes/products"; 
import checkoutsRoutes from "./api/routes/checkouts"; 
import morgan from "morgan"; 
import bodyParser from "body-parser"; 
import mongoose from "mongoose"; 
const app = express(); 
try{
    mongoose.connect(`mongodb+srv://root:root@models.flbur.mongodb.net/Models?retryWrites=true&w=majority`,{
        useNewUrlParser:true ,
        useUnifiedTopology:true ,
        useCreateIndex: true,
    }); 

}catch(err){
    console.log(err); 
}
mongoose.Promise = global.Promise ; 

//middleware 
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 


//handle CORS origin errors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization'); 
    if(req.method === 'OPTIONS'){  
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET'); 
    return res.status(200).json({}); 
    }
    next(); 
})

//Routes 
app.use('/category',categoriesRoutes); 
app.use('/product',productsRoutes); 
app.use('/checkout',checkoutsRoutes); 
app.use((req,res,next)=>{
    const error = new Error("Not Found"); 
    next(error); 
    }); 
    
    app.use((error,req,res,next)=>{
    res.status(500); 
    res.json({
        error:{
            message:error.message
        }
    })
    });
export default app ;  
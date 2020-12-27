import express from "express";
import Category from "../models/category";
import multer from "multer"; 
const router = express.Router();
const storage = multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'./assets'); 
},filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname); 
}
}); 
const fileFilter = (req,file,cb) =>{
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true); 
}else{
    cb(null,false); 
}
}
const upload = multer({
  storage:storage,
  fileFilter:fileFilter
})
router.get('/', (req, res, next) => {
    Category.find().
        select('id name categoryImage').
        then((categories) => {
            console.log(categories);
            res.status(200).json({
                length: categories.length,
                categories: categories,
                request: {
                    method: 'GET',
                    action: 'Get All Categories'
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/',upload.single('categoryImage'), (req, res, next) => {
    const category = new Category({
        id: req.body.id,
        name: req.body.name ,
        categoryImage:req.file.path
    });
    category.save().
        then((category) => {
         
            res.status(201).json({
                category: {
                    name: category.name,
                    id: category.id ,
                    categoryImage:category.categoryImage
                },
                request: {
                    method: 'POST',
                    action: 'Create new Category'
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.get('/:id', (req, res, next) => {
    const categoryId = req.params.id;
    Category.find({ id: categoryId }).
        select('id name categoryImage').
        then((category) => {
            if (category) {
                res.status(200).json({
                    category: category,
                    request: {
                        method: 'GET',
                        action: 'Get one Category'
                    }
                });
            } else {
                res.status(500).json({ message: 'ID Not Found' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});
router.delete('/:id', (req, res, next) => {
    const categoryId = req.params.id;
    Category.remove({ id: categoryId }).
        then((category) => {
            res.status(200).json({
                category: {
                    name: category.name,
                    id: category.id
                },
                request: {
                    method: 'DELETE',
                    action: 'Delete One Category'
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});
router.delete('/', (req, res, next) => {

    Category.remove({}).
        then((result) => {
            res.status(200).json({ result: result });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});
router.put('/:id', (req, res, next) => {
    const categoryId = req.params.id;
    const props = {};
    for (let property of req.body) {
        props[property.propName] = property.value;
    }
    Category.updateOne({ id: categoryId }, { $set: props })
        .then((category) => {
           
            res.status(200).json({
                Updated_Category: {
                    name: category.name,
                    id: category.id ,
                   
                },
                request: {
                    method: 'PUT',
                    action: 'Update One Category'
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});




export default router; 
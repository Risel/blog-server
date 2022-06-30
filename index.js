import express from 'express';
import mongoose from 'mongoose'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import checkAuth from "./utils/checkAuth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import {create, getAll, getLastTags, getOne, remove, update} from "./controllers/PostController.js";
import multer from 'multer'
import cors from 'cors'
import handleValidationErrors from "./utils/handleValidationErrors.js";
import dotenv from 'dotenv';

dotenv.config();


mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=>console.log('db works'))
  .catch((err)=>console.log('db error', err))

const app = express();

const storage = multer.diskStorage({
  destination:(_,__,cb) => {
    cb(null,'uploads')
  },
  filename: (_,file,cb) => {
    cb(null,file.originalname)
  },
})

const upload = multer({storage});

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',loginValidation, handleValidationErrors, login);
app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.get('/auth/me',checkAuth, getMe);

app.post('/upload',checkAuth, upload.single('image'), (req,res)=>{
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get('/tags', getLastTags);

app.get('/posts', getAll);
app.get('/posts/tags',getLastTags)
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation,handleValidationErrors, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:ud',checkAuth,postCreateValidation,handleValidationErrors, update);


app.listen(process.env.PORT || 4444,(err)=>{
  if (err) {
    return console.log(err);
  } else {
    console.log("server works")
  }
})
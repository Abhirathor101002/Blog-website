const express = require('express');
const articleRouter = require("./routes/articles");
const mongoose = require('mongoose');
const app = express();
const methodOver=require('method-override')
const Article=require("./models/article")
mongoose.connect('mongodb://localhost/bharatinternDatabase')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.use(methodOver('_method'))
app.get('/',async(req,res)=>{

   const articles=await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{ articles: articles })

})


app.use('/articles', articleRouter);

app.listen(3000);
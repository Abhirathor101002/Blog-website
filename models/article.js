const mongoose=require("mongoose")
const {marked}=require('marked')
// const slugity=require('slugity')
const createDomPurify=require('dompurify')
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const dompurify = createDomPurify(window);

const articleSchema=new mongoose.Schema({
    title:{
    type:String,
    required:true
},
description:{
    type:String,

},
markdown:{
    type:String,
    required:true
},
createdAt:
{
    type:Date,
    default:Date.new
},
slug:{
    type:String,
    required:true,
    unique:true
},
sanitizedHTML:{
    type:String,
    required:true
}
})
articleSchema.pre('Validate',function(next){
    if(this.title){
        this.slug=slugity(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitizedHTML=dompurify.sanitize(marked(this.markdown))
    }
    next()
})
 module.exports=mongoose.model('Article',articleSchema)

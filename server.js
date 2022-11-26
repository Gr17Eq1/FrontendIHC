const express=require("express");
const path=require("path");
const app=express();
app.use(express.static('./dist/frontend-ihc'));
app.get('/*',(req,res)=>{
    res.sendFile('index.html',{root:'dist/frontend-ihc'})
});
app.listen(process.env.PORT || 4200);

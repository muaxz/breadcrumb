const express = require('express')
const cors = require("cors");
const path = require('path');
const fs = require("fs");
const app = express()
const port = 3001

app.use(cors({origin:"http://localhost:3000"}))


app.get("/:mypath",(req,res,next)=>{

    const {mypath} = req.params;
    const pathArray = mypath.split(",");
    
  
    fs.readdir(path.join(__dirname,...pathArray),(err,data)=>{
        console.log(path.join(__dirname,...pathArray));
        if(data != undefined){ //checking whether this is a file or a folder
           return res.json({state:"folder",data:data});
        }else{
           return res.json({state:"file",data:pathArray[pathArray.length-1]}) 
        }
    })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
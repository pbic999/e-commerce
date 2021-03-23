 const express = require('express');


const app = express();
 app.get('/api/products', (req,res) =>{
     res.send("jhjkg");
 })

 app.listen(5000, () => {
     console.log("Server is started");
 })
const express=require('express');

const app=express();
app.use(express.json());//parse JSON using express
app.use(express.urlencoded({extended:false}));
app.use('/api/users',require('./routes/api/users'));
app.get('/',(req,res)=>{
    res.send('Hello World');
});





app.listen(3000,()=>console.log('Listening on port 3000...'));
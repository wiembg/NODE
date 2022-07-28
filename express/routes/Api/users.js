const express=require('express');
const router=express.Router();
const uuid=require('uuid');
let users=require('../../users');
//crud operations for users.json file  tested with postman
// Get all users
router.get('/',(req,res)=>{
    res.json(users);
});
//
// Get single user
router.get('/:id',(req,res)=>{
const found=users.some(user=>user.id===parseInt(req.params.id));
if(found){
    res.json(users.filter(user=>user.id===parseInt(req.params.id)));
}else{
    res.status(400).json({msg:`No user with the id of ${req.params.id}`});
}
})
//create user
router.post('/',(req,res)=>{

    const { name, email} = req.body;
const newUser={
    id:uuid.v4(),//creating a unique ID
    name:req.body.name,
    email:req.body.email
}
if(!newUser.name||!newUser.email){
    return res.status(400).json({msg:'Please include a name and email'});
}//if the name or email is not included in the request, it will return a 400 status code and a message
//if name is found then error message will be displayed






users.push(newUser);
res.json(users);
}); 
//update user
router.put('/:id',(req,res)=>{
    const found=users.some(user=>user.id===parseInt(req.params.id));
if (found){
        const updateUser=req.body;
        users.forEach(user=>{
            if(user.id===parseInt(req.params.id)){
                user.name=updateUser.name?updateUser.name:user.name;
                user.email=updateUser.email?updateUser.email:user.email;
                res.json({msg:'User updated',user});
            }
            
});
 }
else{
    res.status(400).json({msg:`No user with the id of ${req.params.id}`});
}
});

//delete user
router.delete('/:id',(req,res)=>{
    const found=users.some(user=>user.id===parseInt(req.params.id));
if (found){
    res.json({msg:'User deleted',users:users.filter(user=>user.id!==parseInt(req.params.id))});
}
else{
    res.status(400).json({msg:`No user with the id of ${req.params.id}`});
}
}
);
module.exports=router;
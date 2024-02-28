const exp=require("express");
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require("jsonwebtoken")

const multerObj=require("./middleware/cloudinaryConfig")

userApp.get('/get-users',expressAsyncHandler(async(response,request)=>{
    const hmsUsersCollectionObj=request.app.get("hmsUsersCollectionObj")

    let usersList=await hmsUsersCollectionObj.find().toArray()
    response.statusCode(201).send({message:"all users",payload:usersList})

}));

userApp.get('/get-user/:username',expressAsyncHandler(async(response,request)=>{
    const hmsUsersCollectionObj=request.app.get("hmsUsersCollectionObj")
    let usernameFromUrl=request.params.username
    let userOfDB=await hmsUsersCollectionObj.findOne({username:usernameFromUrl})
    if(userOfDB===null){
        response.status(201).send({message:"user not found"})

    }
    else{
        delete userOfDB.password
        response.status(201).send({message:"user",payload:userOfDB})
    }

}))



userApp.use(exp.json())
userApp.post('/create-user',multerObj.single('photo'),expressAsyncHandler(async (request,response)=>{
    const hmsUsersCollectionObj=request.app.get("hmsUsersCollectionObj")
    const newUser=JSON.parse(request.body.user);
    console.log("Received request body:",newUser);

    const userOfDB=await hmsUsersCollectionObj.findOne({username:newUser.username})
    console.log(userOfDB)
    if(userOfDB!=null){
        response.status(200).send({message:"user already existed"})

    }
    else{
        newUser.image=request.file.path;
        let hashedpassword=await bcryptjs.hash(newUser.password,5)
        newUser.password=hashedpassword
        await hmsUsersCollectionObj.insertOne(newUser)
        response.status(201).send({message:"user created"})
        console.log(hashedpassword)
    }
}));


userApp.post('/user-login',expressAsyncHandler( async (request,response)=>{
    const hmsUsersCollectionObj=request.app.get('hmsUsersCollectionObj')
    const userCredentials=request.body;
  
    const userOfDB=await hmsUsersCollectionObj.findOne({username:userCredentials.username})
    if(userOfDB===null){
        response.status(200).send({message:"invalid username"})
    }
    else{
        let isValidpassword=await bcryptjs.compare(userCredentials.password,userOfDB.password)
        if(isValidpassword===false){
            response.status(200).send({message:"invalid password"})

        }
        else{
            let jwtToken=jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:120})
            delete userOfDB.password;
            response.send({message:"success",token:jwtToken,user:userOfDB})
            console.log(request.headers)
        }
    }
}))


userApp.delete('/delete-user/:id',expressAsyncHandler(async(request,response)=>{
    const hmsUsersCollectionObj=request.app.get("hmsUsersCollectionObj")
    let userId=(+request.params.id)
    await hmsUsersCollectionObj.deleteOne({id:userId})
    response.status(201).send({message:"user deleted"})

}))

module.exports=userApp;
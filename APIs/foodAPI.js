const exp=require("express");
const foodApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
    

const multerObj=require("./middleware/cloudinaryConfig")  

foodApp.use(exp.json())
foodApp.post('/create-food',multerObj.single('photo'),expressAsyncHandler(async (request,response)=>{
    const foodCollectionObj=request.app.get("foodCollectionObj")
    const newItem=JSON.parse(request.body.user);
    console.log("Received request body:",newItem);

    const itemOfDB=await foodCollectionObj.findOne({foodname:newItem.foodname})
    console.log(itemOfDB)
    if(itemOfDB!=null){
        response.status(200).send({message:"item already existed"})

    }
    else{
        newItem.image=request.file.path;
        await foodCollectionObj.insertOne(newItem)
        response.status(201).send({message:"food item added"})
    } 
}));

foodApp.get('/get-food',expressAsyncHandler(async(request,response)=>{
    const foodCollectionObj=request.app.get("foodCollectionObj")

    let foodList=await foodCollectionObj.find().toArray()
    response.status(201).send({message:"all items",payload:foodList})

}));


foodApp.get('/get-foods/:id',expressAsyncHandler(async(request,response)=>{
    const foodCollectionObj=request.app.get("foodCollectionObj")
    let idFromUrl=request.params.id
    let itemOfDB=await foodCollectionObj.findOne({id:idFromUrl})
    
        response.status(201).send({message:"item",payload:itemOfDB})
    

}))



module.exports=foodApp;
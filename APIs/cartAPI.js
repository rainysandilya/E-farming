const exp=require("express");
const cartApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')

//const multerObj=require("./middleware/cloudinaryConfig")  

cartApp.use(exp.json())

cartApp.post('/add-item',expressAsyncHandler(async (request,response)=>{
    const cartCollectionObj=request.app.get("cartCollectionObj")
    const newItem=request.body;
    newItem.quantity=1;
    console.log("Received request body:",newItem);
        await cartCollectionObj.insertOne(newItem)
        response.status(201).send({message:" item added to cart"})
    
}));

cartApp.get('/get-cart',expressAsyncHandler(async(request,response)=>{
    const cartCollectionObj=request.app.get("cartCollectionObj")

    let cartList=await cartCollectionObj.find().toArray()
    response.status(201).send({message:"all items",payload:cartList})

}));


cartApp.use(exp.json())


cartApp.put('/update-cart',expressAsyncHandler(async (request, response) => {
    const cartCollectionObj=request.app.get("cartCollectionObj")
    const modifiedObj=request.body
    console.log(modifiedObj);
    await cartCollectionObj.updateOne({_id:modifiedObj._id},{$set:{quantity:modifiedObj.quantity}})
    response.status(201).send({message:"cart updated"})}
));

cartApp.delete('/delete-cart/:id', expressAsyncHandler(async (request, response) => {
    const cartCollectionObj = request.app.get("cartCollectionObj");
    const itemId = request.body; 
    console.log(request.body)// Extracting the item ID from URL params
    await cartCollectionObj.deleteOne( itemId );
    response.status(201).send({ message: "item deleted"});

}));

module.exports=cartApp;

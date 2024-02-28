const exp=require("express")
const app=exp();``

let cors=require('cors')
app.use(cors())

app.listen(3500,()=>console.log("server is listening on port number 3500"));

const path=require("path");
app.use(exp.static(path.join(__dirname,'./build')))

const mclient=require('mongodb').MongoClient;

mclient.connect('mongodb://127.0.0.1:27017').then((dbRef)=>
{
    const dbObj=dbRef.db('chandu');

    const foodCollectionObj=dbObj.collection('foodCollection')

    const hmsUsersCollectionObj=dbObj.collection('hmsUsersCollection')

    const cartCollectionObj=dbObj.collection('cartCollection')

    app.set("foodCollectionObj",foodCollectionObj)
    app.set('hmsUsersCollectionObj',hmsUsersCollectionObj)
    app.set("cartCollectionObj",cartCollectionObj)

    console.log("database connection is successful")
})
.catch(err=>console.log("database connect error: ",err))

const userApp=require("./APIs/userAPI")
app.use('/user-api',userApp)

const foodApp=require("./APIs/foodAPI")
app.use('/food-api',foodApp)

const cartApp=require("./APIs/cartAPI")
app.use('/cart-api',cartApp)


app.use((err,request,response,next)=>{
    response.send({message:err.message || 'An error occured'});
});
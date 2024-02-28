import React ,{useEffect,useState}from 'react'
import './Menu.css'
import { useContext } from 'react'
import axios from 'axios'
import { loginContext } from '../contexts/loginContext'
function Menu() {                  
let [dessertItem,setDessertItem]=useState([])
let [biryaniItem,setBiryani]=useState([])
let [nonvegStarterItem,setNonvegStarterItem]=useState([])
let [vegStarterItem,setVegStarterItem]=useState([])
let [soupItem,setSoupItem]=useState([])

let [currentUser]=useContext(loginContext)

let tempbiryaniItem=[]
let tempdessertItem=[]
let tempmocktailItem=[]
let tempnonvegStarterItem=[]
let tempvegStarterItem=[]
let tempsoupItem=[]

let [err,setErr]=useState("")

let addToCart=function(foodObj){
  foodObj.quantity=1;
  axios.post("http://localhost:3500/cart-api/add-item",foodObj).then(response=>{
    if(response.status===201){
     console.log(response)
     }
     
}).catch(err=>{

})
}


let getUser=()=>{
  axios.get("http://localhost:3500/food-api/get-food").then(response=>{
    
      if(response.status===201){
          console.log(response.data.payload)
          
        for(let item of response.data.payload){
          if(item.foodtype==="biryani"){
            tempbiryaniItem.push(item)
            console.log(item);
          }
          else if(item.foodtype==="non-veg-starters"){
            console.log(item);
            tempnonvegStarterItem.push(item)
          }
          else if(item.foodtype==="veg-starters"){
            console.log(item);
            tempvegStarterItem.push(item)
          }
          else if(item.foodtype==="desserts"){
            console.log(item);
            tempdessertItem.push(item)
          }
          else if(item.foodtype==="mock-tails"){
            console.log(item);
            tempmocktailItem.push(item)
          }
          else if(item.foodtype==="soups"){
            console.log(item);
            tempsoupItem.push(item)
          }
          
          
        }


        setBiryani(tempbiryaniItem)
        setDessertItem(tempdessertItem)
       
        setNonvegStarterItem(tempnonvegStarterItem)
        setSoupItem(tempsoupItem)
        setVegStarterItem(tempvegStarterItem)
        
      }
  }).catch(err=>{
      setErr(err.message)
  })
}

useEffect(()=>{
      getUser();
      
},[biryaniItem,nonvegStarterItem,vegStarterItem,soupItem])



  return (
    <div className='container'>
       <p className='text-success fs-1 mt-3 '>Items</p>
       <p className='text-warning fs-3 mt-3 '>Vegetables</p>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
      {nonvegStarterItem.map(foodObj=><div className='col' key={foodObj.id}>
        <div className='card shadow mt-5'>
        <img className="menu-item d-block mx-auto w-100" src={foodObj.image} />
          <div className='card-body'>
          
            <p className='text-secondary fs-3 text-center'>{foodObj.foodname}</p>
            <p className='text-secondary fs-3 text-center'>{foodObj.foodcost}</p>
            {currentUser.usertype==='user' && 
            <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> 
          }
          </div>
        </div>
        
      </div>)}
  </div>


      <p className='text-warning fs-3 mt-3 '>Fruits</p>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3'> 
      {vegStarterItem.map(foodObj=><div className='col' key={foodObj.id}>
        <div className='card shadow mt-5'>
        <img className="menu-item d-block mx-auto w-100" src={foodObj.image} />
          <div className='card-body'>
          
            <p className='text-secondary fs-3 text-center'>{foodObj.foodname}</p>
            <p className='text-secondary fs-3 text-center'>{foodObj.foodcost}</p>
            {/* <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> */}
            {currentUser.usertype==='user' && 
            <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> 
          }
          </div>
        </div>
        
      </div>)}
        </div>


      <p className='text-warning fs-3 mt-3 '>Grains</p>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3'>
      
      {soupItem.map(foodObj=><div className='col' key={foodObj.id}>
        <div className='card shadow mt-5'>
        <img className="menu-item d-block mx-auto w-100" src={foodObj.image} />
          <div className='card-body'>
          
            <p className='text-secondary fs-3 text-center'>{foodObj.foodname}</p>
            <p className='text-secondary fs-3 text-center'>{foodObj.foodcost}</p>
            {/* <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> */}
            {currentUser.usertype==='user' && 
            <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> 
          }
          </div>
        </div>
        
      </div>)}
        

      </div>
      <p className='text-warning fs-3 mt-2 '>Pulses</p>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3'>
      
      {biryaniItem.map(foodObj=><div className='col'key={foodObj.id}>
        <div className='card shadow mt-5'>
        <img className="menu-item d-block mx-auto w-100" src={foodObj.image} />
          <div className='card-body'>
          
            <p className='text-secondary fs-3 text-center'>{foodObj.foodname}</p>
            <p className='text-secondary fs-3 text-center'>{foodObj.foodcost}</p>
            {/* <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> */}
            {currentUser.usertype==='user' && 
            <button className='btn btn-success' onClick={() => addToCart(foodObj)}>add to cart</button> 
          }
          </div>
        </div>
        
      </div>)}
        

      </div>
     
        

        </div>
  )
}

export default Menu 
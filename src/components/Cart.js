import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Cart.css'


function Cart() {

    let [err,setErr]=useState("")
    let [users,setUsers]=useState([])
    //let [counter,setCounter]=useState(1)
    let [counters,setCounters]=useState({})

    let getCart=()=>{
        axios.get("http://localhost:3500/cart-api/get-cart").then(response=>{
        if(response.status===201){
            console.log(response.data.payload)
            setUsers(response.data.payload)
            const initialCounters = {};
                response.data.payload.forEach(userObj => {
                    initialCounters[userObj.id] = userObj.quantity ;});
                    setCounters(initialCounters);
        }

    }).catch(err=>{
        setErr(err.message)

    })
    }
useEffect(()=>{
    getCart();  
    console.log("pandi")
},[])




let increment=(userObj)=>{
    setCounters(prevCounters => ({
        ...prevCounters,
        [userObj.id]: (prevCounters[userObj.id]) + 1
    }));

    userObj.quantity = counters[userObj.id];
    //setCounter(counter+1)
    //userObj.quantity=counter
    

    axios.put("http://localhost:3500/cart-api/update-cart",userObj).then(res=>{
       
    }).catch(err=>{

    })

   


    
}

let decrement=(userObj)=>{

    if (counters[userObj.id] > 1) {
        setCounters(prevCounters => ({
            ...prevCounters,
            [userObj.id]: (prevCounters[userObj.id] ) - 1
        }))
        

        userObj.quantity = counters[userObj.id];
    


    axios.put("http://localhost:3500/cart-api/update-cart",userObj).then(res=>{
        
    
                    
    }).catch(err=>{
        
    })}
    else{
        axios.delete(`http://localhost:3500/cart-api/delete-cart/${userObj.id}`).then(res=>{
            
            getCart();
            

    }).catch(err=>{
        
    })
    }

}

  return (
    <div className='container'>
        <h1 className='text-center text-success mt-3 fs-2'>Your cart</h1>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3'>
            
            {users?.map(userObj=><div key={userObj.id}>
                <div className='card shadow mt-3'>
                    <img src={userObj.image} className='menu-item d-block mx-auto w-100'/>
                    <div className='card-body'>
                        <p className='text-secondary fs-3 text-center'>{userObj.foodname}</p>
                        <p className='text-secondary fs-3 text-center'>{userObj.foodcost}</p>
                        <div className='d-flex flex-row'>
                            <button className='btn btn-warning increment' onClick={()=>increment(userObj)}>+</button>
                            <p className='fs-3'>{userObj.quantity }</p>
                            <button className='btn btn-warning decrement' onClick={()=>decrement(userObj)}>-</button>
                        </div>
                        <button className='btn btn-warning btn-center mt-2'>Buy Now</button>
                    </div>
                </div>

            </div>
                

            )}

        </div>
        
    </div>
  )
}

export default Cart 



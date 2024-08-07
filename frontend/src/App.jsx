import React, { useEffect, useState } from 'react'
import Layout from './router/Layout'
import SummarApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'


const App = () => {

  const dispatch = useDispatch()

  const [cartProductCount,setCartProductCount]= useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummarApi.current_user.url, {
      method: SummarApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

 

  const fetchUserAddToCart = async() =>{
    const dataResponse = await fetch(SummarApi.countAddToCart.url, {
      method: SummarApi.countAddToCart.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()

   setCartProductCount(dataApi?.data?.count)
  }


  useEffect(() => {

    //  user details
    fetchUserDetails()

// user details cart product

    fetchUserAddToCart()
  }, [])

  return (
    <Context.Provider value={{
      fetchUserDetails,   //user details fetch
      cartProductCount , // current user add to cart product
      fetchUserAddToCart
    }}>
    <Layout  />
    </Context.Provider>
  )
}

export default App

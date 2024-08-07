import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
   <CategoryList />
   <BannerProduct />
   <HorizontalCardProduct category={"airpods"} heading={"Popular Airpodes"} />
   <HorizontalCardProduct category={"earphones"} heading={"Earphones"} />
   <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
   <VerticalCardProduct category={"watches"} heading={"Watches"} />
    </div>
  )
}

export default Home

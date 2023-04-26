import React from 'react'
import Checkout from '../components/Checkout/Checkout'
import Footer from '../components/Footer/Footer'
import CommonLayout from './CommonLayout'

const CheckOutPage = () => {
  return (
    <>
    <CommonLayout>
        <Checkout/>
        <Footer/>
    </CommonLayout>

    </>
  )
}

export default CheckOutPage
import React from 'react'
import Footer from '../components/Footer/Footer'
import RegistationForm from '../components/RegistationLogin/RegistationForm'
import CommonLayout from './CommonLayout'

const SignUpPage = () => {
  return (
    <>
    <CommonLayout>
        <RegistationForm/>
        <Footer/>
    </CommonLayout>

    </>
  )
}

export default SignUpPage
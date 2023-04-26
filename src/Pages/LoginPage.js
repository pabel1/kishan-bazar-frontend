import React from 'react'
import Footer from '../components/Footer/Footer'
import LoginForm from '../components/RegistationLogin/LoginForm'
import CommonLayout from './CommonLayout'

const LoginPage = () => {
  return (
    <>
    <CommonLayout>
        <LoginForm/>
        <Footer/>
    </CommonLayout>

    </>
  )
}

export default LoginPage
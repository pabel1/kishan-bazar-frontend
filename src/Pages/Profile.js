import React from 'react'
import MyProfile from '../components/Admin/users/MyProfile'
import Footer from '../components/Footer/Footer'
import CommonLayout from './CommonLayout'

const Profile = () => {
  return (
    <>
    <CommonLayout>
        <MyProfile/>
        <Footer/>
    </CommonLayout>

    </>
  )
}

export default Profile

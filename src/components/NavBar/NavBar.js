import React,{useContext, useEffect, useState} from 'react'
import { getMyProfileAPI } from '../../api/userApi';
import { UserContext } from '../../context';
import BottomNav from './BottomNav'
import UperNav from './UperNav'

const NavBar = () => {
    const { userState, setUserState } = useContext(UserContext);
  // getting usesDetails
  useEffect(() => {
    const getProfile = async () => {
      const res = await getMyProfileAPI(); // api call
      if (res && res.status === 200) {
        setUserState({ ...userState, user: res.data.user, isLogin: true });
      }
    };
    getProfile();
  }, []);
  return (
    <div className="sticky top-0 left-0 right-0 z-[1000]">
        <UperNav/>
        <BottomNav/>
    </div>
  )
}

export default NavBar
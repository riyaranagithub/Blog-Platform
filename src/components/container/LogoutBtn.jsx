import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'

function LogoutBtn() {
const dispatch=useDispatch()
const handleLogout=()=>{
   authService.logout().then(()=>{
       dispatch(logOut())
   })
}
  return (
    <button onClick={handleLogout}>LogoutBtn</button>
  )
}

export default LogoutBtn
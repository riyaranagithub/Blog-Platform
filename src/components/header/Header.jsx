import React from 'react'
import {Container, LogoutBtn} from "../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state)=>state.auth.status)  //false
  const navigate= useNavigate()
  const navItems=[
    {
      name:"Home",
      url:"/",
      active:true
    },
    {
      name:"Login",
      url:"/login",
      active:!authStatus
    },
    {
      name:"Singup",
      url:"/signup",
      active:!authStatus
    },
    {
      name:"ALL Posts",
      url:"/allpost",
      active:authStatus
    },
    {
      name:"Add Post",
      url:"/addPost",
      active:authStatus
    }
  ]
  return (
   <Header>
    <Container>
      <nav>
        <ul className='flex ml-auto'>
          {navItems.map((item)=>{
            item.active? (
              <li key={item.name}>
                <button onClick={()=>navigate(item.url)}>
                  {item.name}
                </button>
              </li>
            ):null
          })}
        </ul>
        {authStatus && (
          <li>
              <LogoutBtn/>
          </li>
        )}
      </nav>
    </Container>
   </Header>
  )
}


export default Header


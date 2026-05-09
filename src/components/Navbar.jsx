import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-around font-bold text-[1.5rem] '>
      <NavLink to={"/"}
      className={({ isActive }) => isActive ? 'active-link' : 'link'}>
        Home
      </NavLink>

      <NavLink to={"/pastes"}
      className={({ isActive }) => isActive ? 'active-link' : 'link'}>
        Pastes
      </NavLink>

    </div>
  )
}

export default Navbar

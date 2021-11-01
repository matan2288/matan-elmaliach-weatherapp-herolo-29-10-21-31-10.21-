import React from 'react'
import './NavbarStyle.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
   return (
      <div className="navbar-maindiv">

         <div className="navlinks-container">
           <Link to="/" className="nav-link">
               
                <span id='house-icon'> ⌂</span>
           </Link>
           <Link to="/FavoriteLocations" className="nav-link">
           <span id='heart-icon'>♡</span>
           </Link>
      
         </div>

      
      </div>
   )
}

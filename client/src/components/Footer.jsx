import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <h3>ETHIO<span>FLIX</span></h3>

      <div className='footer-links'>
        <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/tvshows">TV-SHOW</Link></li>
            <li><Link to="/movies">MOVIES</Link></li>
            <li><Link to="/search">SEARCH</Link></li>
        </ul> 
      </div>
    </footer>
  )
}

export default Footer

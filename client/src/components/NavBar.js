import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const NavBar = (props) => {

  // eslint-disable-next-line
  const location = useLocation()
  

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/#" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <strong>UpToTheTop</strong>
        </a>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav ml-auto">
          { authService.isAuthenticated() === false ?                                                                                                                                 
          (
              <Link className="nav-link" to={'/signin'}>Login</Link>) : ''}
           
         
           { authService.isAuthenticated() === false ?                                                                                                                                 
          (
               <Link className="nav-link" to={'/register'}>Register</Link>) : ''}
         
          
            
            { authService.isAuthenticated() === true ? (
           <li className="nav-item dropdown">
              {/* eslint-disable-next-line */}
              <a className="nav-link dropdown-toggle" href="/#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome {props.email}</a>
              <div className="dropdown-menu" aria-labelledby="dropdown07">
                <Link className="dropdown-item" to={'/signout'}>SignOut</Link>
              </div>
            </li>) : ''}
          </ul>
        </div>
      </div>
    </nav>
    )
}
 
export default NavBar;
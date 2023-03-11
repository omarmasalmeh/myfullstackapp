import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from './components/Register';
import EditForm from './components/EditForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import Details from './components/Details'; 
import './css/app.css';
import CreateForm from './components/CreateForm';
import authService from './services/authService';





const App = () => {
  
  const myToken = authService.token()
  // eslint-disable-next-line
  
    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
  }


  let currentEmail =[]
      if (myToken) {
      let savedToken = parseJwt(myToken)
       currentEmail.push(savedToken.email)
      }


      return (
        <React.Fragment>
          <BrowserRouter>
          <NavBar email={currentEmail[0]}/>
          <div id="main-content">
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signout' element={<SignOut />} />
              <Route path='/register' element={<Register />} />
              <Route element={<ProtectedRoutes/>}>
                  <Route path='/products/create' element={<CreateForm />} />
                  <Route path="/products/edit/:productId" element={<EditForm/>} />
                  <Route path='/products/details/:productId' element={<Details />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          </BrowserRouter>
        </React.Fragment>
      );
    }

    const NotFound = () => {

      return <h1>Page Not Found</h1>

    }
  

  

export default App;

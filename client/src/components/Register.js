import React, { useState } from 'react';
import '../css/signin.css';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';


const Register = (props) => {

    //defining state using hooks
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //using the navigate hook
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault() //prevent the form from doing a browser submit

        authService.register({firstName, lastName, email, password}, registerSuccess => {
            if (registerSuccess) {
                navigate('/')
            } else {
                console.log('UNSECCESSFULLY REGISTERED')
            }
        })
    }


    return ( 
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                Register New User
            </h1>
            <label htmlFor="inputFirstName" className="sr-only">
                First Name
            </label>
            <input type="text" id="inputFirstName" name='firstName' onChange={ e => setFirstName(e.target.value) } className="form-control" placeholder="First Name" required autoFocus />
            <label htmlFor="inputLastName" className="sr-only">
                Last Name
            </label>
            <input type="text" id="inputLastName" name='lastName' onChange={ e => setLastName(e.target.value) } className="form-control" placeholder="Last Name" required  />
            <label htmlFor="inputEmail" className="sr-only">
                Email address
            </label>
            <input type="email" id="inputEmail" name='email' onChange={ e => setEmail(e.target.value) } className="form-control" placeholder="Email address" required  />
            <label htmlFor="inputPassword" className="sr-only">
                Password
            </label>
            <input type="password" id="inputPassword" name='password' onChange={ e => setPassword(e.target.value) } className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
     );
}
 
export default Register;
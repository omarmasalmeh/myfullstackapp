import axios from "axios";


class authService {

    signin(credentials, callback){
        //post the form data to the API for auth
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, credentials)
            .then(response => {
                if(response.status === 200){
                    localStorage.setItem('x-auth-token', response.headers['x-auth-token'])
                    //excute the callback
                     callback(null)
                }
            })
            .catch(error => {
                callback(error.response)
            })
    }

    register(credentials, callback){

         //post the form data to the API for auth
         axios.post(`${process.env.REACT_APP_API_URL}/users/register`, credentials)
         .then(response => {
             if(response.status === 201){
                 localStorage.setItem('x-auth-token', response.headers['x-auth-token'])
                 callback(true)
             }
         })
         .catch(error => {
            console.log(error.response)
            callback(false)
        })

    }


    isAuthenticated(){
        return localStorage.getItem('x-auth-token') !== null
    }

    token(){
        return localStorage.getItem('x-auth-token')
    }

    signout(){
        return localStorage.removeItem('x-auth-token')
    }

}

export default new authService()
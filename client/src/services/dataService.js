import axios from "axios"



class dataService {

    getProducts(callback){
         //call api data here...fetch or axios
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
    .then(response => {
            callback(response.data)
    })
    }

    getOneProduct(id, callback){
        axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then(response => {
                console.log(response.data)
                callback(response.data)
        })
    }


    createProduct( info, callback){
        const token = localStorage.getItem('x-auth-token')
         //post the form data to the API
         axios.post(`${process.env.REACT_APP_API_URL}/products/`, info, {
            headers: {
              'x-auth-token' : token
            }}).then(response => {
             if(response.status === 201){
                 callback(null)
             }
         }).catch(error => {
            console.log(error.response)
            callback(error.response)
        })
     
    }

    

    updataProduct(id, info, callback){
        const token = localStorage.getItem('x-auth-token')
         //post the form data to the API
         axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, info, {
            headers: {
              'x-auth-token' : token
            }})
         .then(response => {
            if(response.status === 200){
                callback(null)
            }
        })
        .catch(error => {
           console.log(error.response)
           callback(error.response)
       })
    }

    

    deleteProduct(id, callback){

        const token = localStorage.getItem('x-auth-token')
        //post the form data to the API
        axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
           headers: {
             'x-auth-token' : token
           }}).then(response => {
            if(response.status === 200){
                callback(null)
            }
        })
        .catch(error => {
           console.log(error.response)
           callback(error.response)
       })
           
    }

}

export default new dataService()
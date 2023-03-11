import React, { useState } from 'react';
import '../css/signin.css';
import { useNavigate, Link } from 'react-router-dom';
import dataService from '../services/dataService';


const CreateForm = (props) => {

    //defining state using hooks
    const [product_name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [pictures, setPictures] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(
        {
            rank: '',
            score: ''
        }
    );
    const [errors, setErrors] = useState({});

 
    

    const updateRating = (event) => {
        const ratingCopy =  {...rating}
        ratingCopy[event.target.name] = event.target.value 
        setRating(ratingCopy)
    }

   
    
    

    //using the navigate hook
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault() //prevent the form from doing a browser submit
         //reset validation messages
         setErrors({})

       const data =  {product_name, price, pictures, description, rating}
       
        dataService.createProduct( data, error => {
            if (!error) {
               
                navigate('/')
             
            } else {
                console.log(error)
                if (error.status === 422) {
                    //store any validation errors in state
                    setErrors(error.data.errors)
                } else if (error.status === 401) {
                    setErrors(error.data)
                }
            }
        })
    }


    return ( 
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                Create New Product
            </h1>
            <label htmlFor="inputProductName" className="sr-only">
                 Product Name
            </label>
            <input type="text" id="inputProductName" name='productName' onChange={ e => setProductName(e.target.value) } className="form-control mb-3" placeholder="Product Name"  autoFocus />
            {
                errors.product_name && <div className='alert alert-danger' >{ errors.product_name.message }</div>
            }
            <label htmlFor="inputPrice" className="sr-only">
                Price
            </label>
            <input type="text" id="inputPrice" name='price' onChange={ e => setPrice(e.target.value) } className="form-control mb-3" placeholder="Price"   />
            {
                errors.price && <div className='alert alert-danger' >{ errors.price.message }</div>
            }
            <label htmlFor="inputPicture" className="sr-only">
                Picture
            </label>
            <input type="text" id="inputPicture" name='picture' onChange={ e => setPictures(e.target.value) } className="form-control mb-3" placeholder="Picture URL"   />
            {
                errors.pictures && <div className='alert alert-danger' >{ errors.pictures.message }</div>
            }
            <label htmlFor="descriptionTextarea1">Description</label>
                <textarea className="form-control mb-3" id="descriptionTextarea1" onChange={ e => setDescription(e.target.value) } rows="3" ></textarea>
            {
                errors.description && <div className='alert alert-danger' >{ errors.description.message }</div>
            }
            <label htmlFor="inputRate" className="sr-only">
                Rate
            </label>
            <input type="text" id="inputRate" name='rank' onChange={ e => updateRating(e) } className="form-control mb-3" placeholder="Rate out of 5"  />
           
            <label htmlFor="inputRank" className="sr-only">
                Rank 
            </label>
            <input type="text" id="inputRank" name='score' onChange={ e => updateRating(e) } className="form-control mb-3" placeholder="Product Rank # in Sales"  />
            
            <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
            <Link className="btn btn-lg btn-secondary btn-block" to={'/'}> Return</Link>
        </form>
     );
}
 
export default CreateForm;
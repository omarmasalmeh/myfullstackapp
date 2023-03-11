import React, { useState, useEffect } from 'react';
import '../css/signin.css';
import { useNavigate, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import { useParams } from 'react-router-dom';

const EditForm = () => {

    const { productId } = useParams();
    const [products, setProducts] = useState([])

    //defining state using hooks
    const [product_name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [pictures, setPictures] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState({
        rank: '',
        score: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        //Get data
        dataService.getOneProduct(productId, product => {
            console.log(product)
            setProducts(product);
            setProductName(product.product_name)
            setPrice(product.price)
            setPictures(product.pictures)
            setDescription(product.description)
            setRating(product.rating)
        })
        // eslint-disable-next-line 
    }, [])

    //using the navigate hook
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault() //prevent the form from doing a browser submit
        //reset validation messages
        setErrors({})
        const data = { product_name, price, pictures, description, rating }
        dataService.updataProduct(productId, data, error => {
            if (!error) {
                console.log(products)
                navigate('/')
            } else {
                if (error.status === 422) {
                    //store any validation errors in state
                    setErrors(error.data.errors)
                } else if (error.status === 401) {
                    setErrors(error.data)
                }
            }
        })
    }

    const updateRating = (event) => {
        const ratingCopy = { ...rating }
        ratingCopy[event.target.name] = event.target.value
        setRating(ratingCopy)
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                Edit Product
            </h1>
            <label htmlFor="inputProductName" >
                Product Name
            </label>
            <input type="text" id="inputProductName" name='productName' value={product_name} onChange={e => setProductName(e.target.value)} className="form-control mb-3" placeholder="Product Name" />
            {
                errors.product_name && <div className='alert alert-danger' >{errors.product_name.message}</div>
            }
            <label htmlFor="inputPrice">
                Price
            </label>
            <input type="text" id="inputPrice" name='Price' value={price} onChange={e => setPrice(e.target.value)} className="form-control mb-3" placeholder="Price" />
            {
                errors.price && <div className='alert alert-danger' >{errors.price.message}</div>
            }
            <label htmlFor="inputPicture" >
                Picture
            </label>
            <input type="text" id="inputPicture" name='picture' value={pictures} onChange={e => setPictures(e.target.value)} className="form-control mb-3" placeholder="Picture URL" />
            {
                errors.pictures && <div className='alert alert-danger' >{errors.pictures.message}</div>
            }
            <label htmlFor="descriptionTextarea1">Description</label>
            <textarea className="form-control mb-3" id="descriptionTextarea1" value={description} onChange={e => setDescription(e.target.value)} rows="3" ></textarea>
            {
                errors.description && <div className='alert alert-danger' >{errors.description.message}</div>
            }
            <label htmlFor="inputRate" >
                Rate
            </label>
            <input type="text" id="inputRate" name='rank' value={rating?.rank} onChange={e => updateRating(e)} className="form-control mb-3" placeholder="Rate out of 5" />
            <label htmlFor="inputRank" >
                Rank
            </label>
            <input type="text" id="inputRank" name='score' value={rating?.score} onChange={e => updateRating(e)} className="form-control mb-3" placeholder="Product Rank # in Sales" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            <Link className="btn btn-lg btn-secondary btn-block" to={'/'}> Return</Link>
        </form>
    );
}

export default EditForm;
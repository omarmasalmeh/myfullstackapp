import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataService from '../services/dataService';
import { Link } from 'react-router-dom';

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    dataService.getOneProduct(productId, (product) => {
      setProduct(product);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">{product.product_name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img className="img-fluid" src={product.pictures} alt={product.product_name} />
        </div>
        <div className="col-md-6">
          <p className="lead">{product.description}</p>
          <p className="lead">{product.price}</p>
          <Link className="btn btn-primary mt-1" to="/">Return Home</Link>
        </div>
       
      </div>
    </div>
  );
};

export default Details;

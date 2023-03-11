import React, { useState, useEffect } from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';
import authService from '../services/authService';
import { Link, useLocation } from 'react-router-dom';

const Main = (props) => {
   // eslint-disable-next-line
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //Get data
    dataService.getProducts(products => {
      setProducts(products);
    });
  }, []);

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (searchValue) {
      setProducts(filteredProducts);
    } else {
      dataService.getProducts((products) => {
        setProducts(products);
      });
    }
  };

  const onDelete = (productId) => {
    dataService.deleteProduct(productId, err => {
      if (err) {
        console.log(err);
        if (err.status === 401) {
          console.log('UNAUTHORIZED');
        }
        return;
      } else {
        const updateProducts = products.filter(products => {
          return products._id !== productId;
        });
        setProducts(updateProducts);
      }
    });
  };

  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="search"
              onChange={handleChange}
              placeholder="Search this site"
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <br />
        {authService.isAuthenticated() === true ? (
          <Link className="btn btn-primary" to={'/products/create'}>
            {' '}
            Create New Product
          </Link>
        ) : (
          ''
        )}
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {products.map((product) => {
              return <Card key={product._id} product={product} delete={onDelete} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

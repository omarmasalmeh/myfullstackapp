import React from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const productId = props.product._id;

  return (
    <div key={props.product._id} className="col-md-4">
      <div className="card mb-4 box-shadow">
      <Link to={`/products/details/${productId}`} >

          <img
            className="card-img-top"
            data-src="holder.js/100px220?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
            alt="Thumbnail [100%x220]"
            style={{ height: 220, maxHeight: 220, width: '100%', display: 'block' }}
            src={props.product.pictures}
            data-holder-rendered="true"
          />
       </Link>
        <div className="card-body">
          <p className="card-text">{props.product.product_name}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
            <Link className="btn btn-sm btn-outline-primary" to={`/products/details/${productId}`}>
                View
              </Link>
              <Link className="btn btn-sm btn-outline-secondary" to={`/products/edit/${productId}`}>
                Edit
              </Link>
              <button className="btn btn-sm btn-outline-danger" onClick={() => props.delete(productId)}>
                Delete
              </button>
              <h5 className="text-muted ml-5 mt-1">{props.product.price}</h5>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

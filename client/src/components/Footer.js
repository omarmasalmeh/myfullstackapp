import React from 'react';
import '../css/footer.css';

const Footer = (props) => {
    return (
      <footer className="text-muted bg-dark">
        <div className="container">
          <p className="float-right">
            <a href="/#">Back to top</a>
          </p>
          <p>Created By &copy; Omar Almasalmeh 2023</p>
          <p>FullStack Application</p>
        </div>
      </footer>
    );
}
 
export default Footer;
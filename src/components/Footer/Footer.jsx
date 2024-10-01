import React from 'react'
import './footer.css'
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom';


const Footer = () => {

  const year= new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="4" md="6" className="mb-4">
          <div className="logo">
          <div>
            <h1 className='text-white'>Raiser Buddy</h1>
          </div>
         </div>
         <p className="footer_text mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est error commodi qui vero, veritatis nemo consequuntur excepturi aliquid. Nesciunt, eveniet.
          </p>
          </Col>
          <Col lg="3" md="3" className="mb-4">
          <div className="footer_quick-links">
            <h4 className="quick_links-title">
              Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Fruits</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Vegetables</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Hill Produce</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Organic Fertilizer</Link>
                </ListGroupItem>
               </ListGroup>
              </div></Col>
          <Col lg="2" md="3" className="mb-4">
          <div className="footer_quick-links">
            <h4 className="quick_links-title">
              Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                {/* <ListGroupItem>
                  <Link to="#">Cart</Link>
                </ListGroupItem> */}
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
               </ListGroup>
              </div></Col>
          <Col lg="3" md="4">
          <div className="footer_quick-links">
            <h4 className="quick_links-title">
              Contact</h4>
              <ListGroup className="footer-contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>No.20 Sreekandapuram, Kannur, Kerala</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-phone-line"></i></span>
                <p>+911234567896</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-mail-line"></i></span>
                <p>raiserbuddy@gmail.com</p>
                </ListGroupItem>
               </ListGroup>
              </div>
              </Col>
              <Col lg="12">
              <p className="footer_copyright">Copyright {year} developed by Romy. All rights reserved.</p>
              </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
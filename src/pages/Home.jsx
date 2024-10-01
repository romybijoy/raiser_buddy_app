import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import homeimg from "../assets/images/home.webp";
// import products from '../assets/data/products'
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";

import offerimg from "../assets/images/offer.jpeg";
import Clock from "../components/UI/Clock";

// import { useFetchProductsMutation, useFetchProductsQuery } from "../redux/slices/product/ProductApiSlice";
import { showProduct } from "../redux/slices/ProductSlice";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchData, setSearchData] = useState("");

  const year = new Date().getFullYear();

  // const [fetchProducts, {isLoading, isSuccess, error, isFetching} ] = useFetchProductsMutation();

  const { products, loading } = useSelector((state) => state.product);


  const dispatch = useDispatch();

  useEffect(() => {

    
    dispatch(showProduct(searchData));
   
    const filterdTrendingProducts = products;

    const filterdBestSalesProducts = products;
    // .filter(
    //   (item) => item.category.name === "fruit"
    // );

    const filterdMobileProducts = products;
    // .filter(
    //   (item) => item.category === "mobile"
    // );

    const filterdWirelessProducts = products;
    // .filter(
    //   (item) => item.category === "wireless"
    // );

    const filterdPopularProducts = products;
    // .filter(
    //   (item) => item.category === "watch"
    // );

    setTrendingProducts(filterdTrendingProducts);
    setBestSalesProducts(filterdBestSalesProducts);
    setMobileProducts(filterdMobileProducts);
    setWirelessProducts(filterdWirelessProducts);
    setPopularProducts(filterdPopularProducts);
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }

     
  return (
    <>
      <Helmet title={"Home"}>
        <section className="hero_section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero_content">
                  <p className="hero_subtitle">Trending Product in {year}</p>
                  <h2>Fresh home made items</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis at qui inventore quos incidunt deleniti veniam
                    aliquid porro quod corrupti facere ipsam esse illo dolor,
                    quo optio quidem magni quas.
                  </p>
                  <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                    <Link to="/shop">SHOP NOW</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero_img">
                  <img src={homeimg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Services />
        <section className="trending_products">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-1">
                <h2 className="section_title">Trending Products</h2>
              </Col>
              <ProductsList data={products} />
            </Row>
          </Container>
        </section>
        <section className="best_sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-1">
                <h2 className="section_title">Best Sales</h2>
              </Col>
              <ProductsList data={products} />
            </Row>
          </Container>
        </section>
        <section className="timer_count">
          <Container>
            <Row>
              <Col lg="6" md="12" className="count_down-col">
                <div className="clock_top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Fruits</h3>
                </div>
                <Clock />
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn store_btn"
                >
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
              </Col>
              <Col lg="6" md="12" className="text-end counter_img">
                <img src={offerimg} alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="new_arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-1">
                <h2 className="section_title">New Arrivals</h2>
              </Col>
              <ProductsList data={products} />
              {/* <ProductsList data={wirelessProducts} /> */}
            </Row>
          </Container>
        </section>
        <section className="popular_category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-1">
                <h2 className="section_title">Popular in Category</h2>
              </Col>
              <ProductsList data={products} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Home;

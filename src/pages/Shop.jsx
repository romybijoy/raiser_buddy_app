import React, { useEffect, useState } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";

import "../styles/shop.css";
// import products from "../assets/data/products";
import ProductList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";

import {
  showProduct,
  fetchProductByCategory,
  showShopProduct,
} from "../redux/slices/ProductSlice";
import { showCategory } from "../../src/redux/slices/CategorySlice";

const Shop = () => {
  const { categories } = useSelector((state) => state.category);
  const { products, product, loading } = useSelector((state) => state.product);
  const [productsData, setProductsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showProduct());
    dispatch(showCategory({ page: 0, pageSize: 30 }));

    setProductsData(products);
  }, [productsData]);

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(fetchProductByCategory(Number(e.target.value)));

    if(e.target.value ==0){
      dispatch(showProduct());
    }
    // setProductsData(products);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  const handleOrderFilter = (e) => {
    e.preventDefault();
    dispatch(showShopProduct({ order: e.target.value }));
    return products;
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option value={0}>All</option>
                  {categories?.map((category, i) => (
                    <option key={i} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter_widget">
                <select onChange={handleOrderFilter}>
                  <option value=''>Sort By</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </Col>
            {/* <Col lg="6" md="12">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search... "
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {products?.length === 0 || productsData?.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductList
                data={products.length > 0 ? products : productsData}
              />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;

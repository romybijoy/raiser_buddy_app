import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/shop.css";
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
  const { products } = useSelector((state) => state.product);

  const [productsData, setProductsData] = useState([]);
  const dispatch = useDispatch();

  // ✅ Initial load
  useEffect(() => {
    dispatch(showProduct());
    dispatch(showCategory({ page: 0, pageSize: 30 }));
  }, []);

  // ✅ Sync products
  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) => {
    const value = Number(e.target.value);

    if (value === 0) {
      dispatch(showProduct());
    } else {
      dispatch(fetchProductByCategory(value));
    }
  };

  const handleOrderFilter = (e) => {
    const order = e.target.value;

    let sortedProducts = [...products];

    if (order === "asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProductsData(sortedProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm),
    );

    setProductsData(filtered);
  };

  return (
    <Helmet title="Shop">
      <div className="bg-gray-50 min-h-screen">
        <CommonSection title="Products" />

        {/* FILTER SECTION */}
        <section className="px-4 -mt-10 pb-4">
          <div className="max-w-7xl mx-auto rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Category */}
              <div className="w-full md:w-1/4">
                <select
                  onChange={handleFilter}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>All Categories</option>
                  {categories?.map((category, i) => (
                    <option key={i} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="w-full md:flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>

              {/* Sort */}
              <div className="w-full md:w-1/5">
                <select
                  onChange={handleOrderFilter}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sort</option>
                  <option value="asc">Name: A → Z</option>
                  <option value="desc">Name: Z → A</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="px-4 pb-10">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">
              Showing {productsData.length} results
            </p>

            {products?.length === 0 || productsData?.length === 0 ? (
              <h1 className="text-center text-lg font-medium text-gray-600">
                No products are found!
              </h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </div>
        </section>
      </div>
    </Helmet>
  );
};

export default Shop;

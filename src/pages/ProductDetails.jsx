import React, { useState, useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Tooltip, Grid, LinearProgress, Rating } from "@mui/material";
import "../styles/product-details.css";

import ProductsList from "../components/UI/ProductsList";
import { fetchProductById, showProduct } from "../redux/slices/ProductSlice";
import { showReviews } from "../redux/slices/ReviewSlice";
import { addToCart } from "../redux/slices/CartSlice";
import MyReactImageMagnify from "../components/common/MyReactImageMagnify";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ZoomImage from "../components/common/ZoomImage";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [data, setData] = useState("");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const { product, products } = useSelector((state) => state.product);

  const { reviews } = useSelector((state) => state.review);
  console.log(productId);
  const [activeImage, setActiveImage] = useState("");

  const [rating, setRating] = useState(null);

  // dispatch(fetchProductById(productId));

  useEffect(() => {
    const input = { productId: Number(productId) };
    dispatch(fetchProductById(input));
    dispatch(showProduct());
    dispatch(showReviews(input));
    setData(product);
  }, [productId]);

  const relatedProducts = products.filter(
    (item) => item?.category?.categoryId === product?.category?.categoryId
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
  };

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = () => {
    dispatch(addToCart({ productId: productId }));
    // dispatch(showCart())
    navigate("/cart");
  };

  return (
    <Helmet title={product?.name}>
      <CommonSection title="Product Details" subtitle={product?.name} />

      <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
        <div className="flex flex-col items-center shadow-md">
          <div
            className="rounded-lg max-w-[30rem] max-h-[35rem] mt-5 "
            // style={{ width: "469px", height: "338px" }}
          >
            <ZoomImage
              image={
                activeImage || (product ? product?.images[0] : activeImage)
              }
            />
          </div>
          <div className="flex flex-wrap space-x-5 justify-center">
            {product?.images?.map((image, i) => (
              <div
                key={i}
                onClick={() => handleSetActiveImage(image)}
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
              >
                <img
                  src={image}
                  alt={product?.images[i]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
       
        <div className="product-details p-6 bg-white rounded-md shadow-md">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">
            {product?.name}
          </h2>
          <div className="product-rating flex items-center gap-2 mb-3">
            <Tooltip
              title={`Average Rating: ${
                product?.avgRating  ? Number(product.avgRating?.toFixed(2)) : 0
              }`}
              placement="top-start"
            >
              <Box>
                <Rating
                  name="decimal-rating"
                  value={product?.avgRating}
                  precision={0.5}
                  readOnly
                />
              </Box>
            </Tooltip>
            <p className="text-gray-600">
              (<span>{reviews.length}</span> ratings)
            </p>
          </div>

          <div className="product-info mx-auto max-w-2xl px-4 pb-6 lg:max-w-5xl lg:px-8 lg:pb-24">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                {product?.category?.name} Category
              </h1>
              <p className="text-lg text-gray-700 pt-2">{product?.shortDesc}</p>
            </div>

            <div className="mt-6">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-4 items-center text-lg lg:text-xl font-medium text-gray-900 mt-4">
                <p className="text-xl font-bold text-green-600">
                  ₹{product?.specialPrice}
                </p>
                <p className="text-xl line-through text-gray-400">
                  ₹{product?.price}
                </p>
                <p className="text-xl text-green-600">
                  {product?.discount}% Off
                </p>
              </div>

              <div className="pt-4">
                {product?.quantity > 0 ? (
                  <p className="text-lg font-semibold">
                    <span className="font-medium">
                      {product?.quantity} Kg left
                    </span>
                  </p>
                ) : (
                  <p className="text-lg font-bold text-red-600">Out Of Stock</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Provider Contact Info
              </h3>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>{product?.provider?.name}</p>
                <p>
                  {product?.provider?.type === "INDIVIDUAL"
                    ? "Farmer"
                    : "Company"}
                </p>
                <p>{product?.provider?.mobile_number}</p>
                <p>{product?.provider?.email}</p>
                <p>{`${product && product?.provider?.address?.house_name}, ${ product && product?.provider?.address?.place}, ${product && product?.provider?.address?.district} - ${product && product?.provider?.address?.zipcode}`}</p>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 1.2 }}
            className="buy-btn bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
            disabled={product?.quantity === 0}
          >
            Add to Cart
          </motion.button>
        </div>

       
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews?.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab_content mt-5">
                  <h3 className="font-bold pb-2">Description</h3>
                  <p>{product?.desc}</p>

                  <div className="pt-2 ">
                    <h3 className="font-bold pb-2">Specification</h3>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Qui blanditiis enim reiciendis, id, officia, dolorem eaque
                      sint ex eligendi eveniet sapiente? Ad harum fugiat atque
                      accusamus quas necessitatibus aliquid distinctio. Lorem
                      ipsum dolor sit amet consectetur adipisicing elit.
                      Placeat, tempore iusto quo magnam nihil unde, illum vero
                      sed reprehenderit quas et tenetur itaque! Iusto ducimus ut
                      rem necessitatibus sed culpa laboriosam nemo, harum amet
                      sunt labore id facere maxime dolore excepturi. Animi
                      expedita assumenda quidem rem reiciendis unde deleniti
                      porro adipisci a natus perferendis nostrum neque beatae,
                      cumque corrupti nisi placeat, qui possimus? Dolores
                      doloremque, voluptates libero modi quas numquam nobis
                      itaque sunt tempore odit ex est mollitia officiis
                      obcaecati iure corrupti quaerat error. Pariatur ipsam
                      repellat neque explicabo quas ea sed architecto iure quis
                      perferendis. Fugiat hic vitae veniam.
                    </p>
                  </div>
                </div>
              ) : (
                <section className="">
                  <h1 className="font-semibold text-lg pb-4">
                    Recent Review & Ratings
                  </h1>

                  <div className="border p-5">
                    <Grid container>
                      <Grid item xs={7}>
                        <div className="space-y-5">
                          {product && product?.reviews?.length !== 0 ? (
                            product?.reviews?.map((item, i) => (
                              <ProductReviewCard item={item} />
                            ))
                          ) : (
                            <h2> No reviews yet! </h2>
                          )}
                        </div>
                      </Grid>

                      <Grid item xs={5}>
                        <h1 className="text-xl font-semibold pb-1">
                          Product Ratings
                        </h1>
                        <div className="flex items-center space-x-3 pb-10">
                          <Tooltip
                            title={`Average Rating: ${
                              product?.avgRating  ? Number(product.avgRating?.toFixed(2)) : 0
                            }`}
                            placement="top-start"
                          >
                            <Box>
                              <Rating
                                name="decimal-rating"
                                defaultValue={0}
                                value={product?.avgRating}
                                precision={0.5}
                                readOnly
                              />
                            </Box>
                          </Tooltip>

                          <p className="opacity-60">{reviews.length} Ratings</p>
                        </div>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid item xs={2}>
                              <p className="p-0">Excellent</p>
                            </Grid>
                            <Grid item xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={reviews.length}
                                color="success"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <p className="opacity-50 p-2">{reviews.length}</p>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid item xs={2}>
                              <p className="p-0">Very Good</p>
                            </Grid>
                            <Grid item xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={0}
                                color="success"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <p className="opacity-50 p-2">0</p>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid item xs={2}>
                              <p className="p-0">Good</p>
                            </Grid>
                            <Grid item xs={7}>
                              <LinearProgress
                                className="bg-[#885c0a]"
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={0}
                                color="orange"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <p className="opacity-50 p-2">0</p>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid item xs={2}>
                              <p className="p-0">Avarage</p>
                            </Grid>
                            <Grid item xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: "#885c0a", // stroke color
                                  },
                                }}
                                variant="determinate"
                                value={0}
                                color="success"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <p className="opacity-50 p-2">0</p>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid item xs={2}>
                              <p className="p-0">Poor</p>
                            </Grid>
                            <Grid item xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={0}
                                color="error"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <p className="opacity-50 p-2">0</p>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </section>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related_title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;

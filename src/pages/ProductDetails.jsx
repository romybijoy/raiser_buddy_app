import React, { useState, useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import ProductReviewCard from "./ProductReviewCard";

import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import "../styles/product-details.css";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import ProductsList from "../components/UI/ProductsList";
import { fetchProductById, showProduct } from "../redux/slices/ProductSlice";
import { showReviews } from "../redux/slices/ReviewSlice";
import { addToCart } from "../redux/slices/CartSlice";

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

  // let product = products.find(
  //   (item) => (
  //     console.log(item.productId), item.productId === Number(productId)
  //   )
  // );

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
        {/* <Container>
          <Row> */}
        {/* <Col lg="6" className="text-white"> */}
        {/* <Carousel
                infiniteLoop={true}
                showIndicator={false}
                showStatus={false}
                thumbWidth={60}
                className="product-carousel"
                autoFocus= {true}
              > */}
        {/* {product.images.map((image, i) => ( */}
        {/* // <img key={i} src={image} />
                // <InnerImageZoom src={image} zoomSrc={image} width={1000}/> */}
        {/* // <div id="imageMagnifyer"> */}
        {/* <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: image,
                    },
                    largeImage: {
                      src: image,
                      width: 1129,
                      height: 750,
                    },
                    isHintEnabled: true,
                  }}
                />
                // </div>
              ))} */}
        {/* </Carousel> */}
        {/* </Col> */}

        {/* <Col> */}
        <div className="flex flex-col items-center ">
          <div
            className="rounded-lg max-w-[30rem] max-h-[35rem]"
            style={{ width: "469px", height: "338px" }}
          >
            <div id="imageMagnifyer">
              <ReactImageMagnify
                imageProps={{
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src:
                    activeImage || (product ? product?.images[0] : activeImage),
                }}
                magnifiedImageProps={{
                  src:
                    activeImage || (product ? product?.images[0] : activeImage),
                  width: 800,
                  height: 1800,
                }}
                MagnifiedImagePosition="top"
              />

              {/* <Zoom>
                <img
                  alt="Example Image"
                  src={
                    activeImage || (product ? product?.images[0] : activeImage)
                  }
                  width="1000"
                  style={{ cursor: "pointer" }}
                />
              </Zoom> */}
            </div>
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
        <div className="product_details">
          <h2>{product?.name}</h2>
          <div className="product_rating d-flex align-items-center gap-1 mb-3 rating_group">
            <Rating name="read-only" value={4.6} precision={0.5} readOnly />

            <p>
              (<span>{reviews.length}</span> ratings)
            </p>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-1 pb-5 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {product?.category?.name}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {product?.shortDesc}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-4 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">₹{product?.specialPrice}</p>
                <p className="opacity-50 line-through">₹{product?.price}</p>

                <p className="text-green-600 font-semibold">
                  {product?.discount}% Off
                </p>
              </div>

              <div className="lg:col-span-2 pt-3">
                {product?.quantity > 0 ? (
                  <p className="lg:text-md text-md">
                    {" "}
                    <span className="font-bold ">Quantity :</span>
                    {"  "}
                    <span className="text-blue-800">
                      {" "}
                      {product?.quantity} Kg
                    </span>
                  </p>
                ) : (
                  <p className="text-red-600 font-bold lg:text-xl text-lg bg-blend-color">
                    Out Of Stock
                  </p>
                )}
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="buy_btn"
            onClick={handleSubmit}
            disabled={product?.quantity !== 0 ? false : true}
          >
            {" "}
            Add to Cart
          </motion.button>
        </div>
        {/* </Col>
          </Row>
        </Container> */}
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
                      These products are made from fresh, frozen, dehydrated, or
                      matured fruits that are packed and processed by heat to
                      prevent spoilage. <br />
                      The packaging and labeling of these products must comply
                      with the Food Safety and Standards{" "}
                    </p>
                  </div>
                </div>
              ) : (
                // <div className="product_review mt-5">
                //   <div className="review_wrapper">
                //     <ul>
                //       {product?.reviews?.map((item, index) => (
                //         <li key={index} className="mb-4">
                //           <h6>{item.user.name}</h6>
                //           <span>{item.rating} (rating) </span>
                //           <p>{item.text}</p>
                //         </li>
                //       ))}
                //     </ul>

                //     {/* <div className="review_form">
                //       <h4>Leave your experience</h4>
                //       <form action="" onSubmit={submitHandler}>
                //         <div className="form_group">
                //           <input
                //             type="text"
                //             placeholder="Enter name"
                //             ref={reviewUser}
                //           />
                //         </div>

                //         <div className="form_group d-flex align-items-center gap-5">
                //           <span onClick={() => setRating(1)}>
                //             1<i className="ri-star-s-fill"></i>
                //           </span>
                //           <span onClick={() => setRating(2)}>
                //             2<i className="ri-star-s-fill"></i>
                //           </span>
                //           <span onClick={() => setRating(3)}>
                //             3<i className="ri-star-s-fill"></i>
                //           </span>
                //           <span onClick={() => setRating(4)}>
                //             4<i className="ri-star-s-fill"></i>
                //           </span>
                //           <span onClick={() => setRating(5)}>
                //             5<i className="ri-star-s-fill"></i>
                //           </span>
                //         </div>

                //         <div className="form_group">
                //           <textarea
                //             ref={reviewMsg}
                //             rows={4}
                //             type="text"
                //             placeholder="Review Message.."
                //           />
                //         </div>
                //         <button type="submit" className="buy_btn">
                //           Submit
                //         </button>
                //       </form>
                //     </div> */}
                //   </div>
                // </div>

                <section className="">
                  <h1 className="font-semibold text-lg pb-4">
                    Recent Review & Ratings
                  </h1>

                  <div className="border p-5">
                    <Grid container spacing={7}>
                      <Grid item xs={7}>
                        <div className="space-y-5">
                          {reviews.map((item, i) => (
                            <ProductReviewCard item={item} />
                          ))}
                        </div>
                      </Grid>

                      <Grid item xs={5}>
                        <h1 className="text-xl font-semibold pb-1">
                          Product Ratings
                        </h1>
                        <div className="flex items-center space-x-3 pb-10">
                          <Rating
                            name="read-only"
                            value={4.6}
                            precision={0.5}
                            readOnly
                          />

                          <p className="opacity-60">{reviews.length} Ratings</p>
                        </div>
                        <Box>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                          >
                            <Grid xs={2}>
                              <p className="p-0">Excellent</p>
                            </Grid>
                            <Grid xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={40}
                                color="success"
                              />
                            </Grid>
                            <Grid xs={2}>
                              <p className="opacity-50 p-2">19259</p>
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
                            <Grid xs={2}>
                              <p className="p-0">Very Good</p>
                            </Grid>
                            <Grid xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={30}
                                color="success"
                              />
                            </Grid>
                            <Grid xs={2}>
                              <p className="opacity-50 p-2">19259</p>
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
                            <Grid xs={2}>
                              <p className="p-0">Good</p>
                            </Grid>
                            <Grid xs={7}>
                              <LinearProgress
                                className="bg-[#885c0a]"
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={25}
                                color="orange"
                              />
                            </Grid>
                            <Grid xs={2}>
                              <p className="opacity-50 p-2">19259</p>
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
                            <Grid xs={2}>
                              <p className="p-0">Avarage</p>
                            </Grid>
                            <Grid xs={7}>
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
                                value={21}
                                color="success"
                              />
                            </Grid>
                            <Grid xs={2}>
                              <p className="opacity-50 p-2">19259</p>
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
                            <Grid xs={2}>
                              <p className="p-0">Poor</p>
                            </Grid>
                            <Grid xs={7}>
                              <LinearProgress
                                className=""
                                sx={{
                                  bgcolor: "#d0d0d0",
                                  borderRadius: 4,
                                  height: 7,
                                }}
                                variant="determinate"
                                value={10}
                                color="error"
                              />
                            </Grid>
                            <Grid xs={2}>
                              <p className="opacity-50 p-2">19259</p>
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

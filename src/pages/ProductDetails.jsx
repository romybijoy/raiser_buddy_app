import React, { useState, useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import ReactImageMagnify from "react-image-magnify";
import "../styles/product-details.css";

import ProductsList from "../components/UI/ProductsList";
import { fetchProductById, showProduct } from "../redux/slices/ProductSlice";
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
  console.log(productId);
  const [activeImage, setActiveImage] = useState('');

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
    
    setData(product);

    console.log(product);
  }, [productId]);


  // const relatedProducts = products.filter((item) => item.category === category);
  const relatedProducts = products;
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
            {/* <img
                src={activeImage}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              /> */}
            <div id="imageMagnifyer">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: activeImage || (product ? product?.images[0]  : activeImage),
                    width: 140,
                    height: 162,
                  },
                  largeImage: {
                    src: activeImage || (product ? product?.images[0]  : activeImage),
                    width: 836,
                    height: 1100,
                  },
                  isHintEnabled: true,
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap space-x-5 justify-center">
            {product?.images?.map((image, i) => (
              <div
              key ={i}
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
        {/* </Col> */}
        {/* <Col lg="6"> */}
        <div className="product_details">
          <h2>{product?.name}</h2>
          <div className="product_rating d-flex align-items-center gap-5 mb-3 rating_group">
            <div>
              <span>
                <i className="ri-star-s-fill"></i>
              </span>
              <span>
                <i className="ri-star-s-fill"></i>
              </span>
              <span>
                <i className="ri-star-s-fill"></i>
              </span>
              <span>
                <i className="ri-star-s-fill"></i>
              </span>
              <span>
                <i className="ri-star-half-s-line"></i>
              </span>
            </div>

            <p>
              (<span>{4.7}</span> ratings)
            </p>
          </div>

           {/* Product info */}
           <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
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
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{product?.specialPrice}
                </p>
                <p className="opacity-50 line-through">
                  ₹{product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {product?.discount}% Off
                </p>
               
              </div>

              
              <div className="lg:col-span-2 pt-3">
                {product?.quantity >0 ?
                <p className="text-green-800 font-bold lg:text-xl text-lg">
                   In stock
                </p>: <p className="text-red-600 font-bold lg:text-xl text-lg">
                   Out Of Stock
                </p>}
                </div>

                <div className="pt-2 ">
                <h3 className="font-bold pb-2">Specification</h3>
                <p>These products are made from fresh, frozen, dehydrated, or matured fruits that are packed and processed by heat to prevent spoilage. <br/>
                The packaging and labeling of these products must comply with the Food Safety and Standards </p>
              </div>
              </div>
</div>
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="buy_btn"
            onClick={handleSubmit}
            disabled= {product?.quantity >0 ? false: true}
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
                  Reviews ({product?.reviews?.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab_content mt-5">
                  <p>{product?.desc}</p>
                </div>
              ) : (
                <div className="product_review mt-5">
                  <div className="review_wrapper">
                    <ul>
                      {product?.reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>{item.user.name}</h6>
                          <span>{item.rating} (rating) </span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    {/* <div className="review_form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form_group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                          />
                        </div>

                        <div className="form_group d-flex align-items-center gap-5">
                          <span onClick={() => setRating(1)}>
                            1<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(2)}>
                            2<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(3)}>
                            3<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(4)}>
                            4<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(5)}>
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>

                        <div className="form_group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message.."
                          />
                        </div>
                        <button type="submit" className="buy_btn">
                          Submit
                        </button>
                      </form>
                    </div> */}
                  </div>
                </div>
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

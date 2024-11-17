import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import AddressCard from "../../components/address/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, cancelOrder } from "../../redux/slices/OrderSlice";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import InvoiceDownload from './InvoiceDownload'

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState("");
  const { orderId } = useParams();
  const location = useLocation();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    const input = { orderId: Number(orderId) };
    dispatch(fetchOrderById(input));
    console.log("order", orderId);
    if (orderId) {
      setOrderData(order);
    }

    navigate(location.pathname, { replace: true });
  }, [dispatch, orderId, location.pathname]);

  const handleCancelOrder = () => {
    const data = { orderId: Number(orderId), userId: order.user.id };

    try {
      dispatch(cancelOrder(data));
      toast.success("Order Cancelled Successfully");
      navigate('/account/order');
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className=" px-2 lg:px-36 space-y-7 ">
      <Grid container className="p-3 shadow-lg">
        <Grid item xs={12}>
          <p className="font-bold text-lg py-2">Delivery Address</p>
        </Grid>
        <Grid item xs={6}>
          <AddressCard address={order?.shippingAddress} />
        </Grid>
      </Grid>
      <Box className="p-5 shadow-lg border rounded-md">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={9} key={order.id}>
            <OrderTraker
              activeStep={
                order?.orderStatus === "PLACED"
                  ? 1
                  : order?.orderStatus === "CONFIRMED"
                  ? 2
                  : order?.orderStatus === "SHIPPED"
                  ? 3
                  : 5
              }
            />
          </Grid>
          <Grid item>
            {order?.orderStatus === "DELIVERED" && (
              <Button sx={{ color: "" }} color="error" variant="text">
                RETURN
              </Button>
            )}

            {order?.orderStatus !== "DELIVERED" && (
              <Button
                sx={{ color: deepPurple[500] }}
                variant="text"
                onClick={handleCancelOrder}
              >
                cancel order
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Grid container className="space-y-5">
        {order &&
          order?.orderItems?.map((item, index) => (
            <Grid
              container
              item
              className="shadow-xl rounded-md p-5 border"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6} key={index}>
                {" "}
                <div className="flex  items-center ">
                  <img
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src={item?.product?.images[0]}
                    alt=""
                  />
                  <div className="ml-5 space-y-2">
                    <p className="">{item.product.name}</p>
                    <p className="opacity-50 text-xs font-semibold space-x-5">
                      {/* <span>Color: pink</span> <span>Size: {item.size}</span> */}
                    </p>
                    <p>{item.product.desc}</p>
                    <p>₹{item.price} </p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                {
                  <Box
                    sx={{ color: deepPurple[500] }}
                    onClick={() =>
                      navigate(`/account/review/${item.product.productId}`, {
                        state: { productId: item.product.productId },
                      })
                    }
                    className="flex items-center cursor-pointer"
                  >
                    <StarIcon
                      sx={{ fontSize: "2rem" }}
                      className="px-2 text-5xl"
                    />
                    <span>Rate & Review Product</span>
                  </Box>
                }
              </Grid>
            </Grid>
          ))}
      </Grid>

      <InvoiceDownload />
    </div>
  );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../redux/slices/PaymentSlice";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../../components/address/AdreessCard";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../redux/slices/OrderSlice";

const PaymentSuccess = () => {
  // razorpay_payment_link_reference_id
  // razorpay_payment_id

  const urlParams = new URLSearchParams(window.location.search);
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.order);
  console.log("orderId", orderId, order);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, [window.location.search]);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId };
      dispatch(updatePayment(data));
      dispatch(fetchOrderById(data));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>

      <OrderTraker activeStep={1} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order &&
          order.orderItems.map((item) => (
            <Grid
              container
              item
              className="shadow-xl rounded-md p-5 border"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                {" "}
                <div className="flex  items-center ">
                  <img
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src={item?.product.images}
                    alt=""
                  />
                  <div className="ml-5 space-y-2">
                    <p className="">{item.product.name}</p>
                    <p className="opacity-50 text-xs font-semibold space-x-5">
                      Category: {item.product.category.name}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard address={order?.shippingAddress} />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;

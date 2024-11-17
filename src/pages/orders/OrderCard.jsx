import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { fetchOrderById } from "../../redux/slices/OrderSlice";
import { useDispatch } from "react-redux";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("items ", item, order, order.orderStatus);

  const handleNavigate = () => {
    if (order?.orderStatus === "PENDING") {
      navigate(`/checkout?step=3&order_id=${order?.id}`);
    } else {
      navigate(`/account/order/${order?.id}`, { id: order?.id });
    }
  };

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
       <Grid>
      <p className="opacity-80 text-xs font-semibold space-x-5 mb-2">
                {/* <span>Size: {item?.size}</span> */}{" "}
                ORDER ID - {order?.orderId}
              </p>
        </Grid>
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
     
        <Grid item xs={5}>
          <div onClick={handleNavigate} className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product.images[0]}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product.name}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                {/* <span>Size: {item?.size}</span> */}{" "}
                {item?.product.category.name}
              </p>
             
            </div>
          </div>
        </Grid>

        <Grid item xs={1}>
          <p>₹{item?.price}</p>
        </Grid>

        <Grid item xs={2}>
          <p>{order?.orderStatus}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered On Mar 03</span>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Expected Delivery On Mar 03</span>
              </>
            )}
          </p>
          {order.orderStatus === "DELIVERED" && (<p className="text-xs">Your Item Has Been Delivered</p>)}
          {order.orderStatus === "DELIVERED" && (
            <div
            onClick={() =>
              navigate(`/account/review/${item.product.productId}`, {
                state: { productId: item.product.productId },
              })}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;

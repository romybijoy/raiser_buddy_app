import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateCartItem, removeCartItem } from "../../redux/slices/CartSlice";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton, loading }) => {
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?.cartItemId };
    dispatch(removeCartItem(data));
  };
  const handleUpdateCartItem = (num) => {
    const data = {
      quantity: item.quantity + num,
      cartItemId: item?.cartItemId,
    };
    dispatch(updateCartItem(data));
  };

  console.log(item)
  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product.images[0]}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.name}</p>
          <p className="opacity-70">{item?.product?.category?.name}</p>
          {/* <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p> */}
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{item?.product.price}</p>
            <p className="font-semibold text-lg">
              ₹{item?.product.specialPrice}
            </p>
            <p className="text-green-600 font-semibold">
              {item?.product.discount}% off
            </p>
          </div>
        </div>
      </div>
      {showButton &&
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span className="py-1 px-7 border rounded-sm">
              {item?.quantity}
            </span>
            <IconButton
              disabled={item?.quantity >= 10}
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base lg:mt-0">
            <Button onClick={handleRemoveItemFromCart} variant="text">
              Remove{" "}
            </Button>
          </div>
        </div>
      }
    </div>
  );
};

export default CartItem;

import React from "react";

import { Link } from "react-router-dom";

const AccountAddressCard = ({ address }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex" >
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className="space-y-3 m-3">
        <p className="font-semibold">{`${address?.house_name} ${address?.place}`}</p>

        <p>{` ${address?.district} ${address?.state} ${address?.zipcode}`}</p>

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.mobile}</p>
        </div>
      </div>
      {/* <div className="flex m-3">
        <Link to="/" className="text-base text-outerspace font-semibold">
          Remove
        </Link>
        <div className="btn-separator px-3"></div>
        <Link to="/" className="text-base text-outerspace font-semibold">
          Edit
        </Link>
      </div> */}
    </div>
  );
};

export default AccountAddressCard;

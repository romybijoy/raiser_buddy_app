import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className="space-y-3">
        <p className="font-semibold">{`${address?.house_name  || "N/A"} ${address?.place  || "N/A"}`}</p>

        <p>
          {`${address?.state  || "N/A"} ${address?.country  || "N/A"} ${address?.zipcode  || "N/A"}`}
        </p>

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddressCard from "../../components/address/AdreessCard";

export default function AddDeliveryAddressForm() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.app);

  const [selectedAddress, setSelectedAddress] = useState(null);

  // 🔹 HANDLE ADDRESS SELECTION → GO TO SUMMARY
  const handleProceed = () => {
    if (!selectedAddress) return;
    navigate("/checkout?step=3", {
      state: { address: selectedAddress },
    });
  };

  // 🔹 FORM SUBMIT → NEW ADDRESS
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const address = {
      house_name: form.get("house_name"),
      place: form.get("place"),
      country: form.get("country"),
      district: form.get("district"),
      city: form.get("city"),
      state: form.get("state"),
      zipcode: form.get("zip"),
      mobile: form.get("phoneNumber"),
    };

    navigate("/checkout?step=3", {
      state: { address },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🔹 SAVED ADDRESSES */}
        <div className="bg-white rounded-xl shadow-sm border p-4 h-[32rem] overflow-y-auto">
          <h2 className="font-semibold text-lg mb-3">Saved Addresses</h2>

          {currentUser?.addresses?.length > 0 ? (
            currentUser.addresses.map((item, key) => (
              <div
                key={key}
                onClick={() => setSelectedAddress(item)}
                className={`p-4 border rounded-lg mb-3 cursor-pointer transition 
                  ${
                    selectedAddress?.add_id === item.add_id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
              >
                <AddressCard address={item} />

                {selectedAddress?.add_id === item.add_id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProceed();
                    }}
                    className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Deliver Here
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved addresses</p>
          )}
        </div>

        {/* 🔹 NEW ADDRESS FORM */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-lg mb-4">Add New Address</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="house_name"
              placeholder="House Name / No."
              required
              className="input"
            />
            <input
              name="place"
              placeholder="Place"
              required
              className="input"
            />

            <input name="city" placeholder="City" required className="input" />
            <input
              name="district"
              placeholder="District"
              required
              className="input"
            />

            <input
              name="state"
              placeholder="State"
              required
              className="input"
            />
            <input
              name="zip"
              placeholder="Zip Code"
              required
              className="input"
            />

            <input
              name="country"
              placeholder="Country"
              required
              className="input"
            />
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              required
              className="input"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600"
              >
                Deliver Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, fetchAddresses } from "../../redux/slices/AddressSlice";
import { toast } from "react-toastify";

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addresses, loading } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    house_name: "",
    place: "",
    district: "",
    state: "",
    country: "",
    zipcode: "",
    mobile: "",
    is_default: false,
  });

  // 🔥 Load addresses if not available (important on refresh)
  useEffect(() => {
    if (!addresses.length) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, addresses.length]);

  // 🔥 Find address
  useEffect(() => {
    const address = addresses.find((a) => a.add_id === Number(id));

    if (address) {
      setFormData(address);
    }
  }, [addresses, id]);

  // 🔥 Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateAddress({ id, data: formData })).unwrap();
      toast.success("Address updated successfully");
      navigate("/account");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow border mt-6">
      <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="house_name"
            value={formData.house_name}
            onChange={handleChange}
            placeholder="House Name"
            className="w-full p-2 border rounded"
          />

          <input
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Place"
            className="w-full p-2 border rounded"
          />

          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="w-full p-2 border rounded"
          />

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border rounded"
          />

          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border rounded"
          />

          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Zipcode"
            className="w-full p-2 border rounded"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full p-2 border rounded"
          />

          {/* DEFAULT ADDRESS */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
            />
            Set as default address
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Address
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAddress;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountAddressCard from "../../components/address/AccountAdressCard";
import { fetchAddresses, deleteAddress } from "../../redux/slices/AddressSlice";
import { toast } from "react-toastify";
import ConfirmModal from "../Account/ConfirmModal";
import { updateProfile } from "../../redux/slices/UserSlice";

const Account = () => {
  const { currentUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { addresses, loading } = useSelector((state) => state.address);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    mobile_number: currentUser?.mobile_number || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSave = async () => {
  try {
    const payload = {
      id: currentUser?.id,
      ...formData,
    };

    await dispatch(updateProfile(payload)).unwrap();

    toast.success("Profile updated successfully");
    setIsEditing(false);

  } catch (err) {
    toast.error(err || "Update failed");
  }
};

  const handleDeleteClick = (address) => {
    console.log(address);
    setSelectedAddress(address);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    console.log("first", selectedAddress);
    try {
      await dispatch(deleteAddress(selectedAddress.add_id)).unwrap();
      toast.success("Address deleted");

      dispatch(fetchAddresses());
    } catch (err) {
      toast.error(err || "Delete failed");
    } finally {
      setShowConfirm(false);
      setSelectedAddress(null);
    }
  };

  const handleEditAddress = (address) => {
    navigate(`/account/edit-address/${address.add_id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Account</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* WALLET */}
      <div className="bg-white p-5 rounded-xl shadow border w-64">
        <h3 className="text-gray-600">Wallet Balance</h3>
        <p className="text-2xl font-bold mt-2 text-green-600">
          ₹{currentUser?.walletBalance ?? 0}
        </p>
      </div>

      {/* CONTACT DETAILS */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="font-semibold mb-4 text-lg">Contact Details</h3>

        <div className="grid gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
            className="p-3 border rounded-lg"
          />

          <input
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            disabled={!isEditing}
            className="p-3 border rounded-lg"
          />

          <input
            value="********"
            disabled
            className="p-3 border rounded-lg bg-gray-100"
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">My Address</h3>

          <Link to="/account/add" className="text-blue-600 font-medium">
            + Add Address
          </Link>
        </div>

        {addresses?.length === 0 ? (
          <p>No addresses</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.map((item) => (
              <AccountAddressCard
                key={item.add_id}
                address={item}
                onEdit={handleEditAddress}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this address?"
      />
    </div>
  );
};

export default Account;

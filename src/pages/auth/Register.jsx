import React, { useState, useEffect, useRef } from "react";
import { createUser } from "../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Firebase } from "../../firebase/config";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    role: "USER",
    image: "",
  });

  const [image, setImage] = useState("");
  const [validated, setValidated] = useState(false);
  const [valError, setValError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { message, error, loading } = useSelector((state) => state.app);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload (Firebase)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Firebase.storage()
      .ref(`/image/${file.name}`)
      .put(file)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          setImage(url);
          setFormData({ ...formData, image: url });
        });
      });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      formData.password.length < 4 ||
      !formData.mobile_number ||
      !image
    ) {
      setValidated(true);
      return;
    }

    dispatch(createUser(formData));
  };

  // Handle response
  useEffect(() => {
    if (error === 409) {
      setValError("User with email already exists");
    } else if (message) {
      toast.success("User registered successfully, please verify OTP");
      navigate("/verifyotp");
    }
  }, [error, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>

        {valError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {valError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {validated && !formData.name && (
              <p className="text-red-500 text-sm">Please enter a name</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {validated && !/^\S+@\S+\.\S+$/.test(formData.email) && (
              <p className="text-red-500 text-sm">Enter valid email</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {validated && formData.password.length < 4 && (
              <p className="text-red-500 text-sm">
                Password must be at least 4 characters
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              placeholder="Enter mobile number"
              value={formData.mobile_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {validated && !formData.mobile_number && (
              <p className="text-red-500 text-sm">Enter mobile number</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              className="w-full"
            />
            {validated && !image && (
              <p className="text-red-500 text-sm">Upload an image</p>
            )}

            {image && (
              <img
                src={image}
                alt="preview"
                className="mt-2 w-16 h-16 rounded"
              />
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

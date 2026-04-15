import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAddress } from "../../redux/slices/OrderSlice";
import { toast } from "react-toastify";

export default function AddAddressForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const address = {
      house_name: data.get("house_name"),
      place: data.get("place"),
      country: data.get("country"),
      district: data.get("district"),
      city: data.get("city"),
      state: data.get("state"),
      zipcode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    dispatch(createAddress({ address }));
    navigate("/account");
    toast.success("Address added successfully");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      {/* CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Add Address
        </h2>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="house_name" label="House Name" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="place" label="Place" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="city" label="City" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="district" label="District" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="state" label="State" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="zip" label="Zip Code" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="country" label="Country" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth required name="phoneNumber" label="Phone Number" />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Save Address
              </Button>
            </Grid>

          </Grid>
        </form>
      </div>
    </div>
  );
}
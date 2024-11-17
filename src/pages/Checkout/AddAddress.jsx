import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/slices/OrderSlice";
import userEvent from "@testing-library/user-event";
import AddressCard from "../../components/address/AdreessCard";
import { useState } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState(null);
  const { currentUser } = useSelector((state) => state.app);

  // console.log("auth", auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

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

    dispatch(createOrder({ address, navigate }));
    // after perfoming all the opration
    handleNext();
  };

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, navigate }));
    handleNext();
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {currentUser && currentUser?.addresses.length !== 0 &&
            currentUser?.addresses.map((item, key) => (
              <div
              key={key}
                onClick={() => setSelectedAdress(item)}
                className="p-5 py-7 border-b cursor-pointer"
              >
                {" "}
                <AddressCard address={item} />
                {selectedAddress?.add_id === item.add_id && (
                  <Button
                    sx={{ mt: 2 }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={()=>handleCreateOrder(item)}
                  >
                    Deliverd Here
                  </Button>
                )}
              </div>
            ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="house_name"
                  name="house_name"
                  label="House Name / House No."
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="place"
                  name="place"
                  label="Place"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="district"
                  name="district"
                  label="District"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Deliverd Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

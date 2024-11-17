import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {saveAddress} from "../../../State/Order/Action";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, API_TOKEN} from "../../../config/apiConfig";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')
  console.log();
  const handleSummit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipcode"),
      mobile: data.get("phoneNumber"),
    };
    const orderData = {address, navigate};
    try {
      // Gửi dữ liệu tới
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.post(`${API_BASE_URL}/api/address/create`, address, config);

      if (response.status === 202) {
        console.log("Address created:", response.data);

        dispatch(saveAddress(response.data));

        navigate("/checkout?step=3");
      } else {
        console.error("Failed to create address:", response);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={10}>
          <Box className="border rounded-md shadow-md p-5">
            <form onSubmit={handleSummit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

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
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipcode"
                    name="zipcode"
                    label="Zipcode"
                    fullWidth
                    autoComplete="shipping pin-code"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone No"
                    fullWidth
                    autoComplete="tel"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{ padding: ".9rem 1.5rem", bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;

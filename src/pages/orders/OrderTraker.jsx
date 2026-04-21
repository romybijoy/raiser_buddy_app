import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function OrderTraker({ orderStatus }) {
  const ORDER_STEPS = [
    { key: "PLACED", label: "Placed" },
    { key: "CONFIRMED", label: "Order Confirmed" },
    { key: "SHIPPED", label: "Shipped" },
    { key: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
    { key: "DELIVERED", label: "Delivered" },
  ];

  const getStep = () => {
    return ORDER_STEPS.findIndex((step) => step.key === orderStatus);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={getStep()} alternativeLabel>
        {ORDER_STEPS.map((step) => (
          <Step key={step.key}>
            <StepLabel
              sx={{
                "& .MuiStepIcon-root": {
                  color: "#ccc",
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#4CAF50",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#4CAF50",
                },
                "& .MuiStepLabel-label": {
                  fontSize: "13px",
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

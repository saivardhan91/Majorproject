import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button,Box } from "@mui/material";
import Navbar from "../HomePage/Navbar";
const plans = [
  { name: "Gold", price: "$19.99/month", benefits: ["Basic Support", "Limited Access"] },
  { name: "Diamond", price: "$49.99/month", benefits: ["Priority Support", "Full Access"] },
  { name: "Platinum", price: "$99.99/month", benefits: ["24/7 Support", "Exclusive Features"] },
];

const PaymentPlans = () => {
  const handlePayment = (plan) => {
    alert(`Proceeding to payment for ${plan.name}`);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.name}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5" color="primary">
                  {plan.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                  {plan.price}
                </Typography>
                <ul>
                  {plan.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handlePayment(plan)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
};

export default PaymentPlans;

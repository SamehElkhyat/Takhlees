import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
export default function UserPayment() {
  const SendAmount = async (amount) => {
console.log(amount);

    try {
      const  data  = await axios.post(
        `https://user.runasp.net/api/Payment-Method`,
        { Amount: amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);
      
    } catch (error) {
        console.log(error);
        
    }
  };
  let formik = useFormik({
    initialValues: {
      Amount: "",
    },
    onSubmit: SendAmount,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card
          sx={{ maxWidth: 420, width: "100%", boxShadow: 3, borderRadius: 3 }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              الدفع الإلكتروني
            </Typography>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Form.Group controlId="Amount">
                    <Form.Label>رقم البوليصه</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="رقم الوليصه"
                      name="Amount"
                      value={formik.values.Amount}
                      
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 4,
                      fontSize: "16px",
                      backgroundColor: "green",
                      "&:hover": { backgroundColor: "white", color: "black" },
                    }}
                  >
                    تأكيد الدفع
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

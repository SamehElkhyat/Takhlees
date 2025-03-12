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
import toast, { Toaster } from "react-hot-toast";
export default function UserPayment() {
  const SendAmount = async (amount) => {
    console.log(amount);
    
    try {
      const {data} = await axios.post(
        `https://user.runasp.net/api/Payment`,
        { Amount: amount.Amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      toast.success("تم الدفع بنجاح");
      window.location.href =data.approveUrl;
      
    } catch (error) {
      console.log(error);
      toast.error("فشلت العمليه");

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
                    <Form.Label>المبلغ</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="المبلغ"
                      name="Amount"
                      value={formik.values.Amount}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Grid>

                <Grid className="w-100" item xs={12}>
                  <Button
                    type="submit"
                    className="w-50 d-flex justify-content-center"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 4,
                      width:"50%",
                      display:"flex",
                      justifyContent:"center",
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
          <Toaster/>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

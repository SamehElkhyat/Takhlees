import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileUsers() {
  let params = useParams();

  const user = {
    avatar: "https://via.placeholder.com/150",
  };

  const [DATA, setDATA] = useState({});
  const GetProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Profile-Show-Admin/${params.id}`,
        {
          withCredentials: true,
        }
      );

      setDATA(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2, justifyContent: "center" }}>
        {/* تصميم ملف المستخدم */}
        <Grid item xs={12} md={9}>
          <Card
            sx={{
              padding: 3,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              background:
                "linear-gradient(135deg,rgb(33, 109, 41),rgb(54, 82, 62))",
              color: "white",
            }}
          >
            {/* الصورة الرمزية */}
            <Avatar
              src={user.avatar}
              sx={{
                width: 120,
                height: 120,
                margin: "auto",
                border: "4px solid white",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
              }}
            />

            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                {DATA.fullName}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                {DATA.email} :البريد الإلكتروني
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.id} :رقم المعرف
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.role} :المهنه
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.phoneNumber} :الهاتف
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.taxRecord} :السجل التجاري
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.insuranceNumber} :رقم الضريبي
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {DATA.identity} :رقم البطاقه
              </Typography>

              {/* خط فاصل */}
              <Divider
                sx={{
                  my: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    password: "$2a$10$UQU8HCPFzOne5oEWFMi5OuQHIg6RP0L07f8BqiQzObTEB1ftb4nJ2",
    userImage: "",
    fullName: "Huu Duy",
    userDOB: "2003-06-06",
    userAddress: "TP Hải Dương, tỉnh Hải Dương",
    userGender: true,
    userPhone: "0542857694",
    userEmail: "huuduy@gmail.com",
    userLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, userImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
    // Make an API call here with JSON payload
    fetch("http://localhost:8081/api/user/update/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box
      sx={{
        maxWidth: 650,
        margin: "auto",
        backgroundColor: "#fff9f9",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="image-upload">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Avatar
                src={formData.userImage || ""}
                alt="User Avatar"
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: !formData.userImage ? "gray" : "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!formData.userImage && (
                  <IconButton
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                    component="span"
                  >
                    <AddPhotoAlternate />
                  </IconButton>
                )}
              </Avatar>
            </label>
          </Grid>

          <Grid item xs={2} sm={8}>
            <TextField
              fullWidth
              label="Họ và tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Ngày sinh"
              type="date"
              name="userDOB"
              value={formData.userDOB}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleChange}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Địa chỉ"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              margin="normal"
              size="small"
            />

            <FormControl sm={6} margin="normal">
              <InputLabel>Giới tính</InputLabel>
              <Select
                name="userGender"
                value={formData.userGender ? "true" : "false"}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "userGender",
                      value: e.target.value === "true",
                    },
                  })
                }
                size="small"
              >
                <MenuItem value="true">Nam</MenuItem>
                <MenuItem value="false">Nữ</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProfile;

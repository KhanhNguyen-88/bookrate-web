import React, { useState, useEffect } from "react";
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
import { getToken } from "../../services/localStorageService";

const UpdateProfile = () => {
  const [userData, setUserData] = useState({});
  const [imagePre, setImagePre] = useState("");
  const [image, setImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const accessToken = getToken();
    fetch(`http://localhost:8081/api/user/user-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUserData(result.result);
        console.log("data user",result.result)
      });
  }, []);
  


  useEffect(() => {
    fetch(`http://localhost:8081/api/file/preview/${userData.userImage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Ảnh có trên cloud");
          return response.json();
        } else {
          throw new Error("Ảnh chưa có trên cloud hoặc server có lỗi.");
        }
      })
      .then((result) => {
        setImagePre(result.result);
      })
      .catch((e) => {
        console.log("Ảnh chưa có trên cloud");
      });
  }, [userData]);

  useEffect(()=>{
    setImage(userData.userImage);
    setFullName(userData.fullName);
    setUserAddress(userData.userAddress);
    setUserEmail(userData.userEmail);
    setUserDOB(userData.userDOB);
    setUserPhone(userData.userPhone);
    setUserGender(userData.userGender);
  }, [userData])
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append("file", file);
      const response = await fetch("http://localhost:8081/api/file/upload", {
        method: "POST",
        body: formDataImage,
      });
      const result = await response.json();
      setImage(result.result);

      const response2 = await fetch(
        `http://localhost:8081/api/file/preview/${result.result}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result2 = await response2.json();
      setImagePre(result2.result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ImageUpload", image);
    // Make an API call here with JSON payload
    fetch("http://localhost:8081/api/user/update/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userData.password,
        userImage: image,
        fullName: fullName,
        userDOB: userDOB,
        userAddress: userAddress,
        userGender: userGender,
        userPhone: userPhone,
        userEmail: userEmail,
        userLink: userData.userLink,
      }),
    })
      .then((response) => response.json())
      .then((data) =>{
        alert("Cập nhật thành công!");
      })
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
        Cập nhật thông tin cá nhân
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
                src={imagePre || ""}
                alt="User Avatar"
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: !imagePre ? "gray" : "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!imagePre && (
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Ngày sinh"
              type="date"
              name="userDOB"
              value={userDOB}
              onChange={(e) => setUserDOB(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Email"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              name="userPhone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Địa chỉ"
              name="userAddress"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              margin="normal"
              size="small"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Giới tính</InputLabel>
              <Select
                name="userGender"
                value={userGender ? "true" : "false"}
                onChange={(e) => setUserGender(e.target.value)}
                size="small"
              >
                <MenuItem value="false">Nam</MenuItem>
                <MenuItem value="true">Nữ</MenuItem>
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

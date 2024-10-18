import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// import GoogleIcon from "@mui/icons-material/Google";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.scss";

const cx = classNames.bind(style);
export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [email, setEmail] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  // Dữ liệu cần truyền đi
  const paramsEmail = {
    email: email,
  };
  const paramsCode = {
    code: emailCode,
  };

  // Chuyển đối tượng params thành chuỗi query
  const queryEmailString = new URLSearchParams(paramsEmail).toString();
  const queryEmailCodeString = new URLSearchParams(paramsCode).toString();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };
  const handleRegister = async () => {
    const response = await fetch(`http://localhost:8081/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    const data = await response.json();
    try {
      if (data.code !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      setSnackBarMessage(error.message);
      setSnackBarOpen(true);
      return;
    }
    alert("Đăng ký thành công! Hãy tận hưởng nào ^v^")
    navigate("/login")
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !confPassword) {
      setSnackBarMessage("Vui lòng nhập đầy đủ thông tin!");
      setSnackBarOpen(true);
      return; // Dừng thực hiện nếu chưa nhập đủ
    }
    if (!email.includes("@gmail.com")) {
      setSnackBarMessage("Email không hợp lệ!");
      setSnackBarOpen(true);
      return;
    }
    if (password !== confPassword) {
      setSnackBarMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      setSnackBarOpen(true);
      return; // Dừng thực hiện nếu mật khẩu không khớp
    }
    setOpenPopup(true);
    const response = await fetch(
      `http://localhost:8081/api/mail/send-code?${queryEmailString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.json();
    try {
      if (data.code !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      setSnackBarMessage(error.message);
      setSnackBarOpen(true);
    }
  };

  const handleSubmitCode = async () => {
    if (!emailCode) {
      setSnackBarMessage("Vui lòng nhập 'Mã xác nhận'");
      setSnackBarOpen(true);
      return;
    }
    console.log(emailCode);
    const response = await fetch(
      `http://localhost:8081/api/mail/verify-code?${queryEmailCodeString}&${queryEmailString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.json();
    try {
      if (data.code !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      setSnackBarMessage(error.message);
      setSnackBarOpen(true);
      return;
    }
    handleRegister();
  };

  return (
    <div className={cx("wrapper")}>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx={{
          backgroundImage:
            'url("https://images.gr-assets.com/misc/1716925923-1716925923_goodreads_misc.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card
          sx={{
            minWidth: 400,
            maxWidth: 500,
            boxShadow: 4,
            borderRadius: 4,
            paddingX: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textAlign={"center"}
              fontWeight={600}
              fontStyle={"italic"}
            >
              Welcome to{" "}
            </Typography>
            <Typography
              fontWeight={600}
              fontStyle={"italic"}
              textAlign={"center"}
              variant="h3"
              sx={{
                color: "var(--button-primary)",
              }}
            >
              goodreads!
            </Typography>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Email"
                variant="filled"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Tên đăng nhập"
                variant="filled"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonOutlineOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Xác nhận mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  mt: "15px",
                }}
              >
                Đăng ký
              </Button>
              <Popup
                open={openPopup} // Kiểm soát mở popup qua trạng thái
                onClose={() => setOpenPopup(false)} // Đóng popup
                modal
                nested
              >
                {(close) => (
                  <Card
                  // sx={{
                  // //   minWidth: 400,
                  // //   maxWidth: 500,
                  // //   marginX: "auto",
                  // //   paddingX: 2,
                  // }}
                  >
                    <Button className="close" onClick={close}>
                      &times;
                    </Button>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                      >
                        <Typography>
                          Hãy nhập mã xác thực gửi về email {email}
                        </Typography>
                        <TextField
                          label="Nhập mã xác thực"
                          type="text"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={emailCode}
                          onChange={(e) => setEmailCode(e.target.value)}
                        />
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="center"
                          width="100%"
                        >
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleSubmitCode}
                            fullWidth
                            sx={{
                              mt: "15px",
                              mx: "5px",
                            }}
                          >
                            Gửi mã
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={close}
                            fullWidth
                            sx={{
                              mt: "15px",
                              mx: "5px",
                            }}
                          >
                            Thoát
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Popup>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="medium"
                onClick={handleLogin}
                fullWidth
                sx={{
                  mt: "15px",
                }}
              >
                Đăng nhập tài khoản
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

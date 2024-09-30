import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { getToken, setToken } from "../../services/localStorageService";
import style from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(style);
export default function Login() {
  const navigate = useNavigate();

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const handleClick = () => {
    alert(
      "Please refer to Oauth2 series for this implemetation guidelines. https://www.youtube.com/playlist?list=PL2xsxmVse9IbweCh6QKqZhousfEWabSeq"
    );
  };

  // useEffect(() => {
  //   const accessToken = getToken();

  //   if (accessToken) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Response body:", data);

        // This code is a commitment between BE and FE
        if (data.code !== 200) {
          throw new Error(data.message);
        }

        setToken(data.data?.token);

        navigate("/");
      })
      .catch((error) => {
        setSnackBarMessage(error.message);
        setSnackBarOpen(true);
      });
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
        bgcolor={"#f0f2f5"}
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
            padding: 4,
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
              <Typography
                fontWeight={600}
                fontStyle={"italic"}
                variant="h3"
                sx={{
                  color: "var(--button-primary)",
                }}
              >
                goodreads!
              </Typography>
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
                label="Username"
                variant="outlined"
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
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  mt: "15px",
                  mb: "25px",
                }}
                startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
              >
                Login
              </Button>
              <Divider></Divider>
            </Box>

            <Box display="flex" flexDirection="column" width="100%" gap="25px">
              {/* <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleClick}
                  fullWidth
                  sx={{ gap: "10px" }}
                >
                  <GoogleIcon />
                  Continue with Google
                </Button> */}
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
              >
                Create an account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

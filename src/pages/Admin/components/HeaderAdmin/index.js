import React, { useEffect, useState } from "react";
import styles from "./HeaderAdmin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../../../services/localStorageService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";

const HeaderAdmin = () => {
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [openDialog, setOpenDialog] = useState(false); // Để mở/đóng hộp thoại xác nhận
  const navigate = useNavigate();

  // Lấy thông tin user từ API
  useEffect(() => {
    const token = getToken();
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/user/detail-by-token", {
          headers: {
            Authorization: `Bearer ${token}`, // Token từ localStorage
          },
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
          setUser(data.result); // Lưu thông tin user
        } else {
          console.error("Không thể lấy thông tin user:", data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Mở hộp thoại xác nhận logout
  const handleLogoutClick = () => {
    setOpenDialog(true); // Mở hộp thoại xác nhận logout
  };

  // Đóng hộp thoại xác nhận
  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng hộp thoại
  };

  // Xử lý logout sau khi xác nhận
  const handleLogoutConfirm = () => {
    removeToken(); // Xóa token
    navigate("/login"); // Chuyển hướng về trang login
    setOpenDialog(false); // Đóng hộp thoại
  };

  return (
    <header className={styles.headerAdmin}>
      <div className={styles.logo}>NiceAdmin</div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
        <button className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={styles.actions}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faBell} />
          <span className={styles.badge}>4</span>
        </div>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={styles.badge}>3</span>
        </div>
        {user && (
          <div className={styles.profile}>
            <img
              src={`http://localhost:9000/image-book-rate/${user.userImage}`}
              alt="profile"
              className={styles.profileImage}
            />
            <span className={styles.profileName}>{user.fullName}</span>
            <button className={styles.logoutButton} onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Hộp Thoại Xác Nhận Logout */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleLogoutConfirm} color="error">
            Đăng xuất
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default HeaderAdmin;

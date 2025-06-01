import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";

const UserTable = ({ users, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số dòng mỗi trang

  const handleViewUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/info-detail/${userId}`);
      const data = await response.json();

      if (data.code === 200) {
        setSelectedUser(data.result); // Lưu thông tin user vào state
        setOpen(true); // Mở Modal
      } else {
        alert("Không thể tải thông tin người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      alert("Đã xảy ra lỗi khi lấy thông tin người dùng.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Cập nhật trang hiện tại
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Cập nhật số dòng mỗi trang
    setPage(0); // Reset về trang đầu tiên
  };

  // Lấy dữ liệu của trang hiện tại
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.userEmail}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewUser(user.id)}>Xem</Button>
                <Button onClick={() => onDelete(user.id)} color="error">
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Phân trang */}
      <TablePagination
        component="div"
        count={users.length} // Tổng số người dùng
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số dòng mỗi trang
      />

      {/* Modal Hiển Thị Thông Tin User */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedUser ? (
            <>
              <Typography variant="h6" component="h2">
                Thông Tin Chi Tiết
              </Typography>
              <Typography variant="body1">ID: {selectedUser.id}</Typography>
              <Typography variant="body1">Họ Tên: {selectedUser.fullName}</Typography>
              <Typography variant="body1">Email: {selectedUser.userEmail}</Typography>
              <Typography variant="body1">Địa Chỉ: {selectedUser.userAddress}</Typography>
              <Typography variant="body1">Số Điện Thoại: {selectedUser.userPhone}</Typography>
              {selectedUser.userImage && (
                <img
                  src={`http://localhost:9000/image-book-rate/${selectedUser.userImage}`}
                  alt="User"
                  style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
                />
              )}
            </>
          ) : (
            <Typography variant="body1">Đang tải...</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserTable;

import React, { useState, useEffect } from "react";
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

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số dòng hiển thị trên mỗi trang

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/category/get-all`);
      const data = await response.json();

      if (data.code === 0) {
        setCategories(data.result); // Lưu danh sách thể loại
      } else {
        alert("Không thể tải danh sách thể loại.");
      }
    } catch (error) {
      console.error("Lỗi khi tải thể loại:", error);
      alert("Đã xảy ra lỗi khi tải danh sách thể loại.");
    }
  };

  const handleViewCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/category/info-detail/${categoryId}`
      );
      const data = await response.json();

      if (data.code === 200) {
        setSelectedCategory(data.result); // Lưu thông tin thể loại vào state
        setOpen(true); // Mở Modal
      } else {
        alert("Không thể tải thông tin thể loại.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin thể loại:", error);
      alert("Đã xảy ra lỗi khi lấy thông tin thể loại.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thể loại này?");
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/category/delete/${categoryId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();

        if (data.code === 200) {
          alert("Xóa thành công!");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          ); // Xóa thể loại khỏi danh sách
        } else {
          alert("Xóa không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa thể loại:", error);
        alert("Đã xảy ra lỗi khi xóa.");
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Cập nhật trang hiện tại
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Cập nhật số dòng mỗi trang
    setPage(0); // Reset về trang đầu tiên
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  // Lấy dữ liệu của trang hiện tại
  const paginatedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên Thể Loại</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.cateName}</TableCell>
              <TableCell>{category.cateDescription}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewCategory(category.id)}>Xem</Button>
                <Button
                  onClick={() => handleDeleteCategory(category.id)}
                  color="error"
                >
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
        count={categories.length} // Tổng số thể loại
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số dòng mỗi trang
      />

      {/* Modal Hiển Thị Thông Tin Thể Loại */}
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
          {selectedCategory ? (
            <>
              <Typography variant="h6" component="h2">
                Thông Tin Thể Loại
              </Typography>
              <Typography variant="body1">ID: {selectedCategory.id}</Typography>
              <Typography variant="body1">Tên: {selectedCategory.name}</Typography>
              <Typography variant="body1">Mô Tả: {selectedCategory.description}</Typography>
            </>
          ) : (
            <Typography variant="body1">Đang tải...</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CategoryTable;

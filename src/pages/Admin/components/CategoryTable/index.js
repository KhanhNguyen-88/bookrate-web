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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({
    cateName: "",
    cateDescription: "",
    cateImage: "",
  });

  useEffect(() => {
    fetchCategories();
  }, [name, description, open]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/category/get-all`);
      const data = await response.json();
      if (data.code === 0) {
        setCategories(data.result);
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
        setSelectedCategory(data.result);
        setName(data.result.cateName);
        setDescription(data.result.cateDescription);
        setId(data.result.id);
        setOpen(true);
      } else {
        alert("Không thể tải thông tin thể loại.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin thể loại:", error);
      alert("Đã xảy ra lỗi khi lấy thông tin thể loại.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/category/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Number(selectedCategory.id),
            cateName: name,
            cateDescription: description,
            cateImage: "",
          }),
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        alert("Update thành công.");
      } else {
        alert("Update lỗi");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin thể loại:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin thể loại.");
    }
    handleClose();
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa thể loại này?"
    );
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
          );
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
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleOpenAddDialog = () => {
    setNewCategory({ cateName: "", cateDescription: "", cateImage: "" });
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/category/add",
        newCategory
      );
      if (response.data.code === 200 || response.data.code === 0) {
        alert("Thêm thể loại thành công!");
        fetchCategories();
        setOpenAddCategoryDialog(false);
      } else {
        alert("Thêm thể loại thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm thể loại mới:", error);
      alert("Đã xảy ra lỗi khi thêm thể loại.");
    }
  };

  const paginatedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="success" onClick={handleOpenAddDialog}>
          Thêm Thể Loại
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên Thể Loại</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.cateName}</TableCell>
              <TableCell>{category.cateDescription}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewCategory(category.id)}>
                  Xem
                </Button>
                {/* <Button onClick={() => handleDeleteCategory(category.id)} color="error">
                  Xóa
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={categories.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />

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
          <Typography variant="h6" component="h2" gutterBottom>
            Chỉnh sửa Thể Loại
          </Typography>

          <TextField
            label="ID"
            value={selectedCategory?.id || ""}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Hủy
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm Thể Loại Mới</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên thể loại"
            value={newCategory.cateName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, cateName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mô tả"
            value={newCategory.cateDescription}
            onChange={(e) =>
              setNewCategory({ ...newCategory, cateDescription: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy</Button>
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryTable;

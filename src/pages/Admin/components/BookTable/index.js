import React, { useState, useEffect } from "react";
import {
  Grid,
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
  Link,
} from "@mui/material";

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/book/admin-get-all-book"
      );
      const data = await response.json();
      if (data.code === 200) {
        setBooks(data.result);
      } else {
        alert("Không thể tải danh sách sách.");
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách sách:", error);
      alert("Đã xảy ra lỗi khi tải danh sách sách.");
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onDelete = (bookId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá không?");
    if (confirmDelete) {
      // Gọi API hoặc logic xoá
      console.log("Đã xoá!");
    } else {
      console.log("Đã huỷ xoá.");
    }
  };

  const paginatedBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên sách</TableCell>
            <TableCell>Tác giả</TableCell>
            <TableCell>Ngày đăng</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.bookAuthor}</TableCell>
              <TableCell>{new Date(book.createdAt).toLocaleString("vi-VN")}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewBook(book)}>Xem</Button>
                <Button onClick={() => onDelete(book.id)} color="error">
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={books.length}
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
            width: 800,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Chi tiết sách
          </Typography>

          {selectedBook && (
            <Grid container spacing={2}>
              {/* Cột trái: ảnh sách */}
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    width: "100%",
                    height: 400,
                    bgcolor: "#f3e8ff",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {selectedBook.bookImage ? (
                    <img
                      src={`http://localhost:9000/image-book-rate/${selectedBook.bookImage}`}
                      alt="Book"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography variant="h4" color="primary">
                      +
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Cột phải: thông tin sách */}
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Tên sách"
                  value={selectedBook.bookName}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Mô tả"
                  value={selectedBook.bookDescription}
                  fullWidth
                  multiline
                  rows={2}
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Ngày xuất bản"
                      value={formatDate(selectedBook.publishedDate)}
                      fullWidth
                      margin="dense"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Format"
                      value={selectedBook.bookFormat || ""}
                      fullWidth
                      margin="dense"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Link bán sách"
                  value={selectedBook.bookSaleLink}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Tác giả"
                  value={selectedBook.bookAuthor}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Người tạo"
                  value={selectedBook.createdBy || ""}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              {/* Thể loại và nút đóng */}
              {/* <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Thể loại: {selectedBook.categoryName || "Không có"}
                </Typography>
              </Grid> */}
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" onClick={handleClose}>
                  Cập nhật
                </Button>
                <Button variant="contained" sx={{ marginLeft: 2 }} color="error" onClick={handleClose}>
                  Đóng
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default BookTable;

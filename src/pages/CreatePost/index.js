import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  createTheme,
  ThemeProvider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import axios from "axios";
import { getToken } from "../../services/localStorageService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Primary gốc
    },
    secondary: {
      main: amber[500],
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
});

function CreatePost({ handleClose }) {
  const [postImage, setPostImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [popupCategories, setPopupCategories] = useState([]);
  const [languages, setLanguages] = useState("1");
  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [bookFormat, setBookFormat] = useState("");
  const [bookSaleLink, setBookSaleLink] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({
    cateName: "",
    cateDescription: "",
    cateImage: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/category/get-all")
      .then((response) => {
        setCategories(response.data.result);
        setPopupCategories(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
      });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const token = getToken();

    // Dữ liệu đầu vào từ state
    const bookData = {
      bookName,
      bookDescription,
      bookImage: postImage,
      publishedDate,
      bookFormat,
      bookSaleLink,
      languageId: languages,
      bookAuthor,
      categoryId: selectedCategories.map((cat) => cat.id),
    };

    try {
      // Gửi request với Bearer Token
      const response = await axios.post(
        "http://localhost:8081/api/book/up-book",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log thành công
      console.log("Đăng bài thành công:", response.data);
      handleClose();
    } catch (error) {
      // Log chi tiết lỗi để kiểm tra
      console.error("Lỗi khi đăng bài:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        message: error.message,
      });
    }
  };

  const handleAddCategory = () => {
    setOpenPopup(true);
  };

  const handleSelectCategory = (category) => {
    if (!selectedCategories.find((cat) => cat.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleAddNewCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/category/add",
        newCategory
      );
      setCategories([...categories, response.data]);
      setPopupCategories([...popupCategories, response.data]);
      setOpenAddCategoryDialog(false);
      setNewCategory({ cateName: "", cateDescription: "", cateImage: "" });
    } catch (error) {
      console.error("Lỗi khi thêm thể loại mới:", error);
    }
  };

  // Filter categories based on search term
  const filteredCategories = popupCategories.filter((category) =>
    category.cateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "800px", // Increased width
          margin: "0 auto",
          padding: "15px",
          backgroundColor: "#fffdf7",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Tạo Bài Viết Mới
        </Typography>

        <Grid container spacing={2}>
          {/* Book Image and Details */}
          <Grid item xs={12} sm={4}>
            <label
              htmlFor="bookImage"
              style={{ cursor: "pointer", display: "block" }}
            >
              {postImage ? (
                <img
                  src={postImage}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "360px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "360px",
                    backgroundColor: "#f3e5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    color: theme.palette.primary.main,
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </Box>
              )}
            </label>
            <input
              type="file"
              id="bookImage"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Grid>

          {/* Book Details */}
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Tên sách"
              variant="outlined"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Mô tả ngắn"
              variant="outlined"
              multiline
              rows={3}
              margin="normal"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              size="small"
            />
            {/* Book Info Fields */}
            <Grid>
              <TextField
                xs={8}
                label="Ngày xuất bản"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                size="small"
              />

              <TextField
                xs={4}
                label="Format"
                variant="outlined"
                value={bookFormat}
                onChange={(e) => setBookFormat(e.target.value)}
                size="small"
                sx={{ marginLeft: 15.5}}
              />
            </Grid>

            <TextField
              fullWidth
              label="Link bán sách"
              variant="outlined"
              value={bookSaleLink}
              onChange={(e) => setBookSaleLink(e.target.value)}
              size="small"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Tác giả"
              variant="outlined"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              size="small"
            />

            {/* Language Select */}

            <FormControl margin="normal" xs={4}>
              <InputLabel>Ngôn ngữ</InputLabel>
              <Select
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                label="Ngôn ngữ"
                size="small"
              >
                <MenuItem value="1">Tiếng Việt</MenuItem>
                <MenuItem value="2">English</MenuItem>
                <MenuItem value="3">Français</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Categories Selection */}
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Thể loại
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}
            >
              {selectedCategories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.cateName}
                  onDelete={() => handleRemoveCategory(category.id)}
                  sx={{
                    backgroundColor: "rgb(250, 128, 114, 0.2)",
                    color: theme.palette.primary.main,
                  }}
                />
              ))}
              <Button
                variant="outlined"
                onClick={handleAddCategory}
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }}
              >
                + Chọn thể loại
              </Button>
              <Button
                variant="text"
                onClick={handleOpenAddCategoryDialog}
                sx={{ color: theme.palette.primary.main }}
              >
                Tạo mới
              </Button>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 0",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Đăng bài
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Popup for selecting categories */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Chọn Thể Loại</DialogTitle>
        <DialogContent sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {/* Added scrolling */}
          <TextField
            fullWidth
            label="Tìm kiếm thể loại"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
          />
          <List>
            {filteredCategories.map((category) => (
              <ListItem
                key={category.id}
                button
                onClick={() => handleSelectCategory(category)}
              >
                <ListItemText primary={category.cateName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPopup(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding new category */}
      <Dialog
        open={openAddCategoryDialog}
        onClose={() => setOpenAddCategoryDialog(false)}
      >
        <DialogTitle>Thêm Thể Loại Mới</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên thể loại"
            value={newCategory.cateName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, cateName: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mô tả thể loại"
            value={newCategory.cateDescription}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                cateDescription: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ảnh thể loại (URL)"
            value={newCategory.cateImage}
            onChange={(e) =>
              setNewCategory({ ...newCategory, cateImage: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddCategoryDialog(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddNewCategory}
            sx={{ color: theme.palette.primary.main }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default CreatePost;

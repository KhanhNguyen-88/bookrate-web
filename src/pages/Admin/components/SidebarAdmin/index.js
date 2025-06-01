import React from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Badge } from "@mui/material";


const SidebarAdmin = ({ onSelect, currentView, count }) => (
  <Box
    sx={{
      width: "240px",
      backgroundColor: "#f5f5f5",
      height: "100vh",
      padding: "10px",
    }}
  >
    <List>
      <ListItem
        button
        selected={currentView === "dashboard"}
        onClick={() => onSelect("dashboard")}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#e0f7fa",
            color: "#0288d1",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b2ebf2",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ListItemIcon>
          <DashboardIcon sx={{ color: currentView === "dashboard" ? "#0288d1" : "inherit" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        selected={currentView === "users"}
        onClick={() => onSelect("users")}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#e0f7fa",
            color: "#0288d1",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b2ebf2",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ListItemIcon>
          <PeopleIcon sx={{ color: currentView === "users" ? "#0288d1" : "inherit" }} />
        </ListItemIcon>
        <ListItemText primary="Quản lý User" />
      </ListItem>

      <ListItem
        button
        selected={currentView === "cate"}
        onClick={() => onSelect("cate")}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#e0f7fa",
            color: "#0288d1",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b2ebf2",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ListItemIcon>
          <CategoryIcon sx={{ color: currentView === "cate" ? "#0288d1" : "inherit" }} />
        </ListItemIcon>
        <ListItemText primary="Quản lý thể loại" />
      </ListItem>

      <ListItem
        button
        selected={currentView === "review"}
        onClick={() => onSelect("review")}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#e0f7fa",
            color: "#0288d1",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b2ebf2",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ListItemIcon>
          <Badge badgeContent={count} color="error"></Badge>
          <BookIcon sx={{ color: currentView === "review" ? "#0288d1" : "inherit" }} />
        </ListItemIcon>
        <ListItemText primary="Duyệt sách" />
      </ListItem>
      <ListItem
        button
        selected={currentView === "book"}
        onClick={() => onSelect("book")}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#e0f7fa",
            color: "#0288d1",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b2ebf2",
          },
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ListItemIcon>
          <LibraryBooksIcon sx={{ color: currentView === "book" ? "#0288d1" : "inherit" }} />
        </ListItemIcon>
        <ListItemText primary="Quản lý sách" />
      </ListItem>
    </List>
  </Box>
);


export default SidebarAdmin;

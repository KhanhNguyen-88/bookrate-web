import React from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const SidebarAdmin = ({ onSelect }) => (
    <Box sx={{ width: "240px", backgroundColor: "#f5f5f5", height: "120vh", padding: "10px"}}>
        <List>
            <ListItem button onClick={() => onSelect("dashboard")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => onSelect("users")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý User" />
            </ListItem>
            <ListItem button onClick={() => onSelect("cate")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý thể loại" />
            </ListItem>
            <ListItem button onClick={() => onSelect("review")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Duyệt sách" />
            </ListItem>
        </List>
    </Box>
);

export default SidebarAdmin;

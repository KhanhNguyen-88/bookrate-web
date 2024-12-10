import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const UserTable = ({ users, onDelete, onEdit }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hành động</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.userEmail}</TableCell>
                    <TableCell>
                        <Button onClick={() => onEdit(user)}>Sửa</Button>
                        <Button onClick={() => onDelete(user.id)} color="error">
                            Xóa
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default UserTable;


import React, { useEffect, useState } from "react";
import SidebarAdmin from "./components/SidebarAdmin";
import PostChart from "./components/PostChart";
import UserTable from "./components/UserTable";
import ReviewBook from "./components/ReviewBook";

function Admin() {
    const [view, setView] = useState("dashboard");
    const [users, setUsers] = useState([]);

    const postData = [
        { date: "Monday", posts: 5 },
        { date: "Tuesday", posts: 8 },
        { date: "Wednesday", posts: 10 },
        { date: "Thursday", posts: 7 },
        { date: "Friday", posts: 12 },
        { date: "Saturday", posts: 15 },
        { date: "Sunday", posts: 9 },
    ];
    useEffect(()=>{
        fetch("http://localhost:8081/api/user/get-all", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",    
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            setUsers(result.result);
        })
    }, [users])

    const handleDelete = async (id) => {
        // Hiển thị hộp thoại xác nhận
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8081/api/user/delete/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
    
                const result = await response.json();
    
                // Kiểm tra kết quả xóa
                if (result.code !== 200) {
                    alert("Xóa không thành công");
                } else {
                    alert("Xóa thành công!");
                    // Sau khi xóa, cập nhật lại danh sách người dùng
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                }
            } catch (error) {
                console.error("Có lỗi xảy ra khi xóa:", error);
                alert("Đã xảy ra lỗi khi xóa người dùng.");
            }
        }
    };
    
    return (
        <div>
            <SidebarAdmin onSelect={setView}/>
            <div style={{padding: "20px",  position: "absolute", left: "280px"}}>
                {view === "dashboard" && <PostChart data={postData} />}
                {view === "users" && <UserTable users={users} onDelete={(id)=>handleDelete(id) } />}
                {view === "review" && <ReviewBook/>}
            </div>
        </div>
    );
}

export default Admin;
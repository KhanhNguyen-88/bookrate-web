
import React, { useEffect, useState } from "react";
import SidebarAdmin from "./components/SidebarAdmin";
import PostChart from "./components/PostChart";
import UserTable from "./components/UserTable";

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

    // const users = [
    //     { id: 1, name: "Nguyen Van A", email: "a@gmail.com" },
    //     { id: 2, name: "Le Thi B", email: "b@gmail.com" },
    //     { id: 3, name: "Tran Van C", email: "c@gmail.com" },
    // ];
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

    const handleDelete = async (id)=>{
        const response = await fetch(`http://localhost:8081/api/user/delete/${id}`,{
            method: "GET",
            headers :{
                "Content-Type": "application/x-www-form-urlencoded", 
            }
        })
         const result = response.json();
         if(result.code == 200){
            alert("Xóa không thành công");
         }else{
            alert("Xóa thành công!");
         }
    }
    return (
        <div style={{ display: "flex" }}>
            <SidebarAdmin onSelect={setView} />
            <div style={{ flex: 1, padding: "20px" }}>
                {view === "dashboard" && <PostChart data={postData} />}
                {view === "users" && <UserTable users={users} onDelete={(id)=>handleDelete(id) } />}
            </div>
        </div>
    );
}

export default Admin;
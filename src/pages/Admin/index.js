import React, { useEffect, useState } from "react";
import SidebarAdmin from "./components/SidebarAdmin";
import PostChart from "./components/PostChart";
import UserTable from "./components/UserTable";
import ReviewBook from "./components/ReviewBook";
import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import HeaderAdmin from "./components/HeaderAdmin";
import Header from "../../components/Header";
import PieChartWithLegend from "./components/PieChartWithLegend";
import AccessChart from "./components/AccessChart";
import BookChart from "./components/BookChart";
import CategoryTable from "./components/CategoryTable";

const cx = classNames.bind(styles);
function Admin() {
  const [view, setView] = useState("dashboard");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/user/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUsers(result.result);
      });
  }, []);

  const handleDelete = async (id) => {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/user/delete/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

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
    <div className={cx("wrapper")}>
      <div className = {cx("header")}>
        <HeaderAdmin></HeaderAdmin>
      </div>
      <div className = {cx("content")}>
        <div className = {cx("sidebar")}>
          <SidebarAdmin onSelect={setView} />
        </div>
        <div className={cx("mainContent")}>
          {view === "dashboard" && (
            <div className = {cx("dashboard")}>
              <div className = {cx("topChart")}>
                <div><BookChart/></div>
                <div><AccessChart/></div>
              </div>
              <div className = {cx("lastChart")}>
                <div><PieChartWithLegend/></div>
              </div>
            </div>
          )}
          {view === "users" && (
            <UserTable users={users} onDelete={(id) => handleDelete(id)} />
          )}
          {view === "review" && <ReviewBook />}
          {view === "cate" && <CategoryTable />}
        </div>
      </div>
    </div>
  );
}

export default Admin;

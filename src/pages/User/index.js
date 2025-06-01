import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UserInfo from "./component/UserInfo";
import style from "./User.module.scss";
import { getToken } from "../../services/localStorageService";

const cx = classNames.bind(style);

function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const token = getToken();
  useEffect(()=>{
    const fetchUserData = async ()=>{
      try{
        const userResponse = await fetch(
          "http://localhost:8081/api/user/detail-by-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user profile. Status: ${userResponse.status}`
          );
        }

        const userResult = await userResponse.json();
        const userData = userResult.result;
        console.log("userId", userData.id)
        setUserData(userResult.result);
      }
      catch(error){
        console.error("Error fetching profile data:", error);
      }
    }
    fetchUserData();
  }, [token])
  return !token ? (
    <Navigate to="/login" />
  ) :(
    <div className={cx("wrapper")}>
      <div className={cx("userInfo")}>
       {userData.id === Number(userId) ? <Navigate to={"/user/profile"}/> :<UserInfo/>} 
      </div>
      <div className={cx("moreInfo")}></div>
    </div>
  );
}

export default User;

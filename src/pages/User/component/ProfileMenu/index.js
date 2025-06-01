import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../../NewExplore/components/PaginatedItems";
import { useParams } from "react-router-dom";
import Book from "../../../NewExplore/components/Book";
import style from "./TabContent.module.scss";
import classNames from "classnames/bind";

const CustomTabs = styled(Tabs)({
  minHeight: "36px",
  ".MuiTabs-flexContainer": {
    minHeight: "36px",
  },
  ".MuiTabs-indicator": {
    backgroundColor: "##EF2A50",
    height: "2px",
    bottom: "2px",
  },
});

const CustomTab = styled(Tab)({
  color: "#999",
  fontWeight: "bold",
  fontSize: "12px",
  textTransform: "none",
  padding: "4px 10px",
  margin: "0 4px",
  minHeight: "36px",
  "&.Mui-selected": {
    color: "##EF2A50",
  },
});

function ProfileMenu({ dataLove, dataPost, unPost }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabs value={selectedTab} onChange={handleTabChange}>
        <CustomTab
          icon={<DescriptionIcon />}
          iconPosition="start"
          label="Bài viết"
        />
        <CustomTab
          icon={<FavoriteIcon />}
          iconPosition="start"
          label="Yêu thích"
        />
        <CustomTab
          icon={<BorderColorIcon />}
          iconPosition="start"
          label="Chờ duyệt"
        />
      </CustomTabs>
      <TabContent
        selectedTab={selectedTab}
        dataLove={dataLove}
        dataPost={dataPost}
        unPost={unPost}
      />
    </Box>
  );
}

function TabContent({ selectedTab, dataLove, dataPost, unPost }) {
  const cx = classNames.bind(style);
  const renderBook = () => {
    return dataLove.map((item, index) => {
      return <Book book={item} key={index}></Book>;
    });
  };
  const renderUnBook = () => {
    return unPost.map((item, index) => {
      return <Book book={item} key={index}></Book>;
    });
  };
  const renderPost = () => {
    return dataPost.map((item, index) => {
      return <Book book={item} key={index}></Book>;
    });
  };
  switch (selectedTab) {
    case 0:
      return <div className={cx("wrapperPosts")}>{renderPost()}</div>;
    case 1:
      return <div className={cx("wrapperFavor")}>{renderBook()}</div>;
    case 2:
      return <div className={cx("wrapperFavor")}>{renderUnBook()}</div>;
    default:
      return null;
  }
}

export default ProfileMenu;

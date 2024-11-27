import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Tab, Tabs, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import PaginatedItems from '../../../NewExplore/components/PaginatedItems';

const CustomTabs = styled(Tabs)({
  minHeight: '36px',
  '.MuiTabs-flexContainer': {
    minHeight: '36px',
  },
  '.MuiTabs-indicator': {
    backgroundColor: '#000',
    height: '2px',
    bottom: '2px',
  },
});

const CustomTab = styled(Tab)({
  color: '#999',
  fontWeight: 'bold',
  fontSize: '12px',
  textTransform: 'none',
  padding: '4px 10px',
  margin:"0 4px",
  minHeight: '36px',
  '&.Mui-selected': {
    color: '#000',
  },
});

function ProfileMenu({dataPost, dataLove}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTabs value={selectedTab} onChange={handleTabChange} centered>
        <CustomTab icon={<DescriptionIcon />} iconPosition="start" label="Bài viết" />
        <CustomTab icon={<FavoriteIcon />} iconPosition="start" label="Yêu thích" />
      </CustomTabs>
      <TabContent selectedTab={selectedTab} dataLove={dataLove}/>
    </Box>
  );
}

function TabContent({ selectedTab, dataLove, dataPost }) {
  switch (selectedTab) {
    case 0:
      return 
    case 1:
      return <PaginatedItems items={dataLove.data}/>;
    default:
      return null;
  }
}

export default ProfileMenu;
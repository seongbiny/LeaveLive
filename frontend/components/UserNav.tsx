import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Router from 'next/router';
import Paper from '@mui/material/Paper';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    Router.push(`/${newValue}`)
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Main"
          value="main"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="bookmark"
          value="bookmark"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction label="diary" value="diary" icon={<FolderIcon />} />
        <BottomNavigationAction
          label="search"
          value="search/map"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="share"
          value="share"
          icon={<CameraAltIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

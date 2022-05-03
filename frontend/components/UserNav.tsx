import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Router from 'next/router';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    Router.push(`/${newValue}`)
  };

  return (
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
        label="reservation"
        value="reservation"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
}

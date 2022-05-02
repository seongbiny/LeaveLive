import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import Router from 'next/router';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    Router.push(`/${newValue}`)
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value=""
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="bookmark"
        value="bookmark"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="reservation"
        value="reservation"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction label="diary" value="diary" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}

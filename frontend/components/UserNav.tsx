import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Router from "next/router";
import Paper from "@mui/material/Paper";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    Router.push(`/${newValue}`);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="main" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction
          value="search/map"
          icon={<SearchRoundedIcon />}
        />
        <BottomNavigationAction value="share" icon={<CameraAltIcon />} />
        <BottomNavigationAction value="bookmark" icon={<StarRoundedIcon />} />
        <BottomNavigationAction
          value="diary"
          icon={<CalendarMonthRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

import React, { useState, useCallback } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Router from "next/router";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const CeoNav = () => {
  const [value, setValue] = useState("recents");

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      Router.push(`/${newValue}`);
    },
    []
  );

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction value="ceo" icon={<HomeRoundedIcon />} />
      <BottomNavigationAction
        value="ceo/bnb"
        icon={<FormatListBulletedRoundedIcon />}
      />
      <BottomNavigationAction
        value="ceo/reservation"
        icon={<CalendarMonthRoundedIcon />}
      />
    </BottomNavigation>
  );
};

export default CeoNav;

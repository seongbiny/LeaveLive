import React, { useState, useEffect, useCallback } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Router from "next/router";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Paper from "@mui/material/Paper";

const CeoNav = () => {
  const [value, setValue] = useState<string>();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      Router.push(`${newValue}`);
    },
    []
  );

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="/ceo" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction
          value="/ceo/bnb"
          icon={<FormatListBulletedRoundedIcon />}
        />
        <BottomNavigationAction
          value="/ceo/reservation"
          icon={<CalendarMonthRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default CeoNav;

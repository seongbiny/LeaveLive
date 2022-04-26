import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main, Camera, Bookmark, Diary } from "../screens";
import MainNavigator from "./MainNavigator";
const Tab = createBottomTabNavigator();

const TabNav = () => {
    return <Tab.Navigator>
        <Tab.Screen name="MainNavigator" component={MainNavigator} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
        <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
}

export default TabNav;
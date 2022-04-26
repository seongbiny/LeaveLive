import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main, Camera, Bookmark, Diary } from "../screens";

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return <Tab.Navigator>
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
        <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
}

export default TabNav;
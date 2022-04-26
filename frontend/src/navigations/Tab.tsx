import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, Bookmark, Diary } from "../screens";
import MainNavigator from "./MainNavigator";
import { MaterialIcons } from '@expo/vector-icons';

// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type TabParamList = {
    MainNavigator: undefined,
    Camera: undefined,
    Bookmark: undefined,
    Diary: undefined,
}

const Tab = createBottomTabNavigator<TabParamList>();

const TabNav = () => {
    return <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="MainNavigator" component={MainNavigator} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Bookmark" component={Bookmark} />
        <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
}

export default TabNav;
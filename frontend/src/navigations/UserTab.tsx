import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Search, Camera, Bookmark, Diary } from "../screens";
import MainNavigator from "./HomeNavigator";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { UserTabParamList, TabBarIconProp } from "./TabTypes";

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserTabNav = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.main,
      }}
    >
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <FontAwesome
              name="home"
              size={26}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <FontAwesome
              name="search"
              size={23}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <Entypo
              name="camera"
              size={24}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <AntDesign
              name="star"
              size={24}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <Entypo
              name="calendar"
              size={24}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabNav;

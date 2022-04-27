import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./UserStack/HomeStack";
import DiaryStack from "./UserStack/DiaryStack";
import CameraStack from "./UserStack/CameraStack";
import BookmarkStack from "./UserStack/BookmarkStack";
import SearchStack from "./UserStack/SearchStack";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";


// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type TabParamList = {
  HomeStack: undefined;
  SearchStack: undefined;
  CameraStack: undefined;
  BookmarkStack: undefined;
  DiaryStack: undefined;
};

type TabBarIconProp = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();

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
        name="HomeStack"
        component={HomeStack}
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
        name="SearchStack"
        component={SearchStack}
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
        name="CameraStack"
        component={CameraStack}
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
        name="BookmarkStack"
        component={BookmarkStack}
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
        name="DiaryStack"
        component={DiaryStack}
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

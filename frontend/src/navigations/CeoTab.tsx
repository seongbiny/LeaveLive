import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CeoHomeStack, CeoListStack, CeoReservationStack } from "./CeoStack";
import { CeoTabParamList, TabBarIconProp } from "./TabTypes";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<CeoTabParamList>();

const CeoTabNav = () => {
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
        name="CeoHomeStack"
        component={CeoHomeStack}
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
        name="CeoListStack"
        component={CeoListStack}
        options={{
          tabBarIcon: (props: TabBarIconProp) => (
            <Entypo
              name="list"
              size={24}
              color={props.focused ? props.color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CeoReservationStack"
        component={CeoReservationStack}
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

export default CeoTabNav;

import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CeoReservationList } from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { headerTitleStyle } from "../TabTypes";

export type StackParamList = {
  CeoReservationList: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const StackNav = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.main,
        headerTitleAlign: "center",
        headerTitleStyle: headerTitleStyle,
        headerLeft: ({ onPress }) => {
          return (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              style={{ marginLeft: 8 }}
              color={theme.main}
              onPress={onPress}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="CeoReservationList"
        component={CeoReservationList}
        options={{
          headerTitle: "예약 확인",
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

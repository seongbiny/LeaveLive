import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CeoHome } from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { headerTitleStyle } from "../TabTypes";

export type StackParamList = {
  CeoHome: undefined;
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
        name="CeoHome"
        component={CeoHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

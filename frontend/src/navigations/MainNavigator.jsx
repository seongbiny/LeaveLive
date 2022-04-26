import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Camera } from "../screens";

const Stack = createStackNavigator();

const StackNav = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Camera2" component={Camera} />
    </Stack.Navigator>
}

export default StackNav;
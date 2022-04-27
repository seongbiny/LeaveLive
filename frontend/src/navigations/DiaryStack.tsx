import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Diary from '../screens/Diary/Diary';
import Profile from '../screens/Diary/profile';

const Stack = createStackNavigator();

const DiaryStack: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Diary"
                component={Diary}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
        </Stack.Navigator>
    );
};

export default DiaryStack;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from '../../screens/Camera/Camera';

const Stack = createStackNavigator();

const CameraStack: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Camera"
                component={Camera}
            />
        </Stack.Navigator>
    );
};

export default CameraStack;
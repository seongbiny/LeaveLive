import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Bookmark } from '../../screens';

const Stack = createStackNavigator();

const BookmarkStack: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Bookmark"
                component={Bookmark}
            />
        </Stack.Navigator>
    );
};

export default BookmarkStack;
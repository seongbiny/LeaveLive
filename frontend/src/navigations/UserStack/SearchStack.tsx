import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import activityList from '../../screens/Search/activityDetail';
import activityDetail from '../../screens/Search/activityDetail';
import BnbDetail from '../../screens/Search/BnbDetail';
import BnbList from '../../screens/Search/BnbList';
import mainSelection from '../../screens/Search/mainSelection';
import regionSelection from '../../screens/Search/regionSelection';
import reservation from '../../screens/Search/reservation';
import reservationComplete from '../../screens/Search/reservationComplete';

const Stack = createStackNavigator();

const SearchStack: React.FunctionComponent = () => {
    return (
        <Stack.Navigator initialRouteName='BnbList'>
            <Stack.Screen
                name="BnbList"
                component={BnbList}
                options={{ 
                    headerTitle: '제주도',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="regionSelection"
                component={regionSelection}
            />
            <Stack.Screen
                name="mainSelection"
                component={mainSelection}
            />
            <Stack.Screen
                name="BnbDetail"
                component={BnbDetail}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="activityList"
                component={activityList}
            />
            <Stack.Screen
                name="activityDetail"
                component={activityDetail}
            />
            <Stack.Screen
                name="reservation"
                component={reservation}
            />
            <Stack.Screen
                name="reservationComplete"
                component={reservationComplete}
            />
        </Stack.Navigator>
    );
};

export default SearchStack;
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/Home';
import FoodDetail from '../screens/FoodDetail';
import OnBoarding from '@screens/OnBoarding';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
    </Stack.Navigator>
  );
};

function Navigation() {
  const onBoarded = useSelector(
    (state: RootState) => state.onBoarding.onBoarded,
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!onBoarded ? (
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        ) : (
          <Stack.Screen name="AppStack" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

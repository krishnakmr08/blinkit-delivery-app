import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashBoard from '@features/delivery/DeliveryDashBoard';
import ProductCategories from '@features/category/ProductCategories';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import LiveTracking from '@features/map/LiveTracking';
import Profile from '@features/profile/Profile';
import DeliveryMap from '@features/delivery/DeliveryMap';


const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashBoard} />
        <Stack.Screen name="ProductCategories" component={ProductCategories} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
        <Stack.Screen name="LiveTracking" component={LiveTracking} />
        <Stack.Screen name="ProductOrder" component={ProductOrder} />
        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLogin}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

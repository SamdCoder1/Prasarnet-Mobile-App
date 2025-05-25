import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import CustomTabBar from './CustomNavigations/CustomTabBar';
// import SplashScreen2 from '../screens/SplashScreen2';
import DashboardScreen from '../screens/DashboardScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import EditProductScreen from '../screens/EditProductScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// NAVIGATION STACK AFTER LOGIN
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}

        // options={{
        //     header: () => <StackAppBar title="Edit Profile" />,
        // }}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
        options={{headerShown: false}}

        // options={{
        //     header: () => <StackAppBar title="Edit Profile" />,
        // }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function MainRoute() {
  const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowSplash(false);
  //   }, 1500);
  // }, []);

  // if (showSplash) {
  //   return <SplashScreen2 />;
  // }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

// NAVIGATION STACK BEFORE LOGIN
// function AuthStack() {
//     const isFirstTimeAppOpen = useStartupCarousalStore(
//         state => state.isFirstTimeAppOpen,
//     );
//     return (
//         <Stack.Navigator
//             initialRouteName={isFirstTimeAppOpen ? 'StartupCarousal' : 'Login'}
//             screenOptions={{headerShown: false}}>
//             <Stack.Screen
//                 name="StartupCarousal"
//                 component={StartupCarousalScreen}
//             />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Signup" component={SignUpScreen} />
//             <Stack.Screen
//                 name="SuccessfullSignup"
//                 component={SuccessfulRegistrationScreen}
//             />
//             <Stack.Screen
//                 name="ForgotPassword"
//                 component={ForgotPasswordScreen}
//             />
//             <Stack.Screen name="OtpScreen" component={OtpScreen} />
//             <Stack.Screen
//                 name="ResetPassword"
//                 component={ResetPasswordScreen}
//             />
//         </Stack.Navigator>
//     );
// }

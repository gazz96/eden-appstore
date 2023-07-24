/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text
} from 'react-native';



// library
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Screens
import SettingScreen from './screens/SettingScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';

// Constant
import { Colors, logoSrc } from './constant';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShopScreen from './screens/ShopScreen';
import RedeemScreen from './screens/RedeemScreen';
import SearchScreen from './screens/SearchScreen';
import DetailArticleScreen from './screens/DetailArticleScreen';
import SecurityScreen from './screens/SecurityScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import MyPropertiScreen from './screens/MyPropertiScreen';
import PropertiDetailScreen from './screens/PropertiDetailScreen';
import PropertyGalleryScreen from './screens/PropertyGalleryScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import KotaScreen from './screens/KotaScreen';

import { SessionAction, AuthAction } from './actions';
import { CustomDrawer, Loading } from './components';
import { LangContext, UserContext } from './context';
import MyReviewScreen from './screens/MyReviewScreen';

import Toast from 'react-native-toast-message';
import BlogsScreen from './screens/BlogsScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AddReviewScreen from './screens/AddReviewScreen';

import SearchAgentScreen from './screens/SearchAgentScreen';
import BookTableScreen from './screens/BookTableScreen';
import MemberCardScreen from './screens/MemberCardScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import WalletScreen from './screens/WalletScreen';
import DashboardMemberScreen from './screens/DashboardMemberScreen';
import DetailProductScreen from './screens/DetailProductScreen';
import DetailGiftScreen from './screens/DetailGiftScreen';
import BranchScreen from './screens/BranchScreen';

import MyRedeemScreen from './screens/MyRedeemScreen';
import SnapScreen from './screens/SnapScreen';
import TopupSnapScreen from './screens/TopupSnapScreen';
import AboutScreen from './screens/AboutScreen';
import MyTopupScreen from './screens/MyTopupScreen';

import FavoritesScreen from './screens/FavoritesScreen';

// Navigation
const Stack   = createNativeStackNavigator();
const Tab     = createBottomTabNavigator();

import OneSignal from 'react-native-onesignal';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TimelineScreen from './screens/TimelineScreen';
import MyOrderDetailScreen from './screens/MyOrderDetailScreen';
import { hookstate } from '@hookstate/core';
import ChangeLangScreen from './screens/ChangeLangScreen';
import HomeOrderScreen from './screens/HomeOrderScreen';
import FaqScreen from './screens/FaqScreen';
import CreateOrderScreen from './screens/CreateOrderScreen';
import MyReservationScreen from './screens/MyReservationScreen';
import PdfScreen from './screens/PdfScreen';
import MyShishaOrderScreen from './screens/MyShishaOrderScreen';
import SelectCountryScreen from './screens/SelectCountryScreen';


// OneSignal Initialization
OneSignal.setAppId('c09240ad-6762-45f0-97fd-e54610cb4289');


// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});




const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>}  screenOptions={{
      headerShown: false
    }}>

      <Drawer.Screen name="HOME" component={HomeScreen} options={{
        drawerLabel: 'HOMEPAGE'
      }}/>

      <Drawer.Screen name="FAVORITES" component={FavoritesScreen} options={{
        drawerLabel: 'FAVORITE EDEN'
      }}/>

      <Drawer.Screen name="MY RESERVATION" component={MyReservationScreen} options={{
        drawerLabel: 'FAVORITE EDEN'
      }}/>

      <Drawer.Screen name="ABOUT EDEN" component={AboutScreen} options={{
        drawerLabel: 'ABOUT EDEN'
      }}/>

      <Drawer.Screen name="WALLET" component={WalletScreen}  options={{
        drawerLabel: 'WALLET'
      }}/>

      <Drawer.Screen name="SETTINGS" component={DashboardMemberScreen} options={{
        drawerLabel: 'SETTINGS'
      }} />
      <Drawer.Screen name="TECHNICAL SUPPORT" component={HomeScreen} options={{
        drawerLabel: 'TECHNICAL SUPPORT'
      }} />
      <Drawer.Screen name="CARTS EDEN" component={CartScreen} options={{
        drawerLabel: 'CARTS'
      }} />
      <Drawer.Screen name="LOGOUT" component={LoginScreen} options={{
        drawerLabel: 'LOG-OUT'
      }} />
      <Drawer.Screen name="FAQ" component={FaqScreen} options={{
        drawerLabel: 'FAQ'
      }} />

    </Drawer.Navigator>
  );
}

const App = () => {

  const state = UserContext();

  return (
    <>
      <NavigationContainer>  
        
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen}/>
          
        
          {/* <Stack.Screen name="Splash" component={SplashScreen}/>  
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen}/>
          <Stack.Screen name="OnBoardingSecondScreen" component={OnBoardingSecondScreen}/> */}
          
          <Stack.Screen name="Login" component={LoginScreen}/> 
          <Stack.Screen name="Home" component={MyDrawer}/>
          {/* {
            [4,5].includes(state.get().role_id) ? 
              <Stack.Screen name="Home" component={HomeBottomNavigationWithAddProperty}/> : 
              <Stack.Screen name="Home" component={HomeBottomNavigation}/>
          } */}
          
          <Stack.Screen name="Delivery" component={DeliveryScreen}/>
          <Stack.Screen name="Member Card" component={MemberCardScreen}/>
          <Stack.Screen name="Detail Article" component={DetailArticleScreen}/>
          <Stack.Screen name="Register Screen" component={RegisterScreen}/>
          <Stack.Screen name="Account Security" component={SecurityScreen}/>
          <Stack.Screen name="My Property" component={MyPropertiScreen}/>
          <Stack.Screen name="My Order" component={MyOrderScreen}/>
          <Stack.Screen name="Home My Order" component={HomeOrderScreen}/>
          <Stack.Screen name="My Topup" component={MyTopupScreen}/>
          <Stack.Screen name="My Redeem" component={MyRedeemScreen}/>
          <Stack.Screen name="My Review" component={MyReviewScreen}/>
          <Stack.Screen name="Blogs" component={BlogsScreen}/>
          <Stack.Screen name="Kota" component={KotaScreen}/>
          <Stack.Screen name="Personal Info" component={PersonalInfoScreen}/>
          <Stack.Screen name="Reset Password" component={ResetPasswordScreen}/>
          <Stack.Screen name="Wallet" component={WalletScreen}/> 
          <Stack.Screen name="Dashboard" component={DashboardMemberScreen}/> 
          <Stack.Screen name="Detail Product" component={DetailProductScreen}/>
          <Stack.Screen name="Detail Gift" component={DetailGiftScreen}/> 
          
          <Stack.Screen name="Add Review" component={AddReviewScreen}/>
          <Stack.Screen name="Book Table" component={BookTableScreen}/>
          <Stack.Screen name="Shop" component={ShopScreen}/>
          <Stack.Screen name="Gateway" component={SnapScreen}/>
          <Stack.Screen name="Topup" component={TopupSnapScreen}/>
          <Stack.Screen name="About" component={AboutScreen}/>
          <Stack.Screen name="Redeem" component={RedeemScreen}/>
          <Stack.Screen name="Branch Map" component={BranchScreen}/>
          <Stack.Screen name="Carts" component={CartScreen}/>
          <Stack.Screen name="Checkout" component={CheckoutScreen}/>
          <Stack.Screen name="Timeline" component={TimelineScreen}/>
          <Stack.Screen name="Order Detail" component={MyOrderDetailScreen}/>
          <Stack.Screen name="Change Lang" component={ChangeLangScreen}/>
          <Stack.Screen name="Favorite" component={FavoritesScreen}/>
          <Stack.Screen name="Create Order" component={CreateOrderScreen}/>
          <Stack.Screen name="My Reservation" component={MyReservationScreen}/>
          <Stack.Screen name="Pdf" component={PdfScreen}/>
          <Stack.Screen name="My Shisha Order" component={MyShishaOrderScreen}/>

          <Stack.Screen name="Select Country" component={SelectCountryScreen}/>
          
          
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

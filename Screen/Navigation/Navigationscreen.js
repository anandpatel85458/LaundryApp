import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Mainscreen/Login';
import Home from '../Mainscreen/Home';
import Pickup from '../Mainscreen/Pickup';
import Cart from '../Mainscreen/Cart';
import Ragistration from '../Mainscreen/Ragistration';
import { Provider } from 'react-redux';
import Phonenumber from '../OtpVerification/Phonenumber';
import Otp from '../OtpVerification/Otp';
import Dressitem from '../Components/Dressitem';
import Store from '../ReduxToolkit/Store';
import Cart2 from '../Mainscreen/Cart2';
import Order from '../Mainscreen/Order';
import Splashscreen from '../Components/Splashscreen';



const Stack =createNativeStackNavigator();

const Navigationscreen = () => {

  // console.log(Store.getState());
  return (

    <Provider store={Store}>
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Splashscreen' component={Splashscreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Ragistration' component={Ragistration} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Pickup' component={Pickup} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Phonenumber' component={Phonenumber} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Otp' component={Otp} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Dressitem' component={Dressitem} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Cart' component={Cart} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Cart2' component={Cart2} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Order' component={Order} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
   </NavigationContainer>
   </Provider>
  )
}

export default Navigationscreen


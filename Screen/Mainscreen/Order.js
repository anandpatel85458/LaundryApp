import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';
import Colors from '../Components/Colors';

const Order = () => {
  return (
    <SafeAreaView>
      <LottieView
        source={require('../assets/Animation - 1713421925959.json')}
        autoPlay
        loop
        style={{
          height: moderateVerticalScale(360),
          width: moderateScale(300),
          alignSelf: 'center',
          marginTop: moderateVerticalScale(40),
          justifyContent: 'center',
          
        }}
        speed={0.7}
      />
      <Text style={{color:Colors.Blackopacity80,fontSize:scale(18),alignItems:'center',alignSelf:'center',fontWeight:'700'}}>Your order has been placed!</Text>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({});

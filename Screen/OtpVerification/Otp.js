import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Components/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {OtpInput} from 'react-native-otp-entry';

const windowwidth = Dimensions.get('window').width;
const windowheigth = Dimensions.get('window').height;

const Otp = ({navigation, route}) => {
  const confirmdatas = route.params.confirmdata;
  console.log("confirmdata2=>",confirmdatas);
 

  const [code, setcode] = useState('');
  console.log("code=>",code);

  const Confirmotp = async () => {
    console.log("hii");
    try {
      const res = await confirmdatas.confirm(code);
      
      console.log("res=>",res);
      const user = res.user;
      console.log('User verified:', user);
      
      navigation.push('Home');
    } catch (er) {
      console.error('error otp=>', er);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../assets/7070629_3293465.jpg')}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: scale(15),
            fontWeight: '900',
            color: Colors.black,
            bottom: moderateVerticalScale(50),
          }}>
          Enter Verification code
        </Text>
        <Text
          style={{
            fontSize: scale(15),
            fontWeight: '400',
            color: Colors.DarksilverColor,
            bottom: moderateVerticalScale(50),
          }}>
          We are automatically detecting SMS.
        </Text>
        <Text
          style={{
            fontSize: scale(15),
            // fontWeight: '900',
            color: Colors.DarksilverColor,
            bottom: moderateVerticalScale(50),
          }}>
          send to Your mobile phone number.
        </Text>
        <View
          style={{
            marginVertical: moderateVerticalScale(22),
            width: windowwidth - 72,
          }}>
          <OtpInput
            numberOfDigits={6}
            onTextChange={setcode}
            focusColor={Colors.LiteSilverColor}
            focusStickBlinkingDuration={400}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: Colors.White,
                width: moderateScale(40),
                height: moderateVerticalScale(40),
                borderRadius: 10,
              },
              pinCodeTextStyle: {
                color: Colors.black,
              },
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.verify}
          onPress={Confirmotp}>
          <Text style={styles.txtdata}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.White,
    // justifyContent:'center'
  },
  img: {
    height: windowheigth * 0.6,
    width: windowwidth * 0.8,
    borderColor: Colors.DarksilverColor,
  },
  verify: {
    height: windowheigth * 0.07,
    width: windowwidth - 40,
    backgroundColor: Colors.PurpleColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: moderateVerticalScale(30),
  },
  txtdata: {
    fontSize: scale(17),
    fontWeight: '900',
    textTransform: 'uppercase',
    color: Colors.White,
  },
});

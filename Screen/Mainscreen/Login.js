import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../Components/styles';
import Colors from '../Components/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [check, setcheck] = useState(false);
  const [visible, setvisible] = useState(false);
  const [loading, setloading] = useState(false);

  console.log('checkbox=>', check);

  const Togglebtn = () => {
    setvisible(!visible);
  };

  const Navigate = () => {
    navigation.push('Ragistration');
  };
  console.log('visible=>', visible);

  const Completefaugetpage = async () => {
    try {
      setloading(true);
      if (email.length > 0 && password.length > 0) {
        
        const isUserlogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log('isuserdata =>', isUserlogin);

        navigation.dispatch(
          StackActions.replace('Home', {
            emaildata: isUserlogin,
            uiddata: isUserlogin,
          }),
        );
      } else {
        console.log('invalid feild !');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('That email address is invalid!');
      } else {
        console.error(error.message);
      }
    }
    finally{
      setloading(false);
    }
  };


  return (
    <ScrollView style={{flex: 1, backgroundColor: '#D7DADA'}}>
      <View style={styles.container}>
       {
        loading && (
          <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}>
          <ActivityIndicator size="large" color={Colors.RedColors} />
        </View>
        )
       }
        <View style={styles.otherview}>
          <Text style={styles.text}>Hello , Guest!</Text>
          <Text style={styles.textstyle}>Welcome To Fauget</Text>
          <Text style={styles.diff}>
            Before continue , Please Sign in First
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={styles.img}
            source={require('../assets/Remove-removebg-preview.png')}
          />
        </View>
   
          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.RedColors} />
          </View> */}
      
          <KeyboardAvoidingView>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: moderateVerticalScale(30),
              }}>
              <TextInput
                style={styles.input}
                placeholder="enter the email id"
                placeholderTextColor={Colors.Blackopacity80}
                value={email}
                keyboardType="email-address"
                onChangeText={text => setemail(text)}
              />
            </View>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: moderateVerticalScale(10),
                flexDirection: 'row',
                marginLeft: moderateScale(25),
              }}>
              <TextInput
                style={styles.input1}
                placeholder="enter the password"
                placeholderTextColor={Colors.Blackopacity80}
                value={password}
                keyboardType="number-pad"
                onChangeText={text => setpassword(text)}
                secureTextEntry={!visible}
              />
              <TouchableOpacity
                onPress={Togglebtn}
                style={{alignItems: 'center', justifyContent: 'center'}}
                activeOpacity={0.8}>
                <Image
                  style={styles.icon}
                  source={
                    visible
                      ? require('../assets/eye.png')
                      : require('../assets/hidden.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: moderateVerticalScale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setcheck(!check)}>
                <Image
                  style={styles.imagedesign}
                  source={
                    !check
                      ? require('../assets/checkbox.png')
                      : require('../assets/blank-check-box.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push('Phonenumber')}>
                <Text style={styles.passwordata}>Forgot Password ? </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: moderateVerticalScale(30),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.touch}
                onPress={Completefaugetpage}>
                <Text style={styles.textview}>sign in</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: moderateVerticalScale(10),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontSize: scale(13), color: Colors.Blackopacity80}}>
                  Tap here , if You are Don't make?
                </Text>
                <TouchableOpacity onPress={Navigate}>
                  <Text
                    style={{
                      fontSize: scale(13),
                      fontWeight: '900',
                      color: Colors.black,
                      textAlign: 'center',
                    }}>
                    {' '}
                    New Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
    
      </View>
    </ScrollView>
  );
};

export default Login;

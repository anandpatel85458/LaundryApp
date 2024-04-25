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
  Alert
} from 'react-native';
import React, { useState } from 'react';
import styles from '../Components/styles';
import Colors from '../Components/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Registraion = ({ navigation }) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [address, setaddress] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [check, setcheck] = useState(false);
  const [visible, setvisible] = useState(false);
  const [message, setMessage] = useState('');

  console.log('checkbox=>', check);

  const Togglebtn = () => {
    setvisible(!visible);
  };

  // const Navigate = () => {
  //   navigation.push('Login');
  // };
  console.log('visible=>', visible);

  const CompleteLoginpage = async () => {
    try {
      if (firstname.length > 0 && lastname.length > 0 && address.length > 0 && email.length > 0 && password.length > 0) {
        const logindata = await auth().createUserWithEmailAndPassword(email, password);
        console.log("logindata=>", logindata);
  
        const firebasedata = await firestore().collection('user').doc(logindata.user.uid).set({
          id: logindata.user.uid,
          firstname: firstname,
          lastname: lastname,
          address: address,
          email: email,
          password: password // corrected property name
        })
        .then(() => {
          console.log("complete login=>", firebasedata);
          return firebasedata;
          // returning the value from Firestore operation
        })
  
        await logindata.user.sendEmailVerification(); // corrected property name
        // Alert.alert("Please check your email address");
        await auth().signOut();
        navigation.navigate('Login');
      } else {
        console.log("Please enter all the fields!");
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
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#D7DADA' }}>
      <View style={styles.container}>
        <View style={styles.otherview}>
          <Text style={styles.textstyle}>Don't Have an Account?</Text>
          <Text style={styles.account}>Create Your Account</Text>
          <Text style={style.quik}>It is quik and easy</Text>
        </View>
        <View style={style.mainview}>
          <TextInput
            style={style.firstnamedata}
            placeholder="first name"
            placeholderTextColor={Colors.DarksilverColor}
            value={firstname}
            onChangeText={text => setfirstname(text)}
          />
          <TextInput
            style={style.firstnamedata}
            placeholder="last name"
            placeholderTextColor={Colors.DarksilverColor}
            value={lastname}
            onChangeText={text => setlastname(text)}
          />
        </View>
        <TextInput
          style={style.address}
          placeholder="enter your address"
          placeholderTextColor={Colors.DarksilverColor}
          value={address}
          onChangeText={text => setaddress(text)}
        />
        <TextInput
          style={style.email}
          placeholder="enter your email"
          placeholderTextColor={Colors.DarksilverColor}
          value={email}
          onChangeText={text => setemail(text)}
          keyboardType='email-address'
        />
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
            placeholderTextColor={Colors.DarksilverColor}
            value={password}
            keyboardType="number-pad"
            onChangeText={text => setpassword(text)}
            secureTextEntry={!visible}
          />
          <TouchableOpacity
            onPress={Togglebtn}
            style={{ alignSelf: 'center' }}
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

            // justifyContent: 'space-between',
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
          <Text style={style.condition}>I agree Use Term and Conditions </Text>
        </View>

        <TouchableOpacity style={style.touch} onPress={CompleteLoginpage}>
          <Text style={{ fontSize: scale(22), textTransform: 'uppercase' }}>sign in</Text>
        </TouchableOpacity>
        <Text style={style.signin}>back to sign in</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  firstnamedata: {
    height: moderateVerticalScale(50),
    width: moderateScale(150),
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    fontSize: scale(20),
    color: Colors.black
  },
  mainview: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: moderateVerticalScale(50),
  },
  address:
  {
    height: moderateVerticalScale(50),
    width: moderateScale(320),
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    fontSize: scale(20),
    color: Colors.black,
    marginTop: moderateVerticalScale(20),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.White
  },
  email:
  {
    height: moderateVerticalScale(50),
    width: moderateScale(320),
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    fontSize: scale(20),
    color: Colors.black,
    marginTop: moderateVerticalScale(20),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.White
  },
  condition:
  {
    fontSize: scale(18),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10),
    color: Colors.PurpleColor
  },
  touch:
  {
    height: moderateVerticalScale(50),
    width: moderateScale(320),
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateVerticalScale(30),
    backgroundColor: Colors.SkyBlue
  },
  quik:
  {
    fontSize: scale(15),
    color: Colors.blackOpacity5,
    marginTop: moderateVerticalScale(20)
  },
  signin:
  {
    fontSize: scale(16),
    alignItems: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: Colors.PurpleColor,
    letterSpacing: 2
  }
});

export default Registraion;

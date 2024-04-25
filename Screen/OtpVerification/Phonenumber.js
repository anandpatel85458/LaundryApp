import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Components/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';


const windowheigth = Dimensions.get('window').height;
const windowwidth = Dimensions.get('window').width;

const Phonenumber = ({navigation}) => {
  const [areas, setareas] = useState([]);
  const [selectedArea, setselectedArea] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(res => res.json())
      .then(data => {
        console.log('data=>', data);
        let areadata = data.map(item => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });
        setareas(areadata);
        if (areadata.length > 0) {
          let defaultdata = areadata.filter(a => a.code == 'US');
          if (defaultdata.length > 0) {
            setselectedArea(defaultdata[0]);
          }
        }
      });
  }, []);

  const RenderAreascodeModal = () => {

    const renderItem =({item})=>
    {
        return(
            <TouchableOpacity onPress={()=>
            {
                setselectedArea(item);
                setmodalVisible(false);
            }}
            style={{
                flexDirection:'row',
                padding:10,
                alignItems:'center',
                
            }}
            >
                <Image 
                source={{uri:item.flag}}
                resizeMode="contain"
                style={styles.flag}
                
                />
                <Text style={{color:Colors.black,textAlign:'center',paddingHorizontal:moderateScale(10)}}>{item.item} </Text>
            </TouchableOpacity>
        )
    }

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setmodalVisible(false)}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{
                    height:windowheigth,
                    width:windowwidth,
                    backgroundColor:Colors.SkyBlue,
                }}>
                    <TouchableOpacity style={{
                        position:'absolute',
                        top:moderateVerticalScale(20),
                        right:moderateScale(22),
                        width:moderateScale(42),
                        height:moderateVerticalScale(42),
                        backgroundColor:Colors.White,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:21
                    }}
                    onPress={()=>setmodalVisible(false)}
                    >
                        <Image
                        resizeMode='contain'
                        style={{
                            height:moderateVerticalScale(20),
                            width:moderateScale(20),
                            tintColor:Colors.SkyBlue
                        }}
                        source={require('../assets/close_FILL0_wght400_GRAD0_opsz24.png')}
                        />
                    </TouchableOpacity>

                    <FlatList
                    data={areas}
                    renderItem={renderItem}
                    
                    keyExtractor={item=>item.code}
                    style={{padding:20,marginBottom:moderateVerticalScale(20)}}
                    />

                </View>

            </View>

          </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const [code,setcode] =useState('');
  const [confirm,setconfirm] =useState(null);
  const [phonenumber, setphonenumber] = useState('');
  const [mobilenNo, setmobilenNo] = useState('');


  const SigningWithPhonenumber = async ()=>
  {
    try {
      const mobile =  '+91'+ phonenumber;
      const confirmation = await auth().signInWithPhoneNumber(mobile);
      setconfirm(confirmation);
      console.log("otp is set",confirmation);
      navigation.push('Otp',{confirmdata:confirmation});
      
    } catch (error) {
      console.error("error=>",error);
    }
  };

 
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          source={require('../assets/6310507.jpg')}
          style={styles.img}
          resizeMode="contain"
        />

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: scale(17),
              fontWeight: '900',
              color: Colors.black,
            }}>
            Enter Your Phone Number
          </Text>
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: '900',
              color: Colors.DarksilverColor,
            }}>
            We will send you a verified code
          </Text>

          <View style={styles.inputcontainer}>
            <TouchableOpacity style={styles.touch} onPress={()=>setmodalVisible(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../assets/expand_more_FILL0_wght400_GRAD0_opsz24.png')}
                  resizeMode="contain"
                  style={styles.downicon}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: moderateScale(5),
                }}>
                <Image
                  source={{uri:selectedArea ?.flag}}
                  resizeMode="contain"
                  style={styles.flag}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: moderateScale(5),
                }}>
                <Text
                  style={{
                    fontSize: scale(15),
                    fontWeight: '700',
                    color: Colors.DarksilverColor,
                  }}>
                  {selectedArea.callingCode}
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="enter the mobile number"
              placeholderTextColor={Colors.black}
              selectionColor={Colors.black}
              keyboardType="numeric"
              onChangeText={(text) => setphonenumber(text)}
              value={phonenumber}
            />
          </View>

          <TouchableOpacity style={styles.verify} onPress={SigningWithPhonenumber}>
            <Text style={styles.txtdata}>Verified</Text>
          </TouchableOpacity>
          <View style={styles.bottomcontainer}>
            <Text style={{fontSize: scale(12), color: Colors.DarksilverColor}}>
              By continuing you agree with calerio challenge
            </Text>
            <Text style={{fontSize: scale(12), color: Colors.DarksilverColor}}>
              Terms of Use and Privacy Policy
            </Text>
          </View>
        </View>
      </View>
      {RenderAreascodeModal()}
    </SafeAreaView>
  );
};

export default Phonenumber;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 16,
  },
  img: {
    height: windowheigth * 0.5,
    width: windowheigth * 0.8,
    marginBottom: moderateVerticalScale(12),
  },
  flag: {
    height: moderateVerticalScale(30),
    width: moderateScale(30),
  },
  input: {
    flexDirection: 'row',
    borderColor: Colors.greyColor,
    borderBottomWidth: 0.4,
    height: moderateVerticalScale(50),
    width: moderateScale(250),
    alignItems: 'center',
    marginVertical: moderateVerticalScale(32),
    flex: 1,
    color: Colors.black,
    paddingHorizontal: moderateScale(20),
    fontSize: scale(15),
  },
  downicon: {
    height: moderateVerticalScale(20),
    width: moderateScale(20),
  },
  touch: {
    width: moderateScale(90),
    height: moderateVerticalScale(120),
    marginHorizontal: moderateScale(5),
    flexDirection: 'row',
  },
  inputcontainer: {
    flexDirection: 'row',
  },
  verify: {
    height: windowheigth * 0.07,
    width: windowwidth - 40,
    backgroundColor: Colors.PurpleColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtdata: {
    fontSize: scale(17),
    fontWeight: '900',
    textTransform: 'uppercase',
    color: Colors.White,
  },
  bottomcontainer: {
    marginVertical: moderateVerticalScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    position: 'relative',
  },
});

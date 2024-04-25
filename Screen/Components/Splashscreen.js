import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Colors from './Colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const Splashscreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.push('Login');
    },3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/laundry-removebg-preview.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PurpleColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: moderateVerticalScale(200),
    width: moderateScale(200),
  },
});

export default Splashscreen;

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import Colors from './Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const DataServices = ({addTocart}) => {
  const laundrydata = [
    {
      id: 1,
      image: 'https://cdn-icons-png.flaticon.com/128/3003/3003984.png',
      name: 'washing',
    },
    {
      id: 2,
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975175.png',
      name: 'Laundry',
    },
    {
      id: 3,
      image: 'https://cdn-icons-png.flaticon.com/128/9753/9753675.png',
      name: 'Wash & Iron',
    },
    {
      id: 4,
      image: 'https://cdn-icons-png.flaticon.com/128/995/995016.png',
      name: 'Cleaning',
    },
  ];

  return (
    <View style={{padding: 10}}>
      <Text
        style={{
          fontSize: scale(15),
          color: Colors.black,
          marginBottom: moderateVerticalScale(7),
        }}>
        Services Available
      </Text>

      <FlatList
        data={laundrydata}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          // console.log('item=>', item);
          return (
            
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Pressable
             
                key={item.id}
                style={{
                  margin: 10,
                  backgroundColor: Colors.White,
                  padding: 20,
                  borderRadius: 10,
                }}
                onPress={()=>{addTocart(item)}}
                >
                <Image style={styles.laundryimg} source={{uri: item.image}} />
                <Text
                  style={{
                    color: Colors.black,
                    textAlign: 'center',
                    marginTop: moderateVerticalScale(10),
                  }}>
                  {item.name}{' '}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DataServices;

const styles = StyleSheet.create({
  laundryimg: {
    height: moderateVerticalScale(70),
    width: moderateScale(70),
  },
});

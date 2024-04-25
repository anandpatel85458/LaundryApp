import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Colors from './Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  increment_tocart,
  productDecrementQty,
  productIncrementQty,
  remove_tocart,
} from '../Redux/Action';
import {
  Descrementquantity,
  Incrementquantity,
  addTocart,
} from '../ReduxToolkit/CartReducer';
import {decrementQty, incrementQty} from '../ReduxToolkit/ProductSlice';
import storage from '@react-native-firebase/storage';

const Dressitem = ({item, navigation}) => {
  const cartdata = useSelector(state => state.cart.cart);
  console.log('cartdata=>', cartdata);

  const product = useSelector(state => state.product.product);
  console.log('product=>', product);

  const [imagedownload, setimagedownload] = useState('');

  const dispatch = useDispatch();

  const addtocart = async item => {
    try {
      const imageRef = storage().ref(`/profile/${item.id}`);
      const response = await fetch(item.image);
      const blob = await response.blob();
      await imageRef.put(blob);
      const downloadurl = await imageRef.getDownloadURL();
      console.log("doenloadimage=>",downloadurl);
      setimagedownload(downloadurl);
      dispatch(addTocart(item));
      dispatch(incrementQty(item));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const addfromcart = item => {
    dispatch(addTocart(item));
    navigation.push('Cart');
  };

  const Incrementqun = item => {
    dispatch(Incrementquantity(item)); //cart
    dispatch(incrementQty(item)); //product
  };

  const decremetqun = item => {
    dispatch(Descrementquantity(item)); //cart
    dispatch(decrementQty(item)); //product
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => addfromcart(item)}
        style={{
          backgroundColor: '#f8f8f8',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 8,
          margin: 14,
          flexDirection: 'row',
          padding: 5,
        }}>
        <View>
          <Image style={styles.img} source={{uri: item.image}} />
        </View>
        <View>
          <Text
            style={{
              fontSize: scale(14),
              color: Colors.black,
              marginBottom: moderateVerticalScale(7),
            }}>
            {item.name}{' '}
          </Text>
          <Text style={{fontSize: scale(14), color: Colors.DarksilverColor}}>
            ${item.price}{' '}
          </Text>
        </View>
        {cartdata.some(c => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: 'row',
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateVerticalScale(5),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => decremetqun(item)}
              style={{
                width: moderateScale(26),
                height: moderateVerticalScale(26),
                borderRadius: 13,
                borderColor: '#BEBEBE',
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: scale(20),
                  color: '#088F8F',
                  paddingHorizontal: moderateScale(6),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                -
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 19,
                  color: '#088F8F',
                  paddingHorizontal: 8,
                  fontWeight: '600',
                }}>
                {item.quantity}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Incrementqun(item)}
              style={{
                width: moderateScale(26),
                height: moderateVerticalScale(26),
                borderRadius: 13,
                borderColor: '#BEBEBE',
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: scale(20),
                  color: '#088F8F',
                  paddingHorizontal: moderateScale(6),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                +
              </Text>
            </TouchableOpacity>
          </Pressable>
        ) : (
          <TouchableOpacity
            style={styles.touch}
            onPress={() => addtocart(item)}>
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: 'bold',
                color: '#088f8f',
                borderColor: 'gray',
                borderWidth: 0.8,
                marginVertical: moderateVerticalScale(10),
                padding: 5,
                textAlign: 'center',
                borderRadius: 5,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Dressitem;

const styles = StyleSheet.create({
  img: {
    height: moderateVerticalScale(70),
    width: moderateScale(70),
  },
  touch: {
    width: moderateScale(80),
  },
});

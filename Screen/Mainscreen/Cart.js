import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../Components/Colors';
import { removeFromcart } from '../ReduxToolkit/CartReducer';

const Cart = () => {
  const dispatch = useDispatch();
  const getproductdatas = useSelector(state => state.product.product);

  const cart = useSelector(state => state.cart.cart);

  const deleteCart = (item) =>
  {
    dispatch(removeFromcart(item));
    console.log('delete cart');
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#f8f8f8',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              margin: 14,
              padding: 5,
              height: moderateVerticalScale(100),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Image style={styles.img} source={{uri: item.image}} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: moderateScale(50),
                }}>
                <Text
                  style={{
                    fontSize: scale(14),
                    color: Colors.black,
                    marginBottom: moderateVerticalScale(7),
                    
                  }}>
                  {item.name}{' '}
                </Text>
                <Text
                  style={{fontSize: scale(14), color: Colors.DarksilverColor}}>
                  ${item.price}{' '}
                </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
              onPress={()=>deleteCart(item)}
            style={styles.touch}
            >
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: 'bold',
                color: Colors.White,
                borderColor: 'gray',
                borderWidth: 0.8,
                marginVertical: moderateVerticalScale(10),
                padding: 5,
                textAlign: 'center',
                borderRadius: 5,
                backgroundColor:Colors.RedColors
              }}>
             Remove
            </Text>
          </TouchableOpacity>
          </View>
            </View>
           
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  img: {
    height: moderateVerticalScale(70),
    width: moderateScale(70),
  },
  touch: {
    width: moderateScale(100),

  },
});

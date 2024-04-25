import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Colors from '../Components/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  Descrementquantity,
  Incrementquantity,
} from '../ReduxToolkit/CartReducer';
import {decrementQty, incrementQty} from '../ReduxToolkit/ProductSlice';

const Cart2 = ({navigation, route}) => {
  const cart = useSelector(state => state.cart.cart);
  console.log('cart2=>', cart);

  const {selectedtime, selecteddate, selecteddel} = route.params;
  console.log('selectedtime=>', selectedtime);
  console.log('selecteddate=>', selecteddate);
  console.log('selecteddel=>', selecteddel);

  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  const dispatch = useDispatch();

  const Incrementdata = item => {
    dispatch(Incrementquantity(item)); //cart
    dispatch(incrementQty(item)); //product
  };

  const decrementdata = item => {
    dispatch(Descrementquantity(item)); //cart
    dispatch(decrementQty(item)); //product
  };

  const productbuck = useSelector(state => state.product.product);
  console.log('procductbuc =>', productbuck);

  const formatteddate = new Date(selecteddate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ScrollView
        style={{
          marginTop: moderateVerticalScale(30),
          marginHorizontal: moderateScale(10),
        }}>
        {total === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: Colors.Blackopacity80, fontSize: scale(16)}}>
              Your cart is empty
            </Text>
          </View>
        ) : (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    height: moderateVerticalScale(25),
                    width: moderateScale(25),
                  }}
                  source={require('../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.Blackopacity80,
                  fontSize: scale(16),
                  fontWeight: '700',
                }}>
                Your buckets
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.White,
                borderRadius: 12,
                marginLeft: moderateScale(10),
                marginRight: moderateScale(10),
                padding: 14,
                //   height: moderateVerticalScale(100),
                //   alignItems:'center',
                justifyContent: 'center',
              }}>
              {cart.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: moderateVerticalScale(12),
                  }}>
                  <Text
                    style={{
                      color: Colors.Blackopacity80,
                      fontSize: scale(16),
                      fontWeight: '500',
                    }}>
                    {' '}
                    {item.name}{' '}
                  </Text>

                  <Pressable
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: moderateScale(10),
                      paddingVertical: moderateVerticalScale(5),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: Colors.Blackopacity80,
                      borderWidth: 0.5,
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => decrementdata(item)}
                      style={{
                        backgroundColor: Colors.White,
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
                      onPress={() => Incrementdata(item)}
                      style={{
                        backgroundColor: Colors.White,
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
                  <Text
                    style={{
                      color: Colors.Blackopacity80,
                      fontSize: scale(16),
                      fontWeight: '500',
                    }}>
                    {' '}
                    ${item.price * item.quantity}{' '}
                  </Text>
                </View>
              ))}
            </TouchableOpacity>
            <View>
              <View style={{marginHorizontal: moderateScale(10)}}>
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: 'bold',
                    marginTop: moderateVerticalScale(30),
                    color: Colors.DarksilverColor,
                  }}>
                  Billing Details
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.White,
                    borderRadius: 7,
                    padding: 10,
                    marginTop: moderateVerticalScale(15),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: 'gray',
                      }}>
                      Item Total
                    </Text>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: Colors.Blackopacity80,
                      }}>
                      ₹{total}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: moderateVerticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: 'gray',
                      }}>
                      Delivery Fee | 1.2KM
                    </Text>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: '#088F8F',
                      }}>
                      FREE
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '500',
                        color: 'gray',
                      }}>
                      Free Delivery on Your order
                    </Text>
                  </View>

                  <View
                    style={{
                      borderColor: 'gray',
                      height: 1,
                      borderWidth: 0.5,
                      marginTop: moderateVerticalScale(10),
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: moderateVerticalScale(10),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '500',
                        color: 'gray',
                      }}>
                      selected Date
                    </Text>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: '#088F8F',
                      }}>
                      {formatteddate}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '500',
                        color: 'gray',
                      }}>
                      No Of Days
                    </Text>

                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: '#088F8F',
                      }}>
                      {selecteddel}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: moderateVerticalScale(10),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '500',
                        color: 'gray',
                      }}>
                      selected Pick Up Time
                    </Text>

                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: '400',
                        color: '#088F8F',
                      }}>
                      {selectedtime}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: 'gray',
                      height: 1,
                      borderWidth: 0.5,
                      marginTop: moderateVerticalScale(10),
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: moderateVerticalScale(8),
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: 'bold',
                        color: Colors.Blackopacity80,
                      }}>
                      To Pay
                    </Text>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: 'bold',
                        color: Colors.Blackopacity80,
                      }}>
                      {total + 95}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {total === 0 ? null : (
        <TouchableOpacity
          style={{
            backgroundColor: '#088F8F',
            padding: 10,
            marginBottom: moderateVerticalScale(30),
            margin: 15,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            // marginVertical:moderateVerticalScale(150)
          }}>
          <View>
            <Text
              style={{
                fontSize: scale(12),
                color: Colors.White,
                fontWeight: '500',
              }}>
              {' '}
              {cart.length} items | ${total}{' '}
            </Text>
            <Text style={{fontSize: scale(12), color: Colors.White}}>
              extraa charges migth apply
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.push('Order')}>
            <Text style={{fontSize: scale(14), color: Colors.White}}>
              process to order
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Cart2;

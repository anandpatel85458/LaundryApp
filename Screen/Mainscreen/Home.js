import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Styles from './Syles';
import Colors from '../Components/Colors';
import {hasServicesEnabledAsync, reverseGeocodeAsync} from 'expo-location';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/EvilIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Carousol from '../Components/Carousol';
import DataServices from '../Components/DataServices';
import Dressitem from '../Components/Dressitem';

import {useDispatch, useSelector} from 'react-redux';

import {
  getProductData,
  incrementQty,
  increment_tocart,
  productIncrementQty,
  product_increase,
} from '../Redux/Action';
import {getProducts} from '../ReduxToolkit/ProductSlice';

const Home = ({Addtocart, navigation}) => {
  // const [productdata, setProductdata] = useState([]);
  const cartdata = useSelector(state => state.cart.cart);
  console.log('cartitem=>', cartdata);

 

  const dispatch = useDispatch();

  const [search, setsearch] = useState('');
  const searchRef = useRef();
  const [olddata, setolddata] = useState([]);
  const [data, setdata] = useState([]);  
  const [currentLocation, setCurrentLocation] = useState(null);
  // const [total,settotal] =useState(0)

  let productdata = useSelector(state => state.product.product);

  // console.log("search=>",search);

  const total = cartdata.map((item)=>item.quantity * item.price).reduce((curr,prev)=>curr + prev,0);
  // console.log("total=>",total);

  const getRequestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {longitude, latitude} = position.coords;

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log('data=>', data);

          // Extract city, town, and pincode from the response
          const displayname = data.display_name;
          const state = data.address.state;
          const postcode = data.address.postcode;

          console.log('displayname:', displayname);
          console.log('State:', state);
          console.log('Pincode:', postcode);
          setCurrentLocation({displayname, state, postcode});
        } catch (error) {
          console.error('Error fetching location details:', error);
        }
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getRequestLocation();
    
  }, []);

   const clothdata = [
    {
      id: 1,
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: 2,
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: 3,
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'dresses',
      quantity: 0,
      price: 10,
    },
    {
      id: 4,
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'jeans',
      quantity: 0,
      price: 10,
    },
    {
      id: 5,
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'sweater',
      quantity: 0,
      price: 10,
    },
    {
      id: 6,
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'shorts',
      quantity: 0,
      price: 10,
    },
    {
      id: 7,
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'sleeveless',
      quantity: 0,
      price: 10,
    },
  ];

  const Searchdata = text => {
    let templist = data.filter(item =>
   {  return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;}
    );
    console.log("templist=>",templist);
    setdata(templist);
  
    productdata = templist;
    console.log('data2=>', templist);
  };

  // useEffect(() => {
  //   Searchdata(search);
  // }, [search]);



  useEffect(() => {
    
    if (productdata.length > 0) {
      return;
    }
    const fetchingdata = () => {
      clothdata.map(data => dispatch(getProducts(data)));
    };
    fetchingdata();
  

  }, []);

  console.log('data1=>', data);


  return (
    <>
      <ScrollView style={{backgroundColor: '#f0f0f0', flex: 1}}>
        {/* location */}
        <View style={styles.container}>
          <TouchableOpacity onPress={getCurrentLocation}>
            <Icon name="location-on" color="#fd5c63" style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(15),
              color: Colors.black,
              bottom: moderateVerticalScale(10),
            }}>
            Home
          </Text>

          <View
            style={{
              alignItems: 'center',
              marginHorizontal: moderateScale(-30),
            justifyContent:'flex-start',
            flexWrap:'wrap',
            
            }}>
            {currentLocation ? (
              <Text
                style={{
                  fontSize: scale(12),
                  color: Colors.DarksilverColor,
                
                  marginTop: moderateVerticalScale(20),
                 textAlign:'left'
              
                }}>
                {currentLocation.displayname},{currentLocation.state},{' '}
                {currentLocation.postcode}
              </Text>
            ) : (
              <Text style={styles.colordata}>{''}</Text>
            )}
          </View>
          <Pressable
            style={{marginLeft: 'auto', marginRight: moderateScale(7)}}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo',
              }}
            />
          </Pressable>
        </View>

        <View style={styles.searchview}>
          <TextInput
            style={{color: Colors.black}}
            placeholder="search for items or more"
            placeholderTextColor={Colors.DarksilverColor}
            ref={searchRef}
            onChangeText={text => {
              Searchdata(text);
              setsearch(text);
            }}
            clearButtonMode='always'
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Icons name="search" size={25} color={'#AA0000'} />
        </View>
        <Carousol />
        <DataServices />

        {productdata.map((item, index) => {
          
          return (
            <TouchableOpacity>
              <Dressitem item={item} key={index} navigation={navigation} />
            </TouchableOpacity>
          );
        })}
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
          }}>
          <View>
            <Text
              style={{
                fontSize: scale(12),
                color: Colors.White,
                fontWeight: '500',
              }}>
              {' '}
              {cartdata.length} items | ${total}{' '}
            </Text>
            <Text style={{fontSize: scale(12), color: Colors.White}}>
              extraa charges migth apply
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.push('Pickup')}>
            <Text style={{fontSize: scale(14), color: Colors.White}}>
              process to pickup
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LiteSilverColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  colordata: {
    fontSize: scale(15),
    fontWeight: '500',
    color: Colors.black,
  },
  icon: {
    fontSize: scale(25),
    alignItems: 'center',
  },
  img: {
    height: moderateVerticalScale(40),
    width: moderateScale(40),
    borderRadius: 40 / 2,
  },
  searchview: {
    paddingHorizontal: moderateScale(10),
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: Colors.DarksilverColor,
    borderRadius: 7,
    height: moderateVerticalScale(50),
  },
});

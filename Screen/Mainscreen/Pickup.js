import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Components/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import {useSelector} from 'react-redux';

const Pickup = ({navigation}) => {
  const times = [
    {
      id: '0',
      time: '11:00 PM',
    },
    {
      id: '1',
      time: '12:00 PM',
    },
    {
      id: '2',
      time: '1:00 PM',
    },
    {
      id: '2',
      time: '2:00 PM',
    },
    {
      id: '4',
      time: '3:00 PM',
    },
    {
      id: '5',
      time: '4:00 PM',
    },
  ];

  const deliveryTime = [
    {
      id: '0',
      name: '2-3 Days',
    },
    {
      id: '1',
      name: '3-4 Days',
    },
    {
      id: '2',
      name: '4-5 Days',
    },
    {
      id: '3',
      name: '5-6 Days',
    },
    {
      id: '4',
      name: 'Tommorrow',
    },
  ];

  const [items, setitems] = useState('');
  const [SelectedDate, setSelectedDate] = useState(new Date('2024-04-22'));
  const [selectedTime, setselectedTime] = useState([]);
  const [selecteddelivery, setselecteddelivery] = useState([]);

  const Handledate = item => {
    setSelectedDate(new Date());
  };

  console.log('selectedtime =>', selectedTime);
  console.log('delivery=>', selecteddelivery);

  const cartredcer = useSelector(state => state.cart.cart);
  console.log('cartreducer =>', cartredcer);

  const total = cartredcer
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log('sum=>', total);

  console.log('selected date:', SelectedDate);

  const AddTocart = () => {
    if (!SelectedDate || selectedTime.length===0 || selecteddelivery.length===0) {
      Alert.alert(
        'Empty or invalid',
        'please enter your field',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      
      );
    }
    else  {
      navigation.replace('Cart2',{selectedtime:selectedTime,
      selecteddate:SelectedDate,
      selecteddel:selecteddelivery
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text style={styles.txt}>enter Address</Text>
        <TextInput
          style={styles.input}
          value={items}
          onChangeText={text => setitems(text)}
        />
        <Text style={styles.txt}>Pickup Date</Text>
        <HorizontalDatepicker
          onPress={() => Handledate}
          mode="gregorian"
          startDate={new Date('2024-04-15')}
          endDate={new Date('2024-04-30')}
          initialSelectedDate={SelectedDate}
          onSelectedDateChange={date => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={styles.txt}>Pickup Time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <TouchableOpacity
              onPress={() => setselectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderWidth: 0.7,
                      borderRadius: 7,
                      borderColor: 'red',
                      padding: 13,
                    }
                  : {
                      margin: 10,
                      borderWidth: 0.7,
                      borderRadius: 7,
                      borderColor: Colors.greyColor,
                      padding: 13,
                    }
              }>
              <Text
                key={index}
                style={{
                  color: Colors.Blackopacity80,
                  fontSize: scale(16),
                  fontWeight: '400',
                }}>
                {' '}
                {item.time}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.txt}>Delivery Time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <TouchableOpacity
              onPress={() => setselecteddelivery(item.name)}
              style={
                selecteddelivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderWidth: 0.7,
                      borderRadius: 7,
                      borderColor: 'red',
                      padding: 13,
                    }
                  : {
                      margin: 10,
                      borderWidth: 0.7,
                      borderRadius: 7,
                      borderColor: Colors.greyColor,
                      padding: 13,
                    }
              }>
              <Text
                key={index}
                style={{
                  color: Colors.Blackopacity80,
                  fontSize: scale(16),
                  fontWeight: '400',
                }}>
                {' '}
                {item.name}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
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
              {cartredcer.length} items | ${total}{' '}
            </Text>
            <Text style={{fontSize: scale(12), color: Colors.White}}>
              extraa charges migth apply
            </Text>
          </View>
          <TouchableOpacity onPress={AddTocart}>
            <Text style={{fontSize: scale(14), color: Colors.White}}>
              process to pickup
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: Colors.Blackopacity80,
    fontSize: scale(16),
    fontWeight: '500',
    marginHorizontal: moderateScale(10),
    marginTop: moderateVerticalScale(10),
  },
  input: {
    padding: 40,
    borderColor: Colors.greyColor,
    borderWidth: 0.7,
    paddingVertical: moderateVerticalScale(80),
    borderRadius: 9,
    margin: 10,
    color: Colors.Blackopacity80,
  },
});

export default Pickup;

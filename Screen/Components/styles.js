import {Dimensions, StyleSheet} from 'react-native';
import Colors from './Colors';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';

const windowheigth = Dimensions.get('window').height;
const windowwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7DADA',
    
    paddingHorizontal:moderateScale(30)
  },
  text:
  {
    fontSize:scale(22),
    color:Colors.Blackopacity80,
    fontWeight:'bold',


  },
  otherview:
  {
    marginTop:moderateVerticalScale(50),
    paddingHorizontal:moderateScale(10)
  },
  textstyle:{
    fontSize:scale(25),
    color:Colors.black,
    marginVertical:moderateVerticalScale(10),
    fontWeight:'900'
  },
  diff:
  {
    fontSize:scale(15),
    color:Colors.Blackopacity80,
    marginVertical:moderateVerticalScale(30)
  },
  img:
  {
    height:moderateVerticalScale(200),
    width:moderateScale(250),
    
  },
  input:
  {
    height:(windowheigth *0.07),
    width:(windowwidth * 5)/6,
    borderWidth:1,
    color:Colors.Blackopacity80,
    marginTop:moderateVerticalScale(10),
    backgroundColor:Colors.White,
    paddingHorizontal:moderateScale(10),
    fontSize:scale(17),
    borderRadius:7,
   
  },
  input1:
  {
    height:(windowheigth *0.07),
    width:(windowwidth * 5)/6,
    borderWidth:1,
    color:Colors.DarksilverColor,
    // marginTop:moderateVerticalScale(10),
    backgroundColor:Colors.White,
    paddingHorizontal:moderateScale(10),
    fontSize:scale(17),
    borderRadius:7,
    marginHorizontal:moderateScale(-40),
    alignItems:'center',
    justifyContent:'center',
    marginTop:moderateVerticalScale(10),
    color:Colors.black
  },
  imagedesign:
  {
    height:moderateVerticalScale(25),
    width:moderateScale(25),
    // backgroundColor:'orange'
  },
  passwordata:
  {
    color:Colors.SkyBlue,
    fontSize:scale(18)
  },
  icon:
  {
    height:moderateVerticalScale(25),
    width:moderateScale(25),
    // alignItems:'center',
    // alignSelf:'center'
  },
  touch:
  {
    height:moderateVerticalScale(50),
    width:moderateScale(300),
    backgroundColor:Colors.SkyBlue,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0.5
  },
  textview:
  {
    fontSize:scale(20),fontWeight:'bold',
    borderRadius:10,
    textTransform:'uppercase'
  },
  account:
  {
    fontSize:scale(25),
    fontWeight:'800',
    color:Colors.black
  }
});

export default styles;

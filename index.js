/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Navigationscreen from './Screen/Navigation/Navigationscreen';
import Phonenumber from './Screen/OtpVerification/Phonenumber';

if (__DEV__) {
    require("./Screen/ReactotronConfig");
  }

AppRegistry.registerComponent(appName, () => Navigationscreen);

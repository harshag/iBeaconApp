import React, {useEffect} from 'react';
import {
  StyleSheet,
  LogBox,
  DeviceEventEmitter,
  NativeEventEmitter
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KontaktModule } from 'react-native-kontaktio';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SuccessScreen from './src/screens/SuccessScreen';

import { beaconSetup, removeBeaconListeners } from './src/lib/beacon';
import { useState } from '@hookstate/core';
import store from './src/store';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();
export default function App() {
  const kontaktEmitter = new NativeEventEmitter(KontaktModule);
  const isAndroid = Platform.OS === 'android';
  const globalState = useState(store);

  const checkBeacon = () => {
    const appBeacon = globalState.beaconList.get()?.filter(beacon => beacon.uuid === '1730be8a-809e-4379-b6c0-eae674da0d70');
    console.log('AppBeacon: ', appBeacon);
    if (appBeacon.length > 0 && appBeacon[0]?.proximity !== 'FAR' && globalState.get().timeSinceLastDetection < 5) {
      globalState.merge({bannerVisible: false});
    } else {
      globalState.merge({bannerVisible: true});
    }
  }

  useEffect(() => {
    beaconSetup();
    beaconTimer;
      // Add beacon listener
    if (isAndroid) {
      DeviceEventEmitter.addListener('beaconsDidUpdate', ({beacons, region}) => {
        console.log('beaconsDidUpdate', beacons, region);
        globalState.merge({beaconList: beacons, region: region, timeSinceLastDetection: 0})
        checkBeacon();
      });

      DeviceEventEmitter.addListener('beaconDidDisappear', ({region}) => {
        const existingBeacons = globalState.get().beaconList.filter(beacon => beacon.uuid !== region.uuid);
        globalState.merge({beaconList: existingBeacons})
        checkBeacon();
      });
    } else {
      // iOS
      kontaktEmitter.addListener('didDiscoverDevices', ({beacons}) => {
        console.log('didDiscoverDevices', beacons);
      });
    }

    const beaconTimer = setInterval(() => {
      let incrementTime = globalState.get().timeSinceLastDetection + 1;
      globalState.merge({timeSinceLastDetection: incrementTime});
      checkBeacon();
      console.log('Time since last detection: ', globalState.get().timeSinceLastDetection);
    }, 1000);

    return () => {
      removeBeaconListeners();
      clearInterval(beaconTimer);
    }
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Register"}} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import {
    Alert,
    DeviceEventEmitter,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Kontakt from 'react-native-kontaktio';

const isAndroid = Platform.OS === 'android';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const removeBeaconListeners = () => {
    DeviceEventEmitter.removeAllListeners()
}

export const beaconSetup = async () => {
  if (isAndroid) {
    const scanOptions = {
      scanMode: Kontakt.scanMode.LOW_LATENCY,
      scanPeriod: {
        activePeriod: 5001,
        passivePeriod: 2000
      },
      activeCheckConfiguration: Kontakt.activityCheckConfiguration.MINIMAL,
      forceScanConfiguration: Kontakt.forceScanConfiguration.MINIMAL,
    }
    const region = {
      uuid: '1730be8a-809e-4379-b6c0-eae674da0d70',
      identifier: 'iBeaconPoC',
      /* Enable to scan beacons with these specific value
      major: 1,
      minor: 2,
      */
  }
    const granted = await requestLocationPermission();
    if (granted) {
      console.log('Permissions granted')
      try {
        await Kontakt.connect();
        await Kontakt.configure(scanOptions)
        Kontakt.setBeaconRegion(region)
        await Kontakt.startScanning(); 
      } catch (err) {
        console.log('Error while connecting to Beacon:', err)
      }
    } else {
      Alert.alert(
        'Permission error',
        'Location permission not granted. Cannot scan for beacons',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  } else {
    // iOS
    await Kontakt.init();
    await Kontakt.configure(scanOptions)
    Kontakt.setBeaconRegion(region)
    await Kontakt.startDiscovery();
  }
};
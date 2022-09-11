import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper';

import AppConstants from '../../AppConstants';
import { useState } from '@hookstate/core';
import store from '../store';

import { useNavigation } from '@react-navigation/native'
import AppBanner from '../components/AppBanner';

function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const globalState = useState(store);
  const [beacon, setBeacon] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(true);

  useEffect(() => {
    if(globalState.get().beaconList.length > 0) {
      setBeacon(globalState.get().beaconList[0]);
    } else {
      setBeacon({});
    }
    setIsDisabled(globalState.get().bannerVisible);
  }, [globalState]);

  const nav = useNavigation();
  useEffect(() => {
    distance = beacon.accuracy ? `${Number(parseFloat(beacon.accuracy)).toPrecision(4)} M` : 'N/A';
    nav.setOptions({
      headerRight: () => <Text style={{color: '#000', fontWeight: 'bold'}}>Beacon Distance (approx): { distance }</Text>,
    });
  }, [beacon]);

  const handleLogin = async () => {
    setMessage("");
    if(username.trim().length == 0 || password.length == 0){
      setMessage("Username or Password cannot be empty");
      return
    }

    try {
      navigation.navigate('Success');
    } catch(error) {
      console.log("Error during login: ", error);
      let loginError = error.response?.data?.detail || "Error while login, check credentials and try again";
      setMessage(loginError);
    }
  };

  return (
    <>
    <AppBanner show={globalState.get().bannerVisible}/>
    <View style={styles.container}>
        <Text style={{color: "tomato"}}>{message}</Text>
        <TextInput
          label={"Username"}
          value={username}
          onChangeText={username => setUsername(username)}
          mode={'outlined'}
          autoFocus={true}
          style={styles.formElement}
          theme={{ colors: { primary: AppConstants.buttonColor } }}
        />
        <TextInput
          label={"Password"}
          value={password}
          onChangeText={password => setPassword(password)}
          mode={'outlined'}
          secureTextEntry={true}
          style={styles.formElement}
          theme={{ colors: { primary: AppConstants.buttonColor } }}
        />
        <Button disabled={isDisabled} color={AppConstants.buttonColor} onPress={handleLogin} style={styles.formElement}>Login</Button>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formElement: {
    marginTop: 10,
  }
});

export default LoginScreen;

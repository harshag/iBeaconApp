import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import GlobalStyle from '../../AppStyles';

import { useState } from '@hookstate/core';
import store from '../store';

import AppBanner from '../components/AppBanner';

const HomeScreen = ({navigation}) => {
  const globalState = useState(store);
  const [beacon, setBeacon] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleLogin = () => navigation.navigate("Login");
  const handleRegister = () => navigation.navigate("Register");

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

  return (
    <>
    <AppBanner show={globalState.get().bannerVisible}/>
    <View style={[GlobalStyle.screenContainer, styles.container]}>
      <TouchableOpacity disabled={isDisabled} onPress={handleLogin} style={[styles.homeScreen, styles.loginCard, isDisabled && styles.cardDisabled]}>
        <Text style={styles.loginCardText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={isDisabled} onPress={handleRegister} style={[styles.homeScreen, styles.regiesterCard, isDisabled && styles.cardDisabled]}>
        <Text style={styles.loginCardText}>Register</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeScreen: {
    width: '90%',
    height: '25%',
    margin: 30,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCardText: {
    fontSize: 30,
    color: "#ffffff"
  },
  loginCard: {
    backgroundColor: "#575add",
    borderColor: "#1a1b44",
  },
  cardDisabled: {
    backgroundColor: "grey",
    opacity: 0.6
  },
  regiesterCard: {
    backgroundColor: "#1190d5",
    borderColor: "#0a5c88"
  }
});

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import GlobalStyle from '../../AppStyles';

const HomeScreen = ({navigation}) => {

const handleLogin = () => navigation.navigate("Login");
const handleRegister = () => navigation.navigate("Register");

  return (
    <View style={[GlobalStyle.screenContainer, styles.container]}>
      <TouchableOpacity onPress={handleLogin} style={[styles.homeScreen, styles.loginCard]}>
        <Text style={styles.loginCardText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={[styles.homeScreen, styles.regiesterCard]}>
        <Text style={styles.loginCardText}>Register</Text>
      </TouchableOpacity>
    </View>
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
  regiesterCard: {
    backgroundColor: "#1190d5",
    borderColor: "#0a5c88"
  }
});

export default HomeScreen;

import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { Banner } from 'react-native-paper';
import { useState } from '@hookstate/core';
import store from '../store';

const AppBanner = (props) => {
  const globalState = useState(store);

  const handleDismiss = () => {
    console.log('Dismissed');
    globalState.merge({bannerVisible: false});
  }

  return (
    <Banner
      style={styles.appBanner}
      visible={props.show}
      actions={[
      ]}
      icon={({size}) => (
        <Image
          source={
            require('../static/ibeacon-logo.png')
          }
          style={{
            width: size,
            height: size,
          }}
        />
      )}
      >
      <Text style={styles.bannerContent}>Looks like you are beyond the beacon range. Please be near the beacon to work with the app.</Text>
    </Banner>
  )
}

const styles = StyleSheet.create({
  appBanner: {
    backgroundColor: "#ff0000",
    width: '100%'
  },
  bannerContent: {
    color: "#ffffff"
  }
});

export default AppBanner;

import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import GlobalStyle from '../../AppStyles';

const SuccessScreen = ({navigation}) => {
  return (
    <>
    <View style={[GlobalStyle.screenContainer, styles.container]}>
        <Image source={require('../static/success.png')} style={styles.successImage}/>
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
    successImage: {
        width: '100%'
    }
});

export default SuccessScreen;

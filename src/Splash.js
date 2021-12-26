import React,{ useEffect } from 'react'; 
import { View, StyleSheet, StatusBar,Image } from 'react-native';
import { colorApp, isAndroid, logoDucky,screenSize } from './utils/constants';
import SplashScreen from 'react-native-splash-screen';
import { Text } from './components'
const squareWidth = screenSize.width * 0.75;
function Splash({navigation}){ 
  
  useEffect(() => {
    verifico()
  },[]); 
  const verifico =async()=>{
    SplashScreen.hide();
    StatusBar.setBarStyle('light-content');
    if (isAndroid) {
      StatusBar.setBackgroundColor(colorApp.negroP);  
    } 
    setTimeout(() => {
      navigation.replace('HomeProjects')
    }, 500);
  } 
  return (
    <View style={styles.vista} > 
      <View style={{flex:4,backgroundColor:colorApp.aquaP }} />
      <View style={{flex:3,backgroundColor:colorApp.negroP }} />
      <View style={{flex:2,backgroundColor:colorApp.rojoP }} />
      <View style={{flex:1,backgroundColor:colorApp.grisP }} />
      <View style={styles.floatingDuck} >
        <Image source={logoDucky} style={{width:squareWidth, height:squareWidth}} />
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  vista:{
    flex:1,
  },
  floatingDuck:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
    zIndex:2
  }
})
export default Splash;
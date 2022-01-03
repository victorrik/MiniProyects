import React, { Fragment } from 'react'
import {ActivityIndicator, View, TouchableHighlight, StyleSheet, Platform} from 'react-native';
import {colorApp}from '../utils/constants'; 


const Button = (props) => {   
  const {
    style = {}, 
    children,
    loading = false,
    colorPress = "#FF628A",
    disabled = false,
    colorLoading = 'white',
    ...restoProps
  } = props; 
  if (loading) {
    return (
      <View style={{...styles.btnUwU,...style}}>
        <ActivityIndicator color={colorLoading}/>
      </View>
    )
  } 
  
  return(
    <TouchableHighlight {...restoProps}
    disabled={(loading || disabled)}
    underlayColor={colorPress}
    style={{...styles.btnUwU,...style}} >
      <Fragment  >
      {children}
      </Fragment>
    </TouchableHighlight>
    )
}

     



const styles = StyleSheet.create({
  btnUwU:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
    paddingHorizontal:10,
    backgroundColor:colorApp.aquaP,
    ...Platform.select({
      android: {},
      ios: {
        borderRadius:10,
      }
    })
  }, 
});

export default Button
import React, {Fragment} from 'react'
import {ActivityIndicator, View, TouchableHighlight, StyleSheet} from 'react-native';
import {colorApp}from '../utils/constants'; 

let sizePersist = {height:0,width:0}
const Button = (props) => {   
  const {
    style = {}, 
    children,
    loading = false,
    colorPress = 'rgba(255,255,255,0.15)',
    disabled = false,
    colorLoading = 'white',
    ...restoProps
  } = props; 
  if (loading) {
    return (
      <View style={{...styles.btnUwU,...style,...sizePersist}}>
        <ActivityIndicator color={colorLoading}/>
      </View>
    )
  } 
  
  return(
    <TouchableHighlight {...restoProps}
    disabled={disabled}
    underlayColor="#FF628A"
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
    backgroundColor:colorApp.grisP
  }, 
});

export default Button
import React from 'react'
import { View, StyleSheet, Platform } from 'react-native';
//import Button from './Button'

const Card = ({style = {},children=null,elevation =  2}) => {
  let height = 0, opacity = 0, radius = 0;
  const y = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  const blurs = [1,2,4,5,8,10,10,10,12,14,15,17,19,21,22,24,26,28,29,31,33,35,36,38];
  function interpolate (i, a, b, a2, b2) {
    return (i - a) * (b2 - a2) / (b - a) + a2;
  }

  height = y[elevation - 1] === 1 ? 1 : Math.floor(y[elevation - 1] * 0.5);
  opacity = Number(interpolate(elevation - 1, 1, 24, 0.2, 0.6).toFixed(2));
  radius = Number(interpolate(blurs[elevation - 1], 1, 38, 1, 16).toFixed(2));//(s.blur * 0.45).toFixed(2);
   
  return <View style={{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height:height,
    },
    shadowOpacity:opacity,
    shadowRadius:radius,
    elevation,
    ...styles.cardContainer,
    ...style}}  >
    {children}
  </View>
}

     



const styles = StyleSheet.create({
  cardContainer:{
    backgroundColor:"white",
    padding:10, 
    ...Platform.select({
      ios:{
        borderRadius:10,
      },
      android:{
        borderRadius:0
      }
    })
  }, 
});

export default Card
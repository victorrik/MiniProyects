import React from 'react';
import { Text } from 'react-native';

function UwUText ({
    children,
    h1,h2,h3,h4,h5,h6,
    ellipsizeMode = 'tail',
    style = {},
    ...resto
  }){
	let estilo = {}
	if (h1) {
	 	estilo = {fontSize:26,fontWeight:'700'}
	}
	if (h2) {
	 	estilo = {fontSize:22,fontWeight:'700'}
	}
	if (h3) {
	 	estilo = {fontSize:18,fontWeight:'700'}
	}
	if (h4) {
	 	estilo = {fontSize:16,fontWeight:'700'}
	}
	if (h5) {
	 	estilo = {fontSize:12,fontWeight:'700'}
	}
	if (h6) {
	 	estilo = {fontSize:10,fontWeight:'700'}
	} 
  return (
		<Text ellipsizeMode={ellipsizeMode} {...resto}  style={{fontFamily:'Rubik',color:'#252a34',...estilo,...style}}   >
			{children}
		</Text>
	)
}
 
 
export default UwUText; 
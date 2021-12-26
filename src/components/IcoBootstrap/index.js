import React,{Fragment} from 'react';
import {View,Text} from 'react-native';
import Svg  from 'react-native-svg';
import {iconos} from './objIcons';

function IconosB({name= '', color='#27282e', size = 12, container = {}}){
  let pathToShow =  (<View>
    <Text>uwu</Text>
    </View>
  )
  if (iconos[name]) {
    pathToShow = iconos[name];
  }
  
  
  return(
    <View style={{alignItems: 'center', justifyContent: 'center',...container}}>
      <Svg width={size} height={size} fill={color} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
        {pathToShow}
      </Svg>
    </View>
  )
}



export default IconosB;

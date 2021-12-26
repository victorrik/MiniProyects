import { Dimensions, Platform} from 'react-native';
const windowH = Math.round(Dimensions.get('window').height);
const windowW = Math.round(Dimensions.get('window').width);
const screenH = Math.round(Dimensions.get('screen').height);
const screenW = Math.round(Dimensions.get('screen').width);
export const isAndroid = (Platform.OS === 'android');
export const windowSize = {height:windowH,width:windowW};
export const screenSize = {height:screenH,width:screenW};
export const logoDucky =  require('../../assets/img/ducky_256.png')
export const bee =  require('../../assets/img/bee.png')
export const crab =  require('../../assets/img/crab.png')
export const dove =  require('../../assets/img/dove.png')
export const elephant =  require('../../assets/img/elephant.png')
export const hen =  require('../../assets/img/hen.png')
export const sheep =  require('../../assets/img/sheep.png')
export const squirrel =  require('../../assets/img/squirrel.png')
export const turtle =  require('../../assets/img/turtle.png')
export const colorApp={  
  aquaP:'#08d9d6',
  negroP:'#252a34',
  rojoP:'#ff2e63',
  grisP:'#eaeaea', 
}

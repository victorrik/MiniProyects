import {StyleSheet,Platform,PixelRatio} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
//import { estados } from './constantes'; 

 

 
export const getCurentLocation=()=>  new Promise((resolve, reject) =>Geolocation.getCurrentPosition(
  (position) => resolve(position),
  (error) => reject(error),
  { enableHighAccuracy: (Platform.OS === 'android'), timeout: 15000, maximumAge: 10000 }
)
);
 

export const checkEmail =(correo)=>{

  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(correo).toLowerCase());
}

export const numShorter=(num)=>{
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '')+'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '')+'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '')+'K';
  }
  return num?num:null;
}
 
 

export const verificoAbierto=(datos)=>{
  let diaHoy = new Date().getDay();
  let horaHoy = new Date().getTime()  
  if (diaHoy === 0) {
    diaHoy = 6;
  }else{
    diaHoy = diaHoy - 1;
  } 
  if (!datos[diaHoy].bool) {
    return {
      abierto:false,
      horas:`00:00 - 23:59`,
      txtAbierto:'Cerrado',
      nextHora: 'Cierra '+moment(hoyHasta).fromNow()
    }
  }

  let hoyDesde = datos[diaHoy].desde.split(':');
  let hoyHasta = datos[diaHoy].hasta.split(':');
  hoyDesde = new Date().setHours(Number(hoyDesde[0]),Number(hoyDesde[1]),0);
  hoyHasta =  new Date().setHours(Number(hoyHasta[0]),Number(hoyHasta[1]),0);
  //let despuesDeAhora = moment(hoyDesde).isSameOrAfter(horaHoy,'hour');
  //let antesDeAhora = moment(hoyHasta).isSameOrBefore(horaHoy,'hour');
  if (horaHoy < hoyDesde || horaHoy > hoyHasta) {
    return {
      abierto:false,
      horas:`${datos[diaHoy].desde} - ${datos[diaHoy].hasta}`,
      txtAbierto:'Cerrado',
      nextHora: 'Cierra '+moment(hoyHasta).fromNow()
    }
  }
  else{
    return {
      abierto:true,
      horas:`${datos[diaHoy].desde} - ${datos[diaHoy].hasta}`,
      txtAbierto:'Abierto',
      nextHora: 'Cierra '+moment(hoyHasta).fromNow()
    }
  } 
}

export const toMillis=(tempo)=>{ 
  if (tempo === undefined || tempo === null) {
    return null;
  }
  const losNaNo = (tempo.nanoseconds?tempo.nanoseconds:tempo._nanoseconds) / 1e6;
  return (tempo.seconds?tempo.seconds:tempo._seconds) * 1000 +  (isNaN(losNaNo)?0:losNaNo)
}

export const dateMax =(valor)=>{
  let minDate = new Date()
  minDate.setFullYear(new Date().getFullYear() - valor) 
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();  
  minDate = new Date(year-valor, month, day);
  return minDate;
}

export const checoPermiso  =async(tipoPermiso)=>{
  let permisoPedir = '';
  switch(tipoPermiso){
    case 'camara':
    permisoPedir = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA:PERMISSIONS.ANDROID.CAMERA;
    break;
    case 'microfono':
    permisoPedir = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE:PERMISSIONS.ANDROID.RECORD_AUDIO;
    break;
    case 'lectura':
    permisoPedir = Platform.OS === 'ios' ? '':PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    break;
    case 'escritura':
    permisoPedir = Platform.OS === 'ios' ? '':PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    break;
    case 'rolloCamara':
    permisoPedir = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY:PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    break;
    case 'ubicacion':
    permisoPedir = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE:PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    break; 

    case 'bluetooth':
    permisoPedir = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE:PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    break; 
  }
  let respuesta = await check(permisoPedir);
  switch (respuesta) {
    case RESULTS.UNAVAILABLE:
    return undefined;
    case RESULTS.DENIED:
    return await pidoPermiso(permisoPedir);
    case RESULTS.GRANTED:
    return true;
    case RESULTS.BLOCKED:
    return 'need';
    default:
    console.log('checoPermiso')
    return false
    break;
  }
}

const pidoPermiso  =async(permisoPedir)=>{
  let respuesta = await request(permisoPedir);
  switch (respuesta) {
    case RESULTS.UNAVAILABLE:
    return undefined;
    case RESULTS.DENIED:
    return false;
    case RESULTS.GRANTED:
    return true;
    case RESULTS.BLOCKED:
    return 'need';
    default:
    console.log('pidoPermiso')
    break;
  }
}
export const getDireccion = async(coordenadas)=>{
  //Pais:'',//Estado:'', 
  let aux = {codPostal:'',municipio:'',colonia:'',calle:'',numExterior:'',numInterior:'', referencias:''}
  
  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas.latitude},${coordenadas.longitude}&key=AIzaSyCdZBNZruR1BUVuZxlMh3X_k8NBXiPJRVw`)
  .then((response) =>  response.json())
  .then((json) => {
    const respuesta = json.results[0].address_components;
    aux = {...aux,formatoLargo:json.results[0].formatted_address}
    for (var i = 0; i < respuesta.length; i++){
      
      if (respuesta[i]) {
        switch (respuesta[i].types[0]) {
          case 'street_number'://numero
            aux= {...aux,numExterior:respuesta[i].long_name}
            break;
          case 'route'://calle
            aux= {...aux,calle:respuesta[i].long_name}
            break;
          case 'neighborhood'://colonia extra
            aux= {...aux,colonia:respuesta[i].long_name}
            break;
          case 'political'://colonia
            aux= {...aux,colonia:respuesta[i].long_name}
            break;
          case 'locality'://Municipio
            aux= {...aux,municipio:respuesta[i].long_name}
            break;
          case 'administrative_area_level_1'://Estado
            for (var e = 0; e < estados.length; e++) { 
              if(estados[e].label === respuesta[i].long_name){
                aux={...aux,estado:estados[e].value}
                break
              }
            }
            break;
          case 'country'://Pais
            //aux= {...aux,Pais:respuesta[i].long_name}
            break;
          case 'postal_code'://codigo postal
            aux= {...aux,codPostal:respuesta[i].long_name}
            break;
        }
      }
    }
      
  })
  .catch((error) => {aux = error})  
  return aux
}
export const consolaUwU=(indicador,valor)=>console.log(Platform.OS+':'+indicador,JSON.stringify(valor,'',2))

export const inputVacio=valor=>(valor.trim() === '')
 
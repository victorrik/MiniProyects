import React,{ useEffect, useState, useRef} from 'react'
import { View, StyleSheet } from 'react-native'
import MapView  from 'react-native-maps'; 
import Geolocation from 'react-native-geolocation-service'; 
import {checoPermiso} from '../../utils/functions';
import { Text } from '../../components';
const RowInfo = ({title,textInfo}) => (
  <View style={styles.rowsInfo} >
    <Text h3 >{title}</Text>
    <Text  >{textInfo}</Text>
  </View>
)

const Location = ({navigation}) => {
  const mapRef = useRef(); 
  const [showMap, setshowMap] = useState(false);
  const [infoCurentLocation, setInfoCurrentLocation] = useState(null);
  useEffect(() => {
    const tEnd = navigation.addListener('transitionEnd', (e) => {
      setshowMap(true)
    });
    const tStart = navigation.addListener('beforeRemove', (e) => {
      setshowMap(false)
    });
    
    return ()=>{
      tEnd()
      tStart()
    };
  }, [navigation]);
  const checoMiUbicacion = async() => {
    let rt = await checoPermiso('ubicacion');
    if (rt !== true) {
      setInfoCurrentLocation(null)
      return   
    }
    
    Geolocation.getCurrentPosition(async({coords,...resto}) => {  
      console.log({coords,...resto})
      setInfoCurrentLocation({coords,...resto})
      mapRef.current.animateToRegion({...coords,latitudeDelta:0.00222,longitudeDelta:0.00021})
    },(error) => console.log('showMe->error->',error.code, error.message),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    ); 
    
  }


  return (
    <View style={styles.container}>
      <View style={{marginBottom:40}} >
      {infoCurentLocation?
      <View>
        <Text h2 style={{marginBottom:15}} >Acceso permitido</Text>
        <RowInfo title="Latitude:" textInfo={infoCurentLocation?.coords?.latitude || ''} />
        <RowInfo title="Longitude:" textInfo={infoCurentLocation?.coords?.longitude || ''} />
        <RowInfo title="Heading:" textInfo={infoCurentLocation?.coords?.heading} />
        <RowInfo title="Accuracy:" textInfo={infoCurentLocation?.coords?.accuracy} />
        <RowInfo title="Altitude:" textInfo={infoCurentLocation?.coords?.altitude} />
        <RowInfo title="Altitude Accuracy:" textInfo={infoCurentLocation?.coords?.altitudeAccuracy} />
        <RowInfo title="Speed:" textInfo={infoCurentLocation?.coords?.speed} />
        <RowInfo title="Provider:" textInfo={infoCurentLocation?.provider || ''} />
      </View>:
      <View>
        <Text>Acceso negado</Text>
        </View>
      }
      </View>
      <View style={{flex:1}} >
        {showMap &&
          <MapView 
            ref={mapRef}
            style={styles.map}
            liteMode
            showsUserLocation={true}
            toolbarEnabled={false}
            initialRegion={{
              latitude: 16.8481609,
              longitude: -99.8828947,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }} 
            onMapReady={()=>setTimeout(() => {
              checoMiUbicacion()
            }, 500)}
          >
          </MapView>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:15,
  },
  rowsInfo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },  
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
export default Location

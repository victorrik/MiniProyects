import React,{ useEffect, useState, useRef, Fragment } from 'react'
import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native'
import MapView  from 'react-native-maps'; 
import Geolocation from 'react-native-geolocation-service'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {checoPermiso} from '../../utils/functions';
import { colorApp } from '../../utils/constants';
import { Text, IcoBootstrap, Button } from '../../components';

const RowInfo = ({title,textInfo}) => (
  <View style={styles.rowsInfo} >
    <Text h3 >{title}</Text>
    <View style={{flex:1,backgroundColor:colorApp.negroP ,height:1,marginHorizontal:5}} />
    <Text  >{textInfo}</Text>
  </View>
)


const InfoUbicacion = (props) => (
  <View>
    <RowInfo title="Latitude:" textInfo={props?.coords?.latitude || ''} />
    <RowInfo title="Longitude:" textInfo={props?.coords?.longitude || ''} />
    <RowInfo title="Heading:" textInfo={props?.coords?.heading} />
    <RowInfo title="Accuracy:" textInfo={props?.coords?.accuracy} />
    <RowInfo title="Altitude:" textInfo={props?.coords?.altitude} />
    <RowInfo title="Altitude Accuracy:" textInfo={props?.coords?.altitudeAccuracy} />
    <RowInfo title="Speed:" textInfo={props?.coords?.speed} />
    <RowInfo title="Provider:" textInfo={props?.provider || ''} />
  </View>
)

let watchID = null;
const Location = ({navigation}) => {
  const mapRef = useRef(); 
  const insets = useSafeAreaInsets();
  const [showMap, setShowMap] = useState(false);
  const [mapaListo, setMapaListo] = useState(false);
  const [acceso, setAcceso] = useState(true);
  const [modoRastreo, setModoRastreo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoCurentLocation, setInfoCurrentLocation] = useState(null);
  useEffect(() => {
    const tEnd = navigation.addListener('transitionEnd', (e) => {
      setShowMap(true)
    });
    const tStart = navigation.addListener('beforeRemove', (e) => {
      setShowMap(false)
      stopWatchPosition()
    });
    
    return ()=>{
      tEnd()
      tStart()
    };
  }, []);
  useEffect(() => {
    if (mapaListo) {
      checkPermissions()
    }
  }, [mapaListo])
  const handlePress = async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  };
  const checkPermissions = async() => {
    let rt = await checoPermiso('ubicacion');
     
    if (rt !== true) {
      setInfoCurrentLocation(null)
      setAcceso(false)
      return   
    }
    setAcceso(true)
    showCurrtenPosition()
  }

  const showCurrtenPosition = () => {
    
    Geolocation.getCurrentPosition(async({coords,...resto}) => {  
      setInfoCurrentLocation({coords,...resto})
      mapRef.current.animateToRegion({...coords,latitudeDelta:0.00222,longitudeDelta:0.00021})
    },(error) => console.log('showMe->error->',error.code, error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    ); 
  }
  

  const startWatchPosition=async()=>{
    setModoRastreo(true)
    watchID = Geolocation.watchPosition(async(objLocation) => {
      setInfoCurrentLocation(objLocation)
      },
      error => console.log("hagoEscucha error->",error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
        showLocationDialog:true
      },
    );
  }
  const stopWatchPosition=()=>{
    if (watchID) {
      Geolocation.clearWatch(watchID);
      watchID = null;
      setModoRastreo(false)
    }
    
  } 
  
  

  return (
    <View style={{...styles.container,paddingBottom:insets.bottom + 20}}>
      <View style={{marginBottom:10}} >
      {acceso?
        <Fragment>
          <InfoUbicacion {...infoCurentLocation} />
          {modoRastreo?
          <View style={{marginTop:10}} >
            <Button style={{flexDirection:'row'}} onPress={stopWatchPosition} >
              <Text h3 style={styles.txtBtn} >Detener</Text>
              <IcoBootstrap name='broadcast' size={25} color='white' />
            </Button>
          </View>
          :
          <View style={{marginTop:10, justifyContent:'space-between',flexDirection:'row'}} >
            <Button style={styles.btn} onPress={startWatchPosition} >
              <Text h3 style={styles.txtBtn} >Reastreo</Text>
              <IcoBootstrap name='broadcast' size={25} color='white' />
            </Button>
            <View style={{width:15}} />
            <Button style={styles.btn} onPress={showCurrtenPosition} >
              <Text h3 style={styles.txtBtn} >Ubicame</Text>
              <IcoBootstrap name='compass' size={25} color='white' />
            </Button>
          </View>
          }
        </Fragment>
        :
        <View>
          <Text h3   >Para poder más detalles en este apartado, favor de autorizar a la ubicación a la app, autorizar y reinicia la app </Text>
          <Button style={{flexDirection:'row',alignItems:'center',marginTop:10}}  onPress={handlePress} >
            <Text h3 style={styles.txtBtn} >Abrir configuración</Text>
            <IcoBootstrap name='gear' size={25} color='white' />
          </Button>
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
            onMapReady={()=>setMapaListo(true)}
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
    marginTop:5,
    flexDirection:'row',
    alignItems:'center',
  },  
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btn:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  txtBtn:{
    marginRight:10,
    color:'white'
  }
 });
export default Location

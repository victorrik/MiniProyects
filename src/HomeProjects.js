import React from 'react'
import { StyleSheet, ScrollView, View, Image,Platform } from 'react-native';
import { Text, Button, Card } from './components';
import {bee,crab,dove,elephant,hen,sheep,squirrel,turtle,duckyColor} from './utils/constants';
const BtnProject = ({onPress,text,image,fondo='red'}) => (
  <Card style={{padding:0,flex:1}}>
    <Button style={styles.btnStyle} onPress={onPress} >
      <View style={{...styles.containerImg,backgroundColor:fondo}}>
        <Image source={image} style={{width:40,height:40}} />
      </View>
      <Text h4 style={{marginTop:Platform.OS ==='ios'?10:5}}  >{text}</Text>
    </Button>
  </Card>
)

const HomeProjects = ({navigation}) => {
  const goToScreen=(screen)=>{
    navigation.navigate(screen)
  }
  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.contentContainer} >
        <View style={styles.rows} >
          <BtnProject 
            onPress={()=>console.log('Printer')}
            text="Impresora"
            image={bee}
            fondo="#F1C40F"
          />
          <View style={{width:15}} />
          <BtnProject 
            onPress={()=>goToScreen('Location')}
            text="Localizacion"
            image={crab}
            fondo="#E74C3C"
          />
        </View>
        <View style={styles.rows} >
          <BtnProject 
            onPress={()=>console.log('Notifications')}
            text="Notificaciones"
            image={dove}
            fondo="#D5D8DC"
          />
          <View style={{width:15}} />
          <BtnProject 
            onPress={()=>goToScreen('InfoDevice')}
            text="Info. Dispositivo"
            image={elephant}
            fondo="#BDC3C7"
          />
        </View>

        <View style={styles.rows} >
          <BtnProject 
            onPress={()=>goToScreen('Components')}
            text="Componentes"
            image={sheep}
            fondo="#F9E79F"
          />
          <View style={{width:15}} /> 
          
          <BtnProject 
            onPress={()=>goToScreen('Icons')}
            text="Iconos"
            image={squirrel}
            fondo="#D98880"
          />
        </View>

        <View style={styles.rows} >
          <BtnProject 
            onPress={()=>goToScreen('Videos')}
            text="Video"
            image={turtle}
            fondo="#7DCEA0"
          />
          <View style={{width:15}} /> 
          <View style={{flex:1}} />
        </View>

       <View style={styles.rows} >
        <Card style={{padding:0,flex:1}}>
          <Button style={styles.btnStyle} onPress={()=>goToScreen('AboutMe')} >
            <Image source={duckyColor} style={{width:70,height:70,borderRadius:100}} />
            <Text h4 style={{marginTop:10}}  >MiniProjects</Text>
          </Button>
        </Card>
         
       </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  contentContainer:{
    paddingHorizontal:15,
    paddingBottom:20,
    paddingTop:10,
  },
  btnStyle:{
    flex:1,
    backgroundColor:'white',
  },
  rows:{
    flexDirection:'row',
    alignItems:'center', 
    marginTop:10,
  },
  containerImg:{
    padding:20,
    borderRadius:100, 
  }
})



export default HomeProjects

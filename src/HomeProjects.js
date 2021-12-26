import React from 'react'
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Text, Button, Card } from './components';
import {bee,crab,dove,elephant,hen,sheep,squirrel,turtle} from './utils/constants';
const BtnProject = ({onPress,text,image}) => (
  <Card style={{padding:0,flex:1}}>
    <Button style={styles.btnStyle} onPress={onPress} >
      <Image source={image} style={{width:40,height:40}} />
      <Text h4 >{text}</Text>
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
          onPress={()=>goToScreen('Printer')}
          text="Impresora"
          image={bee}
        />
        <View style={{width:15}} />
        <BtnProject 
          onPress={()=>goToScreen('Location')}
          text="Localizacion"
          image={crab}
        />
       </View>

       <View style={styles.rows} >
        <BtnProject 
          onPress={()=>goToScreen('Notifications')}
          text="Notificaciones"
          image={dove}
        />
        <View style={{width:15}} /> 
        <View style={{flex:1}} />
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
  }
})



export default HomeProjects

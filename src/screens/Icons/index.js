import React from 'react'
import { View,  FlatList, StyleSheet } from 'react-native'
import {iconos} from '../../components/IcoBootstrap/objIcons';
import { IcoBootstrap, Text, Card} from '../../components'


const Icons = () => {
  const iconosFiltrados = Object.entries(iconos) 
  return (
    <View style={styles.container}>
      <View style={{marginVertical:10,paddingHorizontal:15}} >
        <Text style={{textAlign:'justify'}} >Todos los iconos que estan en <Text style={{fontWeight:'bold'}} >Bootstrap Icons </Text> han sido copiados y pasados a un objeto que igual pertenece a un componente <Text style={{fontWeight:'bold'}} >IcoBootstrap</Text> que en algun momento sera visto </Text> 
        <Text style={{marginTop:10}} >Todavia hay pendiente y poco a poco se iran agregando</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}} >Total iconos en Bootstrap: <Text>{iconosFiltrados.length}</Text> </Text>
        
      </View>
      <FlatList 
        data={iconosFiltrados}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item,index})=>
        <Card style={{flex:1,marginTop:5,marginRight:index % 2 === 0?5:0,}} >
           
          {item[1]?<IcoBootstrap name={item[0]} size={30} />
          :<Text style={{textAlign:'center',fontWeight:'bold'}} >Pendiente</Text>}
          <Text  style={{textAlign:'center',marginTop:5,fontWeight:'bold'}} >{item[0]}</Text>
        </Card>
        }
        numColumns={2}
        keyExtractor={(item,index)=>index+''}
      />
    </View>
  )
} 
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  contentContainer:{ 
    paddingHorizontal:15,
    paddingBottom:20, 
  }, 
})

export default Icons

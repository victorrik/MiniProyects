import React,{useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef, isReadyRef} from './RootNavigation'; 
import { Text } from './components'
import MainContext from './context';

import Splash from './Splash';
import HomeProjects from './HomeProjects';
import Printer from './screens/Printer';
import Location from './screens/Location';
import AboutMe from './screens/AboutMe';




const Stack = createNativeStackNavigator();


const setTS=(title)=><Text h2 >{title}</Text>
const Screens=()=>{ 
	
	const mainContext = useMemo(() => ({ 
		meor:'meow'
  }),[]);
	return(
		<SafeAreaProvider>
			<MainContext.Provider value={mainContext}>
        <NavigationContainer
        	ref={navigationRef}
        	onReady={()=>{
        			isReadyRef.current = true;
        	}}
        >
        	<Stack.Navigator 
					screenOptions={{
						animation:'slide_from_right'
					}}  >
            <Stack.Screen name="Splash" component={Splash}
						 options={{headerShown:false}} />
						<Stack.Screen name="HomeProjects" component={HomeProjects}
							options={{headerTitle:()=>setTS('Mini proyectos')}}
						/>
						<Stack.Screen name="Printer" component={Printer}
							options={{headerTitle:()=>setTS('Impresora')}}
						/>
						<Stack.Screen name="Location" component={Location}
							options={{headerTitle:()=>setTS('Locacion')}}
						/>
						<Stack.Screen name="AboutMe" component={AboutMe}
							options={{headerTitle:()=>setTS('Acerca de mi App')}}
						/>
						
        	</Stack.Navigator>
        </NavigationContainer>
			</MainContext.Provider>
		</SafeAreaProvider>
  )
}

export default Screens;
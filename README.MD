# Miniproyects

> ## Contenido
> 
> [Descripción uwu](#Descripción-uwu)
> 
> [Descripción del catalogo de eventos y notificaciones](#Descripción-del-catalogo-de-eventos-y-notificaciones)
> 
> [Links donde encontrarlas](#Links-donde-encontrarlas)
> 
> [Notas internas](#Notas-internas)
> 



## Descripción uwu 
En tiempo libre y ocurrencias, pruebo librerias e intento crear componentes solo por hobby y pa vers como se verian


## Descripción del catalogo de eventos y notificaciones

 
## Links donde encontrarlas 

> ### Eventos
>
> #### Categorias y asuntos
>
> - 1-1-1 Se creo asunto
>
> #### Dependencias
>
> - 2-1-1 Se creo depenencia
>
> #### Responsables
>
> - 3-1-1 Se creo responsable
>
> #### Lugares de interes
>
> - 4-1-1 Se creo lugar de interes
>
> #### Teléfonos de interes
>
> - 5-1-1 Se creo teléfono de interes
>
> #### Solicitudes
>
> - 6-1-1 Se creo solicitud
>
> #### Noticias
>
> - 7-1-1 Se creo noticia
>
> #### Reportes
>
> - 8-1-1 Se creo reporte
>
> #### Oficinas
>
> - 9-1-1 Se creo oficina
>
> https://github.com/gorhom/react-native-paper-onboarding
> https://github.com/flyerhq/react-native-chat-ui
> https://github.com/benevbright/react-navigation-collapsible
> https://github.com/gorhom/react-native-bottom-sheet
> 

## Notas internas

### Permisos Apps
### Modifaciones de archivos dependiendo librerias

### Generacion de keystore

#### Android
>
> import {PERMISSIONS} from 'react-native-permissions';
>
> PERMISSIONS.ANDROID.ACCEPT_HANDOVER;
> PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
> PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
> PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
> PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION;
> PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;
> PERMISSIONS.ANDROID.ADD_VOICEMAIL;
> PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS;
> PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE;
> PERMISSIONS.ANDROID.BLUETOOTH_CONNECT;
> PERMISSIONS.ANDROID.BLUETOOTH_SCAN;
> PERMISSIONS.ANDROID.BODY_SENSORS;
> PERMISSIONS.ANDROID.CALL_PHONE;
> PERMISSIONS.ANDROID.CAMERA;
> PERMISSIONS.ANDROID.GET_ACCOUNTS;
> PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS;
> PERMISSIONS.ANDROID.READ_CALENDAR;
> PERMISSIONS.ANDROID.READ_CALL_LOG;
> PERMISSIONS.ANDROID.READ_CONTACTS;
> PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
> PERMISSIONS.ANDROID.READ_PHONE_NUMBERS;
> PERMISSIONS.ANDROID.READ_PHONE_STATE;
> PERMISSIONS.ANDROID.READ_SMS;
> PERMISSIONS.ANDROID.RECEIVE_MMS;
> PERMISSIONS.ANDROID.RECEIVE_SMS;
> PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH;
> PERMISSIONS.ANDROID.RECORD_AUDIO;
> PERMISSIONS.ANDROID.SEND_SMS;
> PERMISSIONS.ANDROID.USE_SIP;
> PERMISSIONS.ANDROID.WRITE_CALENDAR;
> PERMISSIONS.ANDROID.WRITE_CALL_LOG;
> PERMISSIONS.ANDROID.WRITE_CONTACTS;
> PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
>
### Limpieza profunda
Comando en MacOS para "limpiar" el proyecto para evitar posibles errores

- Eliminamos el lock.json y la caperta de modulos
rm -rf package-lock.json && rm -rf yarn.lock && rm -rf node_modules
- Reinstalamos los paquetes y forzamos por ciertas librerias
npm i --force
- Eliminamos lo relacionado a los pods
rm -rf ios/Podfile.lock && rm -rf ios/Pods
- Volvemos a instalar los pods
cd ios && pod repo update && pod update && pod install


react-native-ble-manager
react-native-ble-plx
react-native-thermal-receipt-printer
tp-react-native-bluetooth-printer
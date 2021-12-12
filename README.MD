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
> 
> 

## Notas internas

### Modifaciones de archivos dependiendo librerias

### Generacion de keystore

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


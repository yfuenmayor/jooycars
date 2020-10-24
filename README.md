# jooycars

## Base de datos

1.- Los datos de configuracion de la base de datos se envuentran en el archivo `variables.env` que se encuentra en la raiz de la API. <br>
2.- Por default tiene una base llamada `jooycar` y una collection llamada `personas` <br>
3.- Se cargan una cantidad total de 100 registros aleatorios por la libreria dream con los siguientes parametros: <br>
    `genero`: Masculino | Femenino   `edad`: 1 < n < 99   `region`: solo numeros de 2 cifras

## PORT
- El puerto se encuentra en el archivo `variables.env` y por default tiene 4100, de no encontrar la variable colocara 4000.

## Endpoints
- `/personas` : muestra todos los datos de la coleccion ó inserta los datos en la coleccion. <br>
- `/personas/count?edad=n&grupo=xxxx` : muestra los resultados segun los requerimientos de la prueba en donde ***n*** es un numero `int` y ***xxxx*** es un `string` con las opciones `genero | region`

## Script
- Para iniciar la API en modo `DEV`: ***npm run dev*** <br>
- Para iniciar la API en modo `PRODUCTION`: ***npm run start*** <br>

## NOTAS:

- Se creo un `branch` adicional con el nombre de ***auto_carga*** en el cual la API carga los datos de la coleccion luego de conectar con la DB <br>
- En `master` la carga de los datos se hace a travez del endpoint : ***/personas*** <br>
- La API no tiene validaciones de token ni nada mas adicional ya que solo se realizo lo requerido por la empresa.

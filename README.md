# Instrucciones de la prueba
Esta es una prueba que permite interactuar con un visor de información geográfica.

## Configuración inicial

### Instalación y ejecución

Debe tener instalado npm o yarn en su equipo local, para la instalación de paquetes y ejecución del proyecto. Clone el proyecto en su equipo e ingrese por línea de comandos al directorio del proyecto.

### 1.1. Clone el repositorio:

```
$ git clone https://github.com/desarrollador2geo/prueba_ingreso.git
```

### 1.2. Instalación de paquetes:
Ejecute la siguiente sentencia para instalar las dependencias del proyecto:

    npm install

### 1.3. Ejecución:
Ejecute la siguiente instrucción:

    npm start

La instrucción iniciará el proyecto en su entorno local y se abrirá en el navegador.

## 2. Instrucciones de la prueba:

##El mapa debe visualizar el municipio de REPELON

    2.1 Localizar el mapa en el municipio de REPELON

    2.2 Cambiar el mapa base y ajustar el mapa al 100% de la pantalla

    2.3 Se debe agregar el minimap al mapa y adicional otro plugin de leaflet 

    2.4 Añadir un marker en el centro del mapa

    2.5 Del siguiente servidor de mapas con url https://geoservicios.yopal.gov.co/geoserver/web/
    
    2.5.1 Se debe cargar las siguientes capas al geovisor:
        yopal:gc_predios_catastro
        yopal:u_perimetro

    2.5.2 Al darle click a la capa de gc_predios_catastro se debe mostrar UN MODAL del predio con los siguientes atributos:

    1. codigo_catastral
    2. codigo_catastral_anterior


## 3. Despliegue:

### 3.1. Compilación del proyecto
Para desplegar el proyecto, ejecute la siguiente instrucción:
    
    npm run build

### 2.2. Resultado esperado
Responder el correo de donde le enviaron la prueba con el link el repositorio que contiene la solución y una imagen resumen del resultado 

### Resultados:

Se cumplieron la mayoria de las instrucciones de la prueba, se me dificultó cargar las capas del geovisor basado en la url https://geoservicios.yopal.gov.co/geoserver/web/ hice una investigación exhausta pero considero que no se pudo solucionar por problemas de conflictos entre las diferentes capas, de igual manera dejo planteada mi solución en el código.

Se realiza la muestra de los códigos catastrales pero no de la forma en que se solicita partiendo de que no se ha logrado, de igual manera dejo planteada mi solución en el código.



Alumno: Matías Nahuel Rodriguez

Descripción del trabajo práctico: consiste en el desarrollo de un módulo de comunicación de equipos Victron Energy para la domótica de motorhomes. En mi empleo actual nos dedicamos al desarrollo de equipos destinados a la domótica de motorhomes, actualmente los fabricantes de motorhomes estan migrando el conjunto inversor - cargador - bateria a equipos de la marca Victron Energy. 
De aquí surge la necesidad de desarrollar un equipo que permita compatibilizar los equipos Victron con la red de domótica provista por la empresa. También se debe desarrollar una aplicación que permita el control y monitoreo de todos los equipos conectados a la red.

Objetivo del ataque: 
- Interceptar y manipular los comandos destinados a los distintos equipos (Victron se controla con Modbus TCP), para que los mismos empiecen a presentar fallas y se vea le necesidad de llevarlos a revisión o mantenimiento.

Resolución:
- Reconnaissance:
    - Escaneo de la red Wi-Fi del motorhome para identificar el módulo de comunicación y los equipos Victron conectados. Podría buscar puertos de comunicación, como ser el estandar para Modbust TCP.
    - A traves de una herramienta como Wireshark (o similar) podría capturar y analizar los paquetes de datos en la red, con el objetivo de entender la estructura de los comandos Modbus TCP utilizados entre la aplicación y los dispositivos. Esto permitiría descubrir los comandos especificos que controlan a cada uno de los equipos.
- Weaponization:
    - A través de Python se podría desarrollar un script utilizando las librerias estandar de Modbus TCP (como ser PyModbus por ejemplo). Este script tendría la finalidad de inyectar o modificar los paquetes de datos transmitidos a traves de la red de comunicación, así como tambien los registros Modbus que controlan a los distintos equipos.
    - La aplicación y el dispositivo se comunican a través de la red Wi-Fi generada por el dispositivo. Se podría intentar obtener acceso a esta red a través de practicas de pishing, creando paginas falsas que imite la intefaz real del dispositivo. Con esto se busca obtener las credenciales para tener acceso a la red Wi-Fi.
- Delivery
    - A través del ataque pishing se obtienen las credenciales de la red Wi-Fi del dispositivo. Otra opción sería intentar intentar vulnerar el sistema con claves por defectos que traen estos equipos.
- Exploitation
    - Una vez dentro, el protoclo Modbus no tiene sistema de cifrados ni autentificación para saber que dispositivo es el que está enviando el mensaje. Esto significa que, una vez estando dentro, el script desarrollado puede operar libremente a través de la red de comunicación.
- Installation
    - Por la naturaleza de la red, el script se mantiene siempre activo, interceptando, modificando y operando sobre los registros Modbus de los equipos en tiempo real, sin dejar rastros de procesos de instalación.
- Command and Control
- Actions on Objectives

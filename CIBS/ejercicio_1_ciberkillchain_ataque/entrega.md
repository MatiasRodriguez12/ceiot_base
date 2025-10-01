Alumno: Matías Nahuel Rodriguez

Descripción del trabajo práctico: consiste en el desarrollo de un módulo de comunicación de equipos Victron Energy para la domótica de motorhomes. En mi empleo actual nos dedicamos al desarrollo de equipos destinados a la domótica de motorhomes, actualmente los fabricantes de motorhomes estan migrando el conjunto inversor - cargador - bateria a equipos de la marca Victron Energy. 
De aquí surge la necesidad de desarrollar un equipo que permita compatibilizar los equipos Victron con la red de domótica provista por la empresa. El dispositivo debe actuar como mediadior entre los dispositivos Cerbo GX (módulo central de Victron) y PRC-10 (módulo central de la red de domótica propia).
También se debe desarrollar una aplicación que permita el control y monitoreo de todos los equipos conectados a la red.

<img width="3384" height="1872" alt="esquema" src="https://github.com/user-attachments/assets/3cf2f3f7-d055-4f6f-a2d4-cbfe8818daff" />


Objetivo del ataque: 
- Sabotaje de los equipos conectados a la red de domótica a través de la inyección de comandos de control no deseados para que los mismos presenten fallas en su funcionamiento y surja la necesidad de llevarlos a revisión o manteminiento.

Resolución:
- Reconnaissance:
    - Analisis de circuito: se encuentra que el dispositivo se comunica con los equipos de la red Victron a través del protocolo de comunicación Modbus TCP. Esto nos da un punto de partida sobre que herramienta debemos manejar para poder llevar a cabo el sabotaje.
    - La aplicación y el dispositivo se comunican a través de la red Wi-Fi generada por el dispositivo (no necesariamente conectados a internet), por lo que será necesario obtener las credenciales para poder acceder a la red de comunicación.
    - A traves de una herramienta como Wireshark (o similar) podría capturar y analizar los paquetes de datos en la red, con el objetivo de entender la estructura de los comandos Modbus TCP utilizados entre la aplicación y los dispositivos. Esto permitiría descubrir los comandos especificos que controlan a cada uno de los equipos.
    
- Weaponization:    
    - A través de Python se podría desarrollar un script utilizando las librerias estandar de Modbus TCP (como ser PyModbus por ejemplo). Este script tendría la finalidad de inyectar o modificar los paquetes de datos transmitidos a traves de la red de comunicación, así como tambien los registros Modbus que controlan a los distintos equipos. También debe ser capaz de comunicarse con el dispositivo para realizar las peticiones de comandos Modbus, por lo que deberá manejar solicitudes https. Este script deberá correr en un dispositivo propio, como ser una raspberry pi por ejemplo.
    - Se podría intentar obtener acceso a la red  de comunicación a través de practicas de pishing, creando paginas falsas que imite la intefaz real del dispositivo. Con esto se busca obtener las credenciales para tener acceso a la red Wi-Fi y así conectar nuestro dispositivo con el script de control.
- Delivery
    - A través del ataque pishing se obtienen las credenciales de la red Wi-Fi del dispositivo. El medio elegido para la entrega es via mail, emulando un mensaje proveniente de soporte técnico que conduza al usuario a nuestra pagina web. También nuestro dispositivo que contiene el script debe estar localizado en una zona cercana al motorhome de tal manera que se encuentre dentro del alcance de la red Wi-Fi generado por este.
- Exploitation
    - Con las credenciales obtenidas, nuestro dispositivo se conecta a la red de comunicación. Aprovechamos la vulnerabilidad de que el sistema no verifica que equipo está enviando los comandos o peticiones, solamente comprueba que el equipo se encuentre conecrada a la red Wi-Fi generada por el mismo dispositivo y así suplantar la identidad de la aplicación por nuestro script propio.
- Installation
    - El script correrá en nuestro dispositivo propio, manejando funciones de conexion constante a la red Wi-Fi de la red de domótica e iniciando la ejecución del script una vez establecida la conexión.
- Command and Control
    - El script puede funcionar de manera autonoma una vez iniciado. En este punto ya se tendrá conocimiento de los formatos de los comandos de control y como funcionan cada uno de ellos. Se podría diseñar el script de tal manera que en momentos arbitrarios del día ejecute secuencias de comandos que afecten el funcionamiento normal de los equipos. 
- Actions on Objectives
    - Se llega al punto de sabotaje de sistema, el script se encarga de inyercar comandos no deseados al dispositivo (como ser encendido y apagado de equipos de manera aleatoria), lecturas falsas de sensores, desactivación de protecciones o crear falsas alarmas (sobretensión, sobrecorriente, etc).

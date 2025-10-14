# Ejercicio CiberKillChain - Defensa

Hacer una copia de este documento para utilizar com plantilla para el ejercicio

## Alumno

Matías Nahuel Rodriguez

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso, mencionar una medida de detección y una de mitigación, sólo lo más importante, considerar recursos limitados. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.


## Resolución
  
- Actions on Objectives
    - Detección: se podría analizar el comando de patrones recibidos y que repercución tendrían en el sistema antes de ser ejecutados. Por ejemplo comandos que desactivan protecciones y luego los fuercen a trabajar en su limite podría ser considerados peligrosos y generar un alerta en su lugar.
    -  Mitigación: los comandos mas sensibles que operan sobre los equipos (apagado o encendido, desactivación de protecciones) solo se ejecutarán si dicho comando viene acompañado de un token seguro generado por la aplicación. Esto agregará una etapa de autenticación a la aplicación.

- Command and Control
  - Detección: el dispositivo puede realizar un monitoreo o análisis sobre el patrón de comandos enviados en la red, generando una especie de historial. Si se detecta que de repente llega un gran tráfico de comandos no coincidentes el equipo podría clasificarlo como sospechoso y ponerlo bajo análisis.
  - Mitigación: si se detecta que la cantidad de comandos por unidad de tiempo aumenta abruptamente, se podria generar bloqueos o retardos de tiempos aleatorops en las respuestas ante estos comandos, esto entorpecería el accionar del script, perdiendo su sincronización.
  
- Installation
  - Detección: el equipo podría monitorear el tiempo en que cada dispositivo se conecta a su red Wi-Fi. La aplicación legitima solamente se conecta cuando necesite realizar alguna que otra tarea. Por otra parte, atacantes estarían conectandose permanentemente, generando un alerta en estos casos.
  - Mitigación: se puede implementar un mecanismo que desconecte automaticamente al equipo de su red cuando se transcurra un determinado tiempo.
    
- Exploitation
  - Detección: el dispositivo podría tener algun algoritmo de detección de cuando haya 2 o mas dispositivos tratando de enviar comandos de manera simultánea (la aplicación legitima y algun script intruso).
  - Mitigación: se podría hacer que el proceso de autenticación entre dispositivo y usuario sea llevada a cabo a través del uso de claves secretas (tanto en el dispositivo como en la aplicación). El dispositivo solamente aceptara conexiones si los mensajes pueden ser descifrado a través de su clave.
  
- Delivery
  - Detección: se podría monitorear si existen intentos fallidos de conexión a la red Wi-Fi y generar un alerta si un intruso desea vulnerar e ingresar por ataque de fuerza bruta. También se podría llevar un registro de MAC y horarios de conexión en que se conecta un equipo a la red Wi-Fi. Si aparece un nuevo cliente en horarios atipicos se podría generar un alerta.
  - Mitigación: se podría implementar un proceso de autenticación de dos pasos para ingresar a la red. Ademas de las credenciales, se podría solicitar una confirmacióna través de codigos via SMS o mail.
    
- Weaponization
  - Detección: se podría realizar llevar una especie de cuenta de pedidos o peticiones de con comandos erroneos o ilógicos. Si se detecta que existe una gran cantidad de comandos de este tipo en cierto periodo de tiempo, se genera un alerta.
  - Mitigación: se podría hacer que la comunicación entre dispositivo y aplicación se realice con alguna clase de cifrado. Esto hace que si algun atacante intenta obtener o registrar paquetes de comandos seán mas dificil interpretarlos.
  
- Reconnaissance
  - Detección: de podría monitorear si un cliente conectado a la red mantiene alguna sesión TCP activa sin envíar comandos, esto podría ser un indicio de espiaje a través de wireshark o similar.
  - Mitigación: si el dispositivo detecta o ve que hay poca actividad en la red, podría reiniciar su access point de Wi-Fi o directamente apagarlo, de esta manera entorpecería cualquier intento de espionaje.

# Ejercicio CiberKillChain - Defensa

Hacer una copia de este documento para utilizar com plantilla para el ejercicio

## Alumno

Matías Nahuel Rodriguez

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso, mencionar una medida de detección y una de mitigación, sólo lo más importante, considerar recursos limitados. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.


## Resolución
  
- Actions on Objectives
    - Detección: el dispositivo podría evaluar los contenidos de los comandos recibidos, si detecta que viola alguna regla de seguridad del dispostivo (por ejemplo operar sobre registros protegidos) genera un alerta y rechaza el comando.
    -  Mitigación: los comandos más sensibles que operan sobre los equipos (apagado o encendido, desactivación de protecciones) solo se ejecutarán si dicho comando viene acompañado de un token seguro generado por la aplicación. Esto agregará una etapa de autenticación a la aplicación.

- Command and Control
  - Detección: el dispositivo puede realizar un monitoreo o análisis del patrón de comandos enviados en la red, generando una especie de historial. Si se detecta que, de repente, llega un gran tráfico de comandos no coincidentes, el equipo podría clasificarlo como sospechoso y ponerlo bajo análisis.
  - Mitigación: si se detecta que la cantidad de comandos por unidad de tiempo aumenta abruptamente, se podrían generar bloqueos o retardos de tiempo aleatorios en las respuestas a estos comandos; esto entorpecería el accionar del script, provocando la pérdida de sincronización.
  
- Installation
  - Detección: el equipo podría monitorear el tiempo en que cada dispositivo se conecta a su red Wi‑Fi. La aplicación legítima solamente se conecta cuando necesita realizar alguna tarea puntual; por otra parte, atacantes podrían conectarse permanentemente, lo que generaría una alerta en estos casos.
  - Mitigación: se puede implementar un mecanismo que desconecte automáticamente el equipo de la red cuando transcurra un tiempo determinado.
    
- Exploitation
  - Detección: el dispositivo podría contar con algún algoritmo que detecte cuando hay dos o más dispositivos intentando enviar comandos de manera simultánea (la aplicación legítima y algún script intruso).
  - Mitigación: se podría hacer que el proceso de autenticación entre dispositivo y usuario sea llevada a cabo a través del uso de claves secretas (tanto en el dispositivo como en la aplicación). El dispositivo solamente aceptara conexiones si los mensajes pueden ser descifrado a través de su clave.
  
- Delivery
  - Detección: se podría monitorear si existen intentos fallidos de conexión a la red Wi-Fi y generar un alerta si un intruso desea vulnerar e ingresar por ataque de fuerza bruta. También se podría llevar un registro de MAC y horarios de conexión en que se conecta un equipo a la red Wi-Fi. Si aparece un nuevo cliente en horarios atipicos se podría generar un alerta.
  - Mitigación: se podría implementar un proceso de autenticación de dos pasos para ingresar a la red. Ademas de las credenciales, se podría solicitar una confirmacióna través de codigos via SMS o mail.
    
- Weaponization
  - Detección: se podría llevar una especie de conteo de pedidos o peticiones con comandos erróneos o ilógicos. Si se detecta una gran cantidad de comandos de este tipo en un periodo corto podría ser un indicio de que un atacante esta haciendo pruebas y ensayos sobre los comandos, generando un alerta.
  - Mitigación: se podría hacer que la comunicación entre dispositivo y aplicación se realice con alguna clase de cifrado. Esto hace que si algun atacante intenta obtener o registrar paquetes de comandos seán mas dificil interpretarlos.
  
- Reconnaissance
  - Detección: se podría monitorear si un cliente conectado a la red mantiene alguna sesión TCP activa sin enviar comandos; esto podría ser un indicio de espionaje mediante herramientas como Wireshark o similares.
  - Mitigación: si el dispositivo detecta que hay poca actividad en la red, podría reiniciar su punto de acceso Wi‑Fi o directamente apagarlo; de esta manera entorpecería cualquier intento de espionaje.

# Ejercicio CiberKillChain - Defensa

Hacer una copia de este documento para utilizar com plantilla para el ejercicio

## Alumno

Matías Nahuel Rodriguez

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso, mencionar una medida de detección y una de mitigación, sólo lo más importante, considerar recursos limitados. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.


## Resolución
  
- Actions on Objectives
    - Detección: para evitar comandos que perjudiquen el funcionamiento de los equipos se podría aplicar tecnicas de validación de parámetros antes de enviar el comando. Por ejemplo, si un comando intenta modificar un valor a un estado físicamente imposible o ilógico (desactivar una protección sin una secuencia de confirmación o enviar una lectura de sensor fuera de valores limites por ejemplo), se genera una alerta y se rechaza la acción.
    -  Mitigación: los comandos mas sensibles que operan sobre los equipos (apagado o encendido, desactivación de protecciones) solo se ejecutarán si dicho comando viene acompañado de un token seguro generado por la aplicación. Esto agregará una etapa de autenticación a la aplicación.

- Command and Control
  - Detección: el dispositivo puede realizar un monitoreo o análisis sobre el patrón de comandos enviados en la red, generando una especie de historial. Si se detecta que de repente llega un gran tráfico de comandos no coincidentes el equipo podría clasificarlo como sospechoso y ponerlo bajo análisis.
  - Mitigación: se podría desarrollar el equipo de tal manera que implemente una restricción que limite la cantidad de comandos Modbus que puedan ser enviados durante un cierto período de tiempo.
  
- Installation
  
- Exploitation

- Delivery

- Weaponization

- Reconnaissance

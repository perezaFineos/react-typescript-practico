3.1. Lab — Lista de noticias (map, props y key)<br>
RETO C Explica por escrito por qué key={index} es peor que key={noticia.id} si reordenas la lista.<br>
El problema al usar index es que si reordenas no sabrá identificar correctamente los elementos ya que
para React el elemento en una determianda posición siempre será el mismo.<br>

5.2. Lab — useEffect: reloj en vivo<br>
Reto C: ¿Qué pasaría si omitieras el array []? Prueba y anota en una frase.<br>
Pues que se limpia ejecutando cada vez el clearInterval en vez de una sóla vez siendo muy ineficiente

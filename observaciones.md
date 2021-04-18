Querida Rosy, 

Qué placer corregir trabajos como este. Como me tenes acostumbrada, incorporas las funcionalidades avanzadas con una fluidez que haria creer que llevas mucho mas tiempo haciendo front end. Mejoraste la web modelo, y lo hiciste pensando desde la perspectiva del usuario. Excelente. Lo cuidado de cada cosa en el modo oscuro, el boton de volver atras, el loader y la excelente manera en que lo resolviste desde el lado del codigo... es maravilloso ver tanto interes y esmero en entregar un producto finalizado. Como me tenes acostumbrada, tu codigo no solo es claro y prolijo sino que se nota el esfuerzo por hacerlo legible y el increible dominio que tenes de JS para haberlo usado por tan poquito tiempo. 
Espero que estes tan orgullosa como yo. 

Pasemos a tu trabajo. 

Con respecto a las funcionalidades, me apenó mucho notar que fallan todas las descripciones de personajes. No hay forma de entrar a la vista de detalle de un personaje - siempre tira error. Por tu codigo, lo que asumo es que lo dejaste funcionando y luego al abstraer alguna función se te rompió sin que te dieras cuenta. 

Lo que está pasando es que en la funcion `createCardMoreInfo` estas asumiendo que te van a venir estos dos datos:

```js
    const date = new Intl.DateTimeFormat('es-DO').format(info.dates[0].date.type)
    const creators = info.creators.returned > 0 ? info.creators.items[0].name : ''
```

Esos datos solamente vienen para comics, pero no para personajes. Falla la funcion, y con ella toda la construccion de la tarjeta. Un condicional aqui para chequear que sea comic o personaje y armar la tarjeta en consecuencia seria muy bienvenido. 

El loader tampoco funciona de manera consistente, deberia arrancar siempre que va a haber un fetch - por ejemplo, cuando estoy en un comic y hago click en un personaje. Pero este ultimo punto, a diferencia del anterior, es solo un detalle. 

Desafio super extra, pero muy bienvenido: cuando estoy en celulares y me voy muy hacia abajo en la busqueda de un comic, al hacer click en ese comic termino "abajo" en lugar de volver hacia arriba para ver el titulo y la informacion principal. Eso es porque el navegador recuerda en que parte del scroll estoy, y no lo vuelve hacia arriba. Si queres averiguar como controlar el scroll en JS, seria un buen desafio lograr que tenga un comportamiento mas amigable. 

Las funcionalidades extra eran desafiantes, y me sorprende muy para bien lo bien implementadas que estan. El spinner, el modo oscuro, el select para cada pagina... pocas veces ocurre que somos capaces de encarar las funcionalidades avanzadas y dejarlas andando tan bien. 

A nivel visual tu web esta impecable. Todo se ve como lo espero: me encanta como implementaste el modo oscuro y lo bien que funciona, lo comodo del responsive, lo bien que seguiste el modelo propuesto 

Con respecto a tu codigo, tu HTML es impecable, prolijo, usas bien las etiquetas semanticas. Perfecto el agregado de form, que no estaba en el modelo original y que mejora el funcionamiento y la accesibilidad. Increible lo bien que usas las tecnicas para hacer que la web sea accesible, no tengo nada que comentar aqui. Se agradece ese esfuerzo en este tipo de trabajo. 

Con respecto a sass, usaste a la perfeccion variables, mixins y extends, mucho mejor de lo que espero en esta etapa.  Manejaste muy bien todo desde el lado de la arquitectura. 

Tu proyecto en Github tiene una descripcion mas que perfecta, amigable y clara. Infinidad de commits, todos con nombres adecuados, y muchas branches que muestran que fuiste trabajando de manera ordenada. 

Con respecto a JS, tengo poquisimo para comentar... y eso que traté! No tengo nada de valor para decirte, así que no me queda otra que comentarte detalles, hacerte sugerencias nimias o plantearte algún desafío. Usas a la perfeccion la funcionalizacion, tus nombres son claros, en todo momento puedo seguir el codigo y entender lo que pasa. Se nota que hay muchisimo esfuerzo en dejarlo lo mas legible posible, algo que te agradezco un monton. 

Rosi, estas mas que lista para mayores desafíos, para preocuparte por cuestiones mayores a "hacer que algo funcione". Se que no es casualidad la calidad del código.  Tu talento es innegable, pero muchisimas personas talentosas no pueden hacer nada con ese talento si no tienen ese factor extra, las ganas de dar lo mejor, de ir un poquito más allá de lo que se pide, de hacer todo lo mejor posible, de preocuparte por cada detalle. Qué lejos vas a llegar con esa actitud!


  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✅ Respeta el funcionamiento
  ✅ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ✅ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅ Nombres de branchs adecuados

  ✅ Componentización de estilos (SASS)
  ✅ Funciones pequeñas
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados

Nota final: **10**

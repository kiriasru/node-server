1. ¿Qué sucedio al usar async y await?

Al usar async y await se simplifica el manejo de promesas y hace que el código sea más legible y fácil de seguir.
Las funciones esperan a que las promesas se resuelvan antes de continuar.

2. ¿Qué sucedio al usar el método then()?

Al usar el método then(), se sigue trabajando con promesas. Solamente que ahora no usamos async y await, sino que encadenamos varios .then() para trabajar con tareas asincrónicas. Esto complicar un poco más el código y lo vuelve menos claro en comparación con el uso de async y await.

3. ¿Qué diferencias encontraste entre async, await y el método then()?

Con async y await las promesas se se parecen más al modo síncrono, volviendo el código más legible (no es síncrono, solamente se parece). Ahora cuando se usa el método then(), las promesas se encadenan, volviendo el código más difícil de entender.

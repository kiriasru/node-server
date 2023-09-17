const readline = require('readline-sync');

const tasks = [];

function addTask(indicador, descripcion) {
  const tarea = { indicador, descripcion, completada: false };
  tasks.push(tarea);
}

function removeTask(indicador) {
  const tareaIndex = tasks.findIndex(tarea => tarea.indicador === indicador);
  if (tareaIndex !== -1) {
    tasks.splice(tareaIndex, 1);
  }
}

function completeTask(indicador) {
  const tarea = tasks.find(t => t.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
  }
}

function mostrarMenu() {
  console.log('--- Menú ---');
  console.log('1. Añadir tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Listar tareas');
  console.log('5. Salir');
}

function realizarAccion(opcion) {
  switch (opcion) {
    case '1':
      const indicador = readline.question('Indicador de la tarea: ');
      const descripcion = readline.question('Descripcion de la tarea: ');
      addTask(indicador, descripcion);
      break;
    case '2':
      const indicadorEliminar = readline.question('Indicador de la tarea a eliminar: ');
      removeTask(indicadorEliminar);
      break;
    case '3':
      const indicadorCompletar = readline.question('Indicador de la tarea a completar: ');
      completeTask(indicadorCompletar);
      break;
    case '4':
      console.log('--- Lista de Tareas ---');
      tasks.forEach((tarea, index) => {
        const estado = tarea.completada ? 'Completada' : 'Pendiente';
        console.log(`${index + 1}. [${estado}] ${tarea.indicador}: ${tarea.descripcion}`);
      });
      break;
    case '5':
      console.log('Saliendo del programa.');
      process.exit(0);
      break;
    default:
      console.log('Opción no válida. Introduce un número del 1 al 5.');
      break;
  }
}

while (true) {
  mostrarMenu();
  const opcion = readline.question('Seleccione una opcion: ');

  realizarAccion(opcion);
}

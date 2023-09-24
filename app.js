const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Task {
  constructor(indicator, description, completed = false) {
    this.indicator = indicator;
    this.description = description;
    this.completed = completed;
  }

  toggleStatus() {
    this.completed = !this.completed;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    return new Promise((resolve) => {
      this.tasks.push(task);
      resolve();
    });
  }

  deleteTask(index) {
    return new Promise((resolve, reject) => {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks.splice(index, 1);
        resolve();
      } else {
        reject('Índice de tarea no válido');
      }
    });
  }

  listTasks() {
    console.log('Lista de Tareas:');
    this.tasks.forEach((task, index) => {
      const status = task.completed ? 'Tarea Completada' : 'Tarea No Completada';
      console.log(`${index + 1}. Indicador: ${task.indicator}, Descripción: ${task.description}, Estado: ${status}`);
    });
  }

  listCompletedTasks() {
    console.log('Tareas Completadas:');
    this.tasks.forEach((task, index) => {
      if (task.completed) {
        console.log(`${index + 1}. Indicador: ${task.indicator}, Descripción: ${task.description}`);
      }
    });
  }

  markTaskCompleted(index) {
    return new Promise((resolve, reject) => {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].toggleStatus();
        resolve();
      } else {
        reject('Índice de tarea no válido');
      }
    });
  }
}

const taskList = new TaskList();

taskList.addTask(new Task('A', 'Estudiar JavaScript'));
taskList.addTask(new Task('B', 'Hacer ejercicio'));
taskList.addTask(new Task('C', 'Avanzar en la plataforma de ada school'));
taskList.addTask(new Task('D', 'Terminar los entregables pendientes'));
taskList.addTask(new Task('E', 'Estudiar HTML y CSS'));
taskList.addTask(new Task('F', 'Preparar la cena'));
taskList.addTask(new Task('G', 'Pasear al perro'));

async function handleMenuChoice(choice) {
  try {
    switch (choice) {
      case '1':
        taskList.listTasks();
        displayMenu();
        promptUser();
        break;
      case '2':
        taskList.listCompletedTasks();
        displayMenu();
        promptUser();
        break;
      case '3':
        const description = await prompt('Descripción de la nueva tarea: ');
        const indicator = String.fromCharCode(65 + taskList.tasks.length);
        await taskList.addTask(new Task(indicator, description));
        console.log('Tarea agregada exitosamente.');
        displayMenu();
        promptUser();
        break;
      case '4':
        console.log('Lista de Tareas para Completar:');
        taskList.listTasks();
        const indicatorToComplete = await prompt('Indicador de la tarea a marcar como completada: ');
        const taskIndexToComplete = taskList.tasks.findIndex(task => task.indicator === indicatorToComplete);
        if (taskIndexToComplete !== -1) {
          await taskList.markTaskCompleted(taskIndexToComplete);
          console.log(`Tarea ${indicatorToComplete} marcada como completada.`);
        } else {
          console.log('Indicador de tarea no válido');
        }
        displayMenu();
        promptUser();
        break;
      case '5':
        console.log('Lista de Tareas para Eliminar:');
        taskList.listTasks();
        const indicatorToDelete = await prompt('Indicador de la tarea a eliminar: ');
        const taskToDelete = taskList.tasks.find(task => task.indicator === indicatorToDelete);
        if (taskToDelete) {
          console.log(`Eliminando la tarea ${taskToDelete.indicator}: ${taskToDelete.description}`);
          await taskList.deleteTask(taskList.tasks.indexOf(taskToDelete));
        } else {
          console.log('Indicador de tarea no válido');
        }
        displayMenu();
        promptUser();
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Opción no válida. Introduce un número del 1 al 6.');
        displayMenu();
        promptUser();
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    displayMenu();
    promptUser();
  }
}

function displayMenu() {
  console.log('\nMenú de Tareas:');
  console.log('1. Lista de Tareas');
  console.log('2. Tareas Completadas');
  console.log('3. Añadir Tarea');
  console.log('4. Completar Tarea');
  console.log('5. Eliminar Tarea');
  console.log('6. Salir');
}

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

displayMenu();
promptUser();

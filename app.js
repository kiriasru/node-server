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
        this.tasks.push(task);
    }

    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            console.log('Índice de tarea no válido');
        }
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
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].toggleStatus();
        } else {
            console.log('Índice de tarea no válido');
        }
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

function displayMenu() {
    console.log('\nMenú de Tareas:');
    console.log('1. Lista de Tareas');
    console.log('2. Tareas Completadas');
    console.log('3. Añadir Tarea');
    console.log('4. Completar Tarea');
    console.log('5. Eliminar Tarea');
    console.log('6. Salir');
}

function promptUser() {
    rl.question('Seleccione una opción: ', (choice) => {
        handleMenuChoice(choice);
    });
}

function handleMenuChoice(choice) {
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
            rl.question('Descripción de la nueva tarea: ', (description) => {
                const indicator = String.fromCharCode(65 + taskList.tasks.length); // Letras del alfabeto como indicadores
                taskList.addTask(new Task(indicator, description));
                console.log('Tarea agregada exitosamente.');
                displayMenu();
                promptUser();
            });
            break;
        case '4':
      
            console.log('Lista de Tareas para Completar:');
            taskList.listTasks();
            rl.question('Indicador de la tarea a marcar como completada: ', (indicator) => {
                const taskIndex = taskList.tasks.findIndex(task => task.indicator === indicator);
                if (taskIndex !== -1) {
                    taskList.markTaskCompleted(taskIndex);
                    console.log(`Tarea ${indicator} marcada como completada.`);
                } else {
                    console.log('Indicador de tarea no válido');
                }
                displayMenu();
                promptUser();
            });
            break;
        case '5':
            console.log('Lista de Tareas para Eliminar:');
            taskList.listTasks();
            rl.question('Indicador de la tarea a eliminar: ', (indicator) => {
                const taskToDelete = taskList.tasks.find(task => task.indicator === indicator);
                if (taskToDelete) {
                    console.log(`Eliminando la tarea ${taskToDelete.indicator}: ${taskToDelete.description}`);
                    taskList.deleteTask(taskList.tasks.indexOf(taskToDelete));
                } else {
                    console.log('Indicador de tarea no válido');
                }
                displayMenu();
                promptUser();
            });
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
}

displayMenu();
promptUser();
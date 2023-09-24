const http = require('http');
const host = 'localhost';
const port = 8080;


const tareas = [
    { id: 1, description: 'Estudiar HTML y CSS', completed: false },
    { id: 2, description: 'Avanzar en la plataforma de ada school', completed: false },
    { id: 3, description: 'Terminar los entregables pendientes', completed: false },
    { id: 4, description: 'Preparar la cena', completed: false },
    { id: 5, description: 'Estudiar JavaScript', completed: false }
];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/tareas') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(tareas));
    } else {
        res.statusCode = 404;
        res.end('No encontrado');
    }
});

server.listen(port, host, () => {
    console.log(`El servidor corre en http://${host}:${port}`);
});

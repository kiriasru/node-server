const http = require('http');
const host = 'localhost';
const port = 8080;

const tasks = [
    { id: 1, description: 'Estudiar HTML y CSS', completed: false },
    { id: 2, description: 'Avanzar en la plataforma de ada school', completed: false },
    { id: 3, description: 'Terminar los entregables pendientes', completed: false },
    { id: 4, description: 'Preparar la cena', completed: false },
    { id: 5, description: 'Estudiar JavaScript', completed: false }
];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));
    } else {
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

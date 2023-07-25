require('dotenv').config();

const Server = require('./controllers/server');

const server = new Server();

server.initialize();
server.connectDB();